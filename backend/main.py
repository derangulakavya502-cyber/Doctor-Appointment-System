from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, SessionLocal
import models
from schemas import AppointmentCreate

app = FastAPI(title="CarePlus Hospital API")


# Create database tables
Base.metadata.create_all(bind=engine)


# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database connection
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {
        "message": "CarePlus Hospital API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# =====================================
# Create Appointment
# =====================================

@app.post("/appointments")
def create_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db)
):
    new_appointment = models.Appointment(
        patient_name=appointment.patient_name,
        phone=appointment.phone,
        age=appointment.age,
        department=appointment.department,
        doctor=appointment.doctor,
        appointment_date=appointment.appointment_date,
        appointment_time=appointment.appointment_time,
        reason=appointment.reason,
        status="Confirmed"
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return {
        "message": "Appointment booked successfully",
        "appointment_id": new_appointment.id
    }


# =====================================
# Get All Appointments
# =====================================

@app.get("/appointments")
def get_appointments(
    db: Session = Depends(get_db)
):
    appointments = db.query(
        models.Appointment
    ).all()

    return appointments


# =====================================
# Cancel Appointment
# =====================================

@app.delete("/appointments/{appointment_id}")
def cancel_appointment(
    appointment_id: int,
    db: Session = Depends(get_db)
):
    appointment = db.query(
        models.Appointment
    ).filter(
        models.Appointment.id == appointment_id
    ).first()

    if not appointment:
        return {
            "message": "Appointment not found"
        }

    # Change status instead of deleting
    appointment.status = "Cancelled"

    db.commit()
    db.refresh(appointment)

    return {
        "message": "Appointment cancelled successfully"
    }


# =====================================
# Admin Dashboard Statistics
# =====================================

@app.get("/admin/stats")
def get_admin_stats(
    db: Session = Depends(get_db)
):

    appointments = db.query(
        models.Appointment
    ).all()

    total = len(appointments)

    confirmed = len([
        a for a in appointments
        if a.status == "Confirmed"
    ])

    cancelled = len([
        a for a in appointments
        if a.status == "Cancelled"
    ])

    return {
        "total": total,
        "confirmed": confirmed,
        "cancelled": cancelled,
        "doctors": 4
    }