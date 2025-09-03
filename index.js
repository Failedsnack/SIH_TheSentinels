const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const cron = require("node-cron");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "your_secret_key";

// ================== Dummy Data ==================
let users = [];
let patients = [];
let doctors = [];
let appointments = [];
let prescriptions = [];
let consultations = [];
let reminders = [];

// ================== Auth ==================
app.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;

  const existing = users.find((u) => u.username === username);
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, role });

  // Auto-add to role-specific list
  if (role === "patient") {
    patients.push({ id: Date.now(), name: username, age: 0 });
  }
  if (role === "doctor") {
    doctors.push({ id: Date.now(), name: username, specialization: "General" });
  }

  res.status(201).json({ message: "User registered" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// ================== Middleware ==================
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
}

// ================== Patients ==================
app.get("/patients", authenticateToken, authorizeRoles("doctor", "admin"), (req, res) => {
  res.json(patients);
});

app.get("/patients/me", authenticateToken, authorizeRoles("patient"), (req, res) => {
  const patient = patients.find((p) => p.name === req.user.username);
  res.json(patient || { message: "No profile found" });
});

// ================== Doctors ==================
app.get("/doctors", authenticateToken, authorizeRoles("admin"), (req, res) => {
  res.json(doctors);
});

app.get("/doctors/me", authenticateToken, authorizeRoles("doctor"), (req, res) => {
  const doctor = doctors.find((d) => d.name === req.user.username);
  res.json(doctor || { message: "No profile found" });
});

// ================== Appointments ==================
app.post("/appointments", authenticateToken, authorizeRoles("patient"), (req, res) => {
  const { doctorId, date } = req.body;
  const newAppt = { id: Date.now(), patient: req.user.username, doctorId, date };
  appointments.push(newAppt);
  reminders.push({ id: Date.now(), patient: req.user.username, message: `Reminder: Appointment on ${date}` });
  res.status(201).json(newAppt);
});

app.get("/appointments", authenticateToken, authorizeRoles("doctor"), (req, res) => {
  const myAppointments = appointments.filter((a) => a.doctorId === req.user.username);
  res.json(myAppointments);
});

app.get("/appointments/me", authenticateToken, authorizeRoles("patient"), (req, res) => {
  const myAppointments = appointments.filter((a) => a.patient === req.user.username);
  res.json(myAppointments);
});

// ================== Prescriptions ==================
app.post("/prescriptions", authenticateToken, authorizeRoles("doctor"), (req, res) => {
  const { patient, medicine } = req.body;
  const newPrescription = {
    id: Date.now(),
    doctor: req.user.username,
    patient,
    medicine,
  };
  prescriptions.push(newPrescription);
  res.status(201).json(newPrescription);
});

app.get("/prescriptions/me", authenticateToken, authorizeRoles("patient"), (req, res) => {
  const myPrescriptions = prescriptions.filter((p) => p.patient === req.user.username);
  res.json(myPrescriptions);
});

// ================== File Uploads ==================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post(
  "/prescriptions/upload",
  authenticateToken,
  authorizeRoles("doctor"),
  upload.single("file"),
  (req, res) => {
    const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    res.json({ message: "File uploaded successfully", fileUrl });
  }
);

// ================== Consultation Logs ==================
app.post("/consultation/start", authenticateToken, authorizeRoles("doctor", "patient"), (req, res) => {
  const session = { id: Date.now(), doctor: req.user.role === "doctor" ? req.user.username : null, patient: req.user.role === "patient" ? req.user.username : null, startTime: new Date(), status: "ongoing" };
  consultations.push(session);
  res.json({ message: "Consultation started", sessionId: session.id });
});

app.post("/consultation/end/:id", authenticateToken, authorizeRoles("doctor", "patient"), (req, res) => {
  const session = consultations.find((c) => c.id === parseInt(req.params.id));
  if (session) {
    session.status = "ended";
    session.endTime = new Date();
    res.json({ message: "Consultation ended", session });
  } else {
    res.status(404).json({ message: "Session not found" });
  }
});

// ================== Reminders ==================
cron.schedule("* * * * *", () => {
  reminders.forEach((r) => console.log("Reminder:", r.message));
});

app.get("/reminders", authenticateToken, authorizeRoles("patient", "doctor"), (req, res) => {
  const myReminders = reminders.filter((r) => r.patient === req.user.username);
  res.json(myReminders);
});

// ================== Integrations ==================
// AI Symptom Checker (dummy)
app.post("/symptoms", authenticateToken, (req, res) => {
  const { symptoms } = req.body;
  res.json({ symptoms, possibleConditions: ["Fever", "Common Cold"] });
});

// Pharmacy API (dummy external call)
app.get("/pharmacy/medicines", authenticateToken, async (req, res) => {
  try {
    // simulate external API
    res.json([{ id: 1, name: "Paracetamol", stock: 100 }, { id: 2, name: "Amoxicillin", stock: 50 }]);
  } catch {
    res.status(500).json({ message: "Pharmacy service unavailable" });
  }
});

// SMS/Email (dummy)
app.post("/otp/send", authenticateToken, (req, res) => {
  const { phone } = req.body;
  console.log(`📩 OTP sent to ${phone}`);
  res.json({ message: `OTP sent to ${phone}` });
});

// ================== Admin Dashboard ==================
app.get("/admin/dashboard", authenticateToken, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: `Welcome Admin ${req.user.username}`,
    stats: {
      totalUsers: users.length,
      totalPatients: patients.length,
      totalDoctors: doctors.length,
      totalAppointments: appointments.length,
      totalPrescriptions: prescriptions.length,
      totalConsultations: consultations.length,
    },
  });
});

// ================== Root ==================
app.get("/", (req, res) => res.send("Telemedicine Backend Prototype Running"));

// ================== Start Server ==================
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
