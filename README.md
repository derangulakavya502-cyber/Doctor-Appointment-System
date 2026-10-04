# 🏥 CarePlus Hospital – Doctor Appointment Booking System

A full-stack web application for booking and managing doctor appointments online. The system allows patients to view doctors, book appointments, manage their appointments, and provides an admin dashboard to monitor hospital appointments.

## ✨ Features

* 🏠 Hospital Home Page
* 👨‍⚕️ Doctor Listing and Details
* 📅 Online Doctor Appointment Booking
* 📋 View My Appointments
* ❌ Cancel Appointments
* 🛠️ Admin Dashboard
* 📊 Appointment Statistics
* 💾 SQLite Database
* 🔗 FastAPI Backend API
* 📱 Responsive Web Design

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* FastAPI
* SQLAlchemy

### Database

* SQLite

## 📁 Project Structure

```text
Doctor-Appointment-System/
│
├── index.html
├── doctors.html
├── appointment.html
├── appointments.html
├── admin.html
├── style.css
├── script.js
│
└── backend/
    ├── main.py
    ├── database.py
    ├── models.py
    └── schemas.py
```

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/derangulakavya502-cyber/Doctor-Appointment-System.git
```

### 2. Open the project

```bash
cd Doctor-Appointment-System
```

### 3. Start the FastAPI backend

Open a terminal:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the required packages:

```bash
pip install fastapi uvicorn sqlalchemy
```

Start the server:

```bash
python -m uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

### 4. Start the frontend

Open another terminal in the main project folder:

```bash
python -m http.server 5500
```

Open:

```text
http://127.0.0.1:5500/index.html
```

## 🔗 API Documentation

FastAPI automatically provides interactive API documentation at:

```text
http://127.0.0.1:8000/docs
```

## 📊 Admin Dashboard

The admin dashboard provides:

* Total appointments
* Confirmed appointments
* Cancelled appointments
* Total doctors
* Complete appointment table

Open:

```text
http://127.0.0.1:5500/admin.html
```

## 🎯 Project Objective

The objective of this project is to provide a simple and user-friendly hospital appointment management system that connects patients with doctors and helps hospital administrators manage appointment information efficiently.

## 👩‍💻 Developed By

**Derangula Kavya**

B.Tech – Computer Science and Engineering

GitHub:
https://github.com/derangulakavya502-cyber

