create database healthcare_db;
use healthcare_db;

create table users(
    id int AUTO_INCREMENT unique NOT NULL,
    username varchar(50) unique NOT NULL,
    password varchar(100) NOT NULL,
    role ENUM('patient','doctor','admin') NOT NULL
);

create table patients(
    id int AUTO_INCREMENT primary key,
    user_id int NOT NULL unique,
    name varchar(100) NOT NULL,
    age int DEFAULT 0,
    phone varchar(15),
    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    constraint fk_patients_user foreign key (user_id) references users(id) on delete CASCADE
);

create table doctors(
    id int AUTO_INCREMENT primary key,
    user_id int NOT NULL unique,
    name varchar(100) NOT NULL,
    specialization varchar(100) default 'General',
    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    constraint fk_doctors_user foreign key (user_id) references users(id) on delete CASCADE
);

create table appointments(
    id int AUTO_INCREMENT primary key,
    patient_user_id int NOT NULL,
    doctor_user_id int NOT NULL,
    scheduled_at DATETIME NOT NULL,
    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    constraint fk_appt_patient foreign key (patient_user_id) references users(id) on delete CASCADE,
    constraint fk_appt_doctor foreign key (doctor_user_id) references users(id) on delete CASCADE,
    INDEX idx_appt_doctor (doctor_user_id,scheduled_at),
    INDEX idx_appt_patient (patient_user_id,scheduled_at)
);

 create table prescriptions(
    id int AUTO_INCREMENT primary key,
    patient_user_id int NOT NULL,
    doctor_user_id int NOT NULL,
    medicine TEXT NOT NULL,
    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    constraint fk_rx_patient foreign key (patient_user_id) references users(id) on delete CASCADE,
    constraint fk_rx_doctor foreign key (doctor_user_id) references users(id) on delete CASCADE,
);

create table consultations(
    id int AUTO_INCREMENT primary key,
    doctor_user_id int,
    patient_user_id int,
    status ENUM('ongoing','ended') NOT NULL DEFAULT 'ongoing',
    start_time DATETIME NOT NULL default CURRENT_TIMESTAMP,
    end_time DATETIME NULL,
    constraint fk_consult_doc foreign key (doctor_user_id) references users(id) on delete set NULL,
    constraint fk_consult_pat foreign key (doctor_user_id) references users(id) on delete set NULL
);

 create table reminder(
    id int AUTO_INCREMENT primary key,
    user_id int NOT NULL,
    message varchar(200) NOT NULL,
    due_at DATETIME NOT NULL,
    sent TINYINT(1) NOT NULL default 0,
    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    constraint fk_rem_user foreign key (user_id) references users(id) on delete CASCADE,
    INDEX idx_rem_due (sent, due_at)
);

create table uploads(
    id int AUTO_INCREMENT primary key,
    user_id int NOT NULL,
    original_name varchar(200) NOT NULL,
    server_filename varchar(255) NOT NULL,
    url varchar(255) NOT NULL,
    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    constraint fk_file_user foreign key (user_id) references users(id) on delete CASCADE
);