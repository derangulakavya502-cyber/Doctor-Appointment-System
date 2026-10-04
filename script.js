// ===============================
// Home Page
// ===============================

function bookAppointment() {
    window.location.href = "appointment.html";
}


// ===============================
// Doctors Search
// ===============================

function searchDoctors() {

    const searchInput = document
        .getElementById("doctorSearch")
        .value
        .toLowerCase();

    const doctors = document
        .querySelectorAll(".doctor-profile");

    doctors.forEach(function(doctor) {

        const doctorText = doctor.innerText.toLowerCase();

        if (doctorText.includes(searchInput)) {
            doctor.style.display = "block";
        } else {
            doctor.style.display = "none";
        }

    });
}


// ===============================
// Appointment Form
// ===============================

const appointmentForm =
    document.getElementById("appointmentForm");

if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const patientName =
                document.getElementById("patientName").value;

            const phone =
                document.getElementById("phone").value;

            const age =
                document.getElementById("age").value;

            const department =
                document.getElementById("department").value;

            const doctor =
                document.getElementById("doctor").value;

            const appointmentDate =
                document.getElementById("appointmentDate").value;

            const appointmentTime =
                document.getElementById("appointmentTime").value;

            const reason =
                document.getElementById("reason").value;


            // Data to send to FastAPI
            const appointmentData = {

                patient_name: patientName,

                phone: phone,

                age: parseInt(age),

                department: department,

                doctor: doctor,

                appointment_date: appointmentDate,

                appointment_time: appointmentTime,

                reason: reason

            };


            try {

                const response = await fetch(
                    "http://127.0.0.1:8000/appointments",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(
                            appointmentData
                        )
                    }
                );


                const result =
                    await response.json();


                if (response.ok) {

                    // Show confirmation message
                    const confirmationMessage =
                        document.getElementById(
                            "confirmationMessage"
                        );

                    if (confirmationMessage) {

                        confirmationMessage.innerHTML =
                            "Thank you, <strong>" +
                            patientName +
                            "</strong>.<br><br>" +
                            "Your appointment with <strong>" +
                            doctor +
                            "</strong> has been booked successfully.";
                    }


                    document.getElementById(
                        "confirmation"
                    ).style.display = "flex";

                } else {

                    alert(
                        "Failed to book appointment: " +
                        JSON.stringify(result)
                    );

                }

            } catch (error) {

                console.error(
                    "Error:",
                    error
                );

                alert(
                    "Unable to connect to the hospital server. " +
                    "Please make sure FastAPI is running."
                );

            }

        }
    );

}


// ===============================
// View Appointments
// ===============================

function viewAppointments() {

    window.location.href =
        "appointments.html";

}


// ===============================
// Close Confirmation
// ===============================

function closeConfirmation() {

    const confirmation =
        document.getElementById("confirmation");

    if (confirmation) {

        confirmation.style.display =
            "none";

    }

    const form =
        document.getElementById("appointmentForm");

    if (form) {

        form.reset();

    }

}


// ===============================
// Load Appointments from Database
// ===============================

const appointmentsList =
    document.getElementById(
        "appointmentsList"
    );


if (appointmentsList) {

    loadAppointments();

}


