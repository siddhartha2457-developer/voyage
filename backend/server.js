const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const sendMail = require('./mailService');


const adminRoutes = require("./routes/adminRoutes"); 
const path = require('path');



dotenv.config();

const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/BookingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.use('/uploads', express.static('uploads'));


// Default Route for Testing
app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});

// Routes
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected to test database"))
  .catch(err => console.error("DB Connection Error:", err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post('/send-mail', async (req, res) => {
    const { name, email, phone, destination } = req.body;
  
    try {
      const response = await sendMail(name, email, phone, destination);
      res.status(200).send('Email sent successfully: ' + response);
    } catch (error) {
      res.status(500).send('Failed to send email');
    }
  });