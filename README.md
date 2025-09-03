/The README.md file is being used as a checklist. Please make sure to update it after any modification or addition/

📌 Backend Status – Telemedicine Project
✅ Done

Environment Setup

Node.js + Express installed

Project initialized (package.json)

Auth + Roles

Signup/Login with JWT

Password hashing (bcrypt)

Role-based access control (patient, doctor, admin)

Core APIs

Patients → /patients, /patients/me

Doctors → /doctors, /doctors/me

Appointments → /appointments (doctor + patient flows)

Prescriptions → /prescriptions, /prescriptions/me

Admin Dashboard → /admin/dashboard

File Uploads

Prescription/report upload via Multer

File download served from /uploads/...

Consultation (Video Call Tracking)

/consultation/start (dummy session ID)

/consultation/end/:id (mark session ended)

/consultations (list past calls)

Reminders + Notifications

Appointment creates reminder entry

Cron job (node-cron) logs reminders every 1 min

/reminders endpoint returns upcoming reminders

Integrations (Dummy Mode)

AI Symptom Checker → /symptoms

Pharmacy Stock → /pharmacy/medicines

SMS/OTP → /otp/send (dummy console log)

🔜 Still Pending

SMS Gateway (Real Integration)

Integrate Twilio / MSG91 for actual OTP delivery

Right now: dummy console log only

Phone Call (Voice Consultation)

Add /call/start API with Twilio/Exotel/MSG91 to bridge doctor ↔ patient calls

Currently: only video-consultation session tracking is available

Hosting / Deployment

Deploy backend to cloud (AWS, Azure, or NIC Cloud)

Setup DB connection (Postgres/MySQL) if your teammate finishes schema

Database Integration (if teammate is ready)

Replace dummy in-memory arrays with DB queries
