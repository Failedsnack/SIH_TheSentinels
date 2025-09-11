// index.js — Telemedicine Backend Prototype
// Run: npm install express cors jsonwebtoken
// Start: node index.js

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";
const PORT = process.env.PORT || 3000;

// ----- In-memory storage (for prototype) -----
const users = [];        // { phone, role }
const patients = [];     // { phone, name, dob, gender }
const doctors = [];      // { phone, name, department, experience, licenseNumber, timeSlot }
const prescriptions = []; // { id, patientPhone, doctorPhone, medicine, notes, date }
const appointments = [];  // { id, patientPhone, doctorPhone, date }
const followups = [];     // { id, patientPhone, doctorPhone, message, date }
const contacts = [];      // { id, patientName, phone, subject, message, date }

const otpStore = new Map(); // { phone: otp }

// ----- Helpers -----
function generateOTP(length = 6) {
  let otp = "";
  for (let i = 0; i < length; i++) otp += Math.floor(Math.random() * 10);
  return otp;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = payload; // { phone, role }
    next();
  });
}

function authorizeRoles(...allowed) {
  return (req, res, next) => {
    if (!req.user || !allowed.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient role" });
    }
    next();
  };
}

// ----- Auth & Registration -----
app.post("/register", (req, res) => {
  const { role, phone, name } = req.body;
  if (!phone || !role) return res.status(400).json({ message: "phone and role required" });

  if (role === "patient") {
    const { dob, gender } = req.body;
    patients.push({ phone, name, dob, gender });
    users.push({ phone, role });
    return res.json({ message: "Patient registered" });
  } else if (role === "doctor") {
    const { department, experience, licenseNumber, timeSlot } = req.body;
    doctors.push({ phone, name, department, experience, licenseNumber, timeSlot });
    users.push({ phone, role });
    return res.json({ message: "Doctor registered" });
  } else {
    return res.status(400).json({ message: "Role must be patient or doctor" });
  }
});

app.post("/auth/send-otp", (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "phone required" });

  const otp = generateOTP();
  otpStore.set(phone, otp);

  console.log(`DEBUG OTP for ${phone}: ${otp}`);
  res.json({ message: "OTP sent (check console for demo)" });
});

app.post("/auth/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ message: "phone and otp required" });

  if (otpStore.get(phone) !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  otpStore.delete(phone);

  const user = users.find((u) => u.phone === phone);
  if (!user) return res.status(400).json({ message: "Not registered" });

  const token = jwt.sign({ phone: user.phone, role: user.role }, JWT_SECRET, {
    expiresIn: "12h",
  });

  res.json({ token, role: user.role });
});

// ----- Menu Features -----

// Emergency
app.get("/emergency", (req, res) => {
  res.json({ ambulanceNumber: "108" });
});

// Dashboard (Patient & Doctor)
app.get("/dashboard", authenticateToken, (req, res) => {
  if (req.user.role === "patient") {
    const myPrescriptions = prescriptions.filter(p => p.patientPhone === req.user.phone);
    const myFollowups = followups.filter(f => f.patientPhone === req.user.phone);
    return res.json({ prescriptions: myPrescriptions, followups: myFollowups });
  }
  if (req.user.role === "doctor") {
    const myAppointments = appointments.filter(a => a.doctorPhone === req.user.phone);
    const myPatients = prescriptions
      .filter(p => p.doctorPhone === req.user.phone)
      .map(p => ({ patientPhone: p.patientPhone, medicine: p.medicine, date: p.date }));
    return res.json({ appointments: myAppointments, patientsHistory: myPatients });
  }
  res.status(400).json({ message: "Invalid role for dashboard" });
});

// Find a Doctor
app.get("/doctors", (req, res) => {
  const { department } = req.query;
  let result = doctors;
  if (department) {
    result = result.filter(d => d.department.toLowerCase() === department.toLowerCase());
  }
  res.json(result);
});

// ----- Core Actions -----

// Patient books appointment
app.post("/appointments", authenticateToken, authorizeRoles("patient"), (req, res) => {
  const { doctorPhone, date } = req.body;
  const appt = { id: Date.now(), patientPhone: req.user.phone, doctorPhone, date };
  appointments.push(appt);
  res.json({ message: "Appointment booked", appointment: appt });
});

// Doctor writes prescription
app.post("/prescriptions", authenticateToken, authorizeRoles("doctor"), (req, res) => {
  const { patientPhone, medicine, notes } = req.body;
  const presc = { id: Date.now(), doctorPhone: req.user.phone, patientPhone, medicine, notes, date: new Date().toISOString() };
  prescriptions.push(presc);
  res.json({ message: "Prescription added", prescription: presc });
});

// Doctor recommends followup
app.post("/followups", authenticateToken, authorizeRoles("doctor"), (req, res) => {
  const { patientPhone, message, date } = req.body;
  const f = { id: Date.now(), doctorPhone: req.user.phone, patientPhone, message, date };
  followups.push(f);
  res.json({ message: "Followup scheduled", followup: f });
});

// Contact Us (Patient only)
app.post("/contact", authenticateToken, authorizeRoles("patient"), (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message) {
    return res.status(400).json({ message: "subject and message are required" });
  }
  const patient = patients.find(p => p.phone === req.user.phone);
  if (!patient) return res.status(404).json({ message: "Patient profile not found" });

  const contact = {
    id: Date.now(),
    name: patient.name,
    phone: patient.phone,
    subject,
    message,
    date: new Date().toISOString()
  };

  contacts.push(contact);
  console.log("New contact message:", contact);
  res.json({ message: "Your message has been received", contact });
});

// ----- Admin Views -----
app.get("/admin/users", (req, res) => {
  res.json({ users, patients, doctors });
});

app.get("/admin/contacts", (req, res) => {
  res.json(contacts);
});

// Healthcheck
app.get("/", (req, res) => res.send("Telemedicine backend running"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