async function loadAppointments() {

    try {

        const response =
            await fetch(
                "http://127.0.0.1:8000/appointments"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load appointments"
            );

        }


        const appointments =
            await response.json();


        if (appointments.length === 0) {

            appointmentsList.innerHTML = `

                <div class="no-appointments">

                    <div class="empty-icon">
                        📅
                    </div>

                    <h2>
                        No Appointments Found
                    </h2>

                    <p>
                        You have not booked any appointments yet.
                    </p>

                    <a href="appointment.html">
                        Book an Appointment
                    </a>

                </div>

            `;

            return;

        }


        appointmentsList.innerHTML = "";


        appointments.forEach(
            function(appointment) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "appointment-card";


                card.innerHTML = `

                    <div class="appointment-card-header">

                        <div>

                            <span class="status">
                                ${appointment.status}
                            </span>

                            <h2>
                                ${appointment.doctor}
                            </h2>

                            <p class="department">
                                ${appointment.department}
                            </p>

                        </div>

                        <div class="appointment-icon">
                            🩺
                        </div>

                    </div>


                    <div class="appointment-details">

                        <div>
                            <strong>👤 Patient</strong>
                            <p>
                                ${appointment.patient_name}
                            </p>
                        </div>


                        <div>
                            <strong>📅 Date</strong>
                            <p>
                                ${appointment.appointment_date}
                            </p>
                        </div>


                        <div>
                            <strong>🕐 Time</strong>
                            <p>
                                ${appointment.appointment_time}
                            </p>
                        </div>


                        <div>
                            <strong>📞 Phone</strong>
                            <p>
                                ${appointment.phone}
                            </p>
                        </div>

                    </div>


                    <div class="appointment-reason">

                        <strong>
                            Reason for Visit
                        </strong>

                        <p>
                            ${
                                appointment.reason ||
                                "Not specified"
                            }
                        </p>

                    </div>


                    <button
                        class="cancel-button"
                        onclick="cancelAppointment(${appointment.id})"
                    >
                        Cancel Appointment
                    </button>

                `;


                appointmentsList.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Error loading appointments:",
            error
        );


        appointmentsList.innerHTML = `

            <div class="no-appointments">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h2>
                    Unable to Load Appointments
                </h2>

                <p>
                    Please make sure the FastAPI server is running.
                </p>

            </div>

        `;

    }

}


// ===============================
// Cancel Appointment
// ===============================

async function cancelAppointment(id) {

    const confirmCancel = confirm(
        "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) {
        return;
    }

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/appointments/${id}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Unable to cancel appointment"
            );
        }

        alert("Appointment cancelled successfully.");

        // Reload appointments from database
        loadAppointments();

    } catch (error) {

        console.error(
            "Cancellation error:",
            error
        );

        alert(
            "Unable to cancel appointment. Please make sure the hospital server is running."
        );
    }
}
// ===============================
// Admin Dashboard
// ===============================

const totalAppointments =
    document.getElementById("totalAppointments");

if (totalAppointments) {
    loadAdminStats();
}

async function loadAdminStats() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/admin/stats"
        );

        if (!response.ok) {
            throw new Error("Failed to load admin statistics");
        }

        const stats = await response.json();

        document.getElementById(
            "totalAppointments"
        ).textContent = stats.total;

        document.getElementById(
            "confirmedAppointments"
        ).textContent = stats.confirmed;

        document.getElementById(
            "cancelledAppointments"
        ).textContent = stats.cancelled;

    } catch (error) {

        console.error(
            "Error loading admin statistics:",
            error
        );

    }
}
// ===============================
// Admin Appointment Table
// ===============================

const adminAppointments =
    document.getElementById("adminAppointments");

if (adminAppointments) {
    loadAdminAppointments();
}

async function loadAdminAppointments() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/appointments"
        );

        if (!response.ok) {
            throw new Error("Failed to load appointments");
        }

        const appointments =
            await response.json();

        if (appointments.length === 0) {

            adminAppointments.innerHTML = `
                <tr>
                    <td colspan="6">
                        No appointments found
                    </td>
                </tr>
            `;

            return;
        }

        adminAppointments.innerHTML = "";

        appointments.forEach(function(appointment) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${appointment.patient_name}</td>
                <td>${appointment.doctor}</td>
                <td>${appointment.department}</td>
                <td>${appointment.appointment_date}</td>
                <td>${appointment.appointment_time}</td>
                <td>${appointment.status}</td>
            `;

            adminAppointments.appendChild(row);

        });

    } catch (error) {

        console.error(
            "Error loading admin appointments:",
            error
        );

        adminAppointments.innerHTML = `
            <tr>
                <td colspan="6">
                    Unable to load appointments
                </td>
            </tr>
        `;
    }
}