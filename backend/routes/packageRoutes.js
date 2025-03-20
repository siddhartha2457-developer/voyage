const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const upload = require('../middleware/upload');

router.post('/add', upload.single('image'), packageController.addPackage);
router.get('/', packageController.getPackages);  // Supports category query now!
router.get('/:id', packageController.getPackageById);
router.put('/:id', upload.single('image'), packageController.updatePackage);
router.delete('/:id', packageController.deletePackage);

module.exports = router;
