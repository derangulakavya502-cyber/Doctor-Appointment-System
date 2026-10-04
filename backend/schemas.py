from pydantic import BaseModel


class AppointmentCreate(BaseModel):
    patient_name: str
    phone: str
    age: int
    department: str
    doctor: str
    appointment_date: str
    appointment_time: str
    reason: str | None = None