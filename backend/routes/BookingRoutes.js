const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/add', bookingController.bookPackage); // Change '/book' to '/add'
router.get('/', bookingController.getBookings);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
