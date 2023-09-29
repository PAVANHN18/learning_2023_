const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample data for doctors
const doctors = [
  { id: 1, name: 'Dr. Smith', specializations: ['Cardiology'], availability: ['Monday', 'Wednesday'], maxPatients: 5 },
  // Add more doctors as needed
];

// Sample data for appointments
const appointments = [];

app.use(bodyParser.json());

// Doctors Listing
app.get('/doctors', (req, res) => {
  res.json(doctors);
});

// Doctor Detail Page
app.get('/doctors/:doctorId', (req, res) => {
  const doctorId = parseInt(req.params.doctorId);
  const doctor = doctors.find(doc => doc.id === doctorId);

  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }

  res.json(doctor);
});

// Appointment Booking
app.post('/appointments/book', (req, res) => {
  const { doctorId, patientId, date, time } = req.body;
  const doctor = doctors.find(doc => doc.id === doctorId);

  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }

  if (doctor.availability.includes(date) && doctor.maxPatients > 0) {
    // Book the appointment
    appointments.push({ doctorId, patientId, date, time });
    doctor.maxPatients--;

    return res.json({ success: true, message: 'Appointment booked successfully' });
  } else {
    return res.status(400).json({ error: 'Doctor not available or maximum patients reached' });
  }
});

// Run the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
