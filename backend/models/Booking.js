const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    destination: String,
    guests: Number,
    arrival: Date,
    // leaving: Date,
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
