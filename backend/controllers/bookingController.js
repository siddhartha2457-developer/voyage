const Booking = require('../models/Booking');

exports.bookPackage = async (req, res) => {
    try {
        const { name, email, phone, address, destination, guests, arrival, leaving, packageId } = req.body;

        const newBooking = new Booking({
            name,
            email,
            phone,
            address,
            destination,
            guests,
            arrival,
            leaving,
            packageId
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking successful', newBooking });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('packageId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
