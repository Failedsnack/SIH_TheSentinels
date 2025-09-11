// index.js
// Telemedicine backend prototype - Phone-first login + full menu features
// Install: npm install express cors jsonwebtoken
// Run: node index.js

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";
const PORT = process.env.PORT || 3000;

// ---------------- In-memory storage (prototype) ----------------
// In production these are DB tables; OTP store should be in Redis.
const users = [];        // { phone, role }  // role = 'patient' | 'doctor' | 'admin'
const patients = [];     // { phone, name, dob, gender }
const doctors = [];      // { phone, name, department, experience, licenseNumber, timeSlot }
const prescriptions = []; // { id, patientPhone, doctorPhone, medicine, notes, date }
const appointments = [];  // { id, patientPhone, doctorPhone, date }
const followups = [];     // { id, patientPhone, doctorPhone, message, date }
const contacts = [];      // { id, name, phone, subject, message, date }

// OTP store (in-memory) for prototype:
// Map phone -> { otp, expiresAt (seconds), attempts, lastSentAt (seconds), sendsToday, sendDay }
const otpStore = new Map();

// Simple helper to track sends per day in-memory (resets across restarts)
function getTodayYMD() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${d.getUTCMonth()+1}-${d.getUTCDate()}`;
}

// ---------------- Configuration & limits ----------------
const OTP_LENGTH = 6;
const OTP_TTL_SEC = 5 * 60;        // 5 minutes
const MIN_SECONDS_BETWEEN_SENDS = 30; // prevent immediate re-send
const MAX_SENDS_PER_DAY = 10;      // per phone number
const MAX_VERIFY_ATTEMPTS = 5;

// ---------------- Helpers ----------------
function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}
function generateOTP(len = OTP_LENGTH) {
  let s = "";
  for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10);
  return s;
}
function isRegistered(phone) {
  return users.some(u => u.phone === phone);
}
function findUser(phone) {
  return users.find(u => u.phone === phone);
}
function ensureUser(phone, role) {
  const existing = findUser(phone);
  if (!existing) {
    users.push({ phone, role });
    return true;
  }
  return false;
}

// ---------------- Auth middleware ----------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = payload; // { phone, role, iat, exp }
    next();
  });
}
function authorizeRoles(...allowed) {
  return (req, res, next) => {
    if (!req.user || !allowed.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
}

// ---------------- Phone-first OTP endpoints ----------------

/*
POST /auth/send-otp
Body: { phone: "+91..." }
Behavior:
 - If phone NOT registered -> { registered: false } (FE should show register)
 - If phone registered   -> generate OTP, store, log (or send) and return { registered: true }
*/
app.post("/auth/send-otp", (req, res) => {
  const phoneRaw = req.body.phone;
  const phone = phoneRaw ? String(phoneRaw).trim() : "";
  if (!phone) return res.status(400).json({ message: "phone is required" });

  if (!isRegistered(phone)) {
    return res.json({ registered: false, message: "Phone not registered. Please register." });
  }

  // rate limits per-phone (in-memory)
  const now = nowSeconds();
  const store = otpStore.get(phone) || {};
  const today = getTodayYMD();
  if (store.sendDay !== today) {
    store.sendsToday = 0;
    store.sendDay = today;
  }
  if ((store.sendsToday || 0) >= MAX_SENDS_PER_DAY) {
    return res.status(429).json({ message: "Exceeded daily OTP sends for this phone" });
  }
  if (store.lastSentAt && now - store.lastSentAt < MIN_SECONDS_BETWEEN_SENDS) {
    return res.status(429).json({ message: `Please wait ${MIN_SECONDS_BETWEEN_SENDS} seconds before requesting another OTP` });
  }

  // generate + store OTP
  const otp = generateOTP(OTP_LENGTH);
  const entry = {
    otp,
    expiresAt: now + OTP_TTL_SEC,
    attempts: 0,
    lastSentAt: now,
    sendsToday: (store.sendsToday || 0) + 1,
    sendDay: today
  };
  otpStore.set(phone, entry);

  // For prototype: log OTP to console. Production: send via Twilio/MSG91.
  console.log(`DEBUG OTP for ${phone}: ${otp} (valid ${OTP_TTL_SEC}s)`);

  return res.json({ registered: true, message: "OTP sent (check server logs for demo)" });
});

/*
POST /auth/verify-otp
Body: { phone: "+91...", otp: "123456" }
Behavior:
 - validate OTP stored and issue JWT if ok
 - only allowed for registered phones
*/
app.post("/auth/verify-otp", (req, res) => {
  const phoneRaw = req.body.phone;
  const otpRaw = req.body.otp;
  const phone = phoneRaw ? String(phoneRaw).trim() : "";
  const otp = otpRaw ? String(otpRaw).trim() : "";
  if (!phone || !otp) return res.status(400).json({ message: "phone and otp required" });

  if (!isRegistered(phone)) return res.status(400).json({ message: "Phone not registered. Register first." });

  const entry = otpStore.get(phone);
  if (!entry) return res.status(400).json({ message: "No OTP requested or OTP expired" });

  const now = nowSeconds();
  if (now > entry.expiresAt) {
    otpStore.delete(phone);
    return res.status(400).json({ message: "OTP expired" });
  }
  if ((entry.attempts || 0) >= MAX_VERIFY_ATTEMPTS) {
    return res.status(429).json({ message: "Too many verification attempts" });
  }

  if (entry.otp !== otp) {
    entry.attempts = (entry.attempts || 0) + 1;
    otpStore.set(phone, entry);
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // success
  otpStore.delete(phone);
  const user = findUser(phone);
  const token = jwt.sign({ phone: user.phone, role: user.role }, JWT_SECRET, { expiresIn: "12h" });
  return res.json({ token, role: user.role, message: "OTP verified" });
});

// ---------------- Registration ----------------
/*
POST /register
Body (patient):
 { role: "patient", phone, name, dob, gender }
Body (doctor):
 { role: "doctor", phone, name, department, experience, licenseNumber, timeSlot }
Only allowed if phone not already registered.
*/
app.post("/register", (req, res) => {
  const role = req.body.role;
  const phoneRaw = req.body.phone;
  const phone = phoneRaw ? String(phoneRaw).trim() : "";
  if (!phone || !role) return res.status(400).json({ message: "phone and role are required" });
  if (role !== "patient" && role !== "doctor") return res.status(400).json({ message: "role must be 'patient' or 'doctor'" });

  if (isRegistered(phone)) {
    return res.status(400).json({ message: "Phone already registered. Please login." });
  }

  if (role === "patient") {
    const { name, dob, gender } = req.body;
    if (!name || !dob || !gender) return res.status(400).json({ message: "patient requires name, dob, gender" });
    patients.push({ phone, name, dob, gender });
    users.push({ phone, role });
    return res.status(201).json({ message: "Patient registered. Proceed to login." });
  }

  if (role === "doctor") {
    const { name, department, experience, licenseNumber, timeSlot } = req.body;
    if (!name || !department || !experience || !licenseNumber || !timeSlot) {
      return res.status(400).json({ message: "doctor requires name, department, experience, licenseNumber, timeSlot" });
    }
    doctors.push({ phone, name, department, experience, licenseNumber, timeSlot });
    users.push({ phone, role });
    return res.status(201).json({ message: "Doctor registered. Proceed to login." });
  }

  return res.status(400).json({ message: "Unknown error" });
});

// ---------------- Public & Menu endpoints ----------------
app.get("/", (req, res) => res.send("Telemedicine backend running"));

// Emergency (public)
app.get("/emergency", (req, res) => {
  res.json({ ambulanceNumber: "108" });
});

// Find a Doctor (public)
app.get("/doctors", (req, res) => {
  const qDept = (req.query.department || "").trim();
  let resList = doctors.slice();
  if (qDept) {
    resList = resList.filter(d => (d.department || "").toLowerCase() === qDept.toLowerCase());
  }
  res.json(resList);
});

// ---------------- Protected: Dashboard ----------------
app.get("/dashboard", authenticateToken, (req, res) => {
  const phone = req.user.phone;
  if (req.user.role === "patient") {
    const myPrescriptions = prescriptions.filter(p => p.patientPhone === phone);
    const myFollowups = followups.filter(f => f.patientPhone === phone);
    return res.json({ prescriptions: myPrescriptions, followups: myFollowups });
  }
  if (req.user.role === "doctor") {
    const myAppointments = appointments.filter(a => a.doctorPhone === phone);
    const patientsHistory = prescriptions
      .filter(p => p.doctorPhone === phone)
      .map(p => ({ patientPhone: p.patientPhone, medicine: p.medicine, date: p.date }));
    return res.json({ appointments: myAppointments, patientsHistory });
  }
  return res.status(400).json({ message: "Invalid role for dashboard" });
});

// ---------------- Core actions ----------------

// Book appointment (patient)
app.post("/appointments", authenticateToken, authorizeRoles("patient"), (req, res) => {
  const { doctorPhone, date } = req.body;
  if (!doctorPhone || !date) return res.status(400).json({ message: "doctorPhone and date required" });
  // optionally verify doctor exists
  const d = doctors.find(x => x.phone === doctorPhone);
  if (!d) return res.status(400).json({ message: "Doctor not found" });
  const appt = { id: Date.now(), patientPhone: req.user.phone, doctorPhone, date };
  appointments.push(appt);
  return res.json({ message: "Appointment booked", appointment: appt });
});

// Doctor writes prescription
app.post("/prescriptions", authenticateToken, authorizeRoles("doctor"), (req, res) => {
  const { patientPhone, medicine, notes } = req.body;
  if (!patientPhone || !medicine) return res.status(400).json({ message: "patientPhone and medicine required" });
  // optionally verify patient exists
  const p = patients.find(x => x.phone === patientPhone);
  if (!p) return res.status(400).json({ message: "Patient not found" });
  const presc = { id: Date.now(), doctorPhone: req.user.phone, patientPhone, medicine, notes: notes || "", date: new Date().toISOString() };
  prescriptions.push(presc);
  return res.json({ message: "Prescription added", prescription: presc });
});

// Doctor recommends followup
app.post("/followups", authenticateToken, authorizeRoles("doctor"), (req, res) => {
  const { patientPhone, message, date } = req.body;
  if (!patientPhone || !message) return res.status(400).json({ message: "patientPhone and message required" });
  const p = patients.find(x => x.phone === patientPhone);
  if (!p) return res.status(400).json({ message: "Patient not found" });
  const f = { id: Date.now(), doctorPhone: req.user.phone, patientPhone, message, date };
  followups.push(f);
  return res.json({ message: "Followup scheduled", followup: f });
});

// Contact Us (patient) - capture patient name + phone automatically
app.post("/contact", authenticateToken, authorizeRoles("patient"), (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message) return res.status(400).json({ message: "subject and message required" });
  const patient = patients.find(p => p.phone === req.user.phone);
  if (!patient) return res.status(404).json({ message: "Patient profile not found" });
  const contact = { id: Date.now(), name: patient.name, phone: patient.phone, subject, message, date: new Date().toISOString() };
  contacts.push(contact);
  console.log("New contact message:", contact);
  return res.json({ message: "Your message has been received", contact });
});

// ---------------- Admin (protected) ----------------
// Create an admin entry manually in-memory or via register with role 'admin' (not exposed publicly)
app.get("/admin/users", authenticateToken, authorizeRoles("admin"), (req, res) => {
  res.json({ users, patients, doctors });
});
app.get("/admin/contacts", authenticateToken, authorizeRoles("admin"), (req, res) => {
  res.json(contacts);
});
app.get("/admin/dashboard", authenticateToken, authorizeRoles("admin"), (req, res) => {
  const stats = {
    totalUsers: users.length,
    totalPatients: patients.length,
    totalDoctors: doctors.length,
    totalAppointments: appointments.length,
    totalPrescriptions: prescriptions.length,
    totalContacts: contacts.length
  };
  res.json({ stats });
});

// ---------------- Utility: create an admin helper (for local testing) ----------------
// You can run POST /create-admin (development only) to quickly create an admin user (not recommended for prod)
app.post("/create-admin", (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "phone required" });
  if (isRegistered(phone)) return res.status(400).json({ message: "Phone already registered" });
  users.push({ phone, role: "admin" });
  return res.json({ message: "Admin user created. Use /auth/send-otp -> verify to login." });
});

// ---------------- Start server ----------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
