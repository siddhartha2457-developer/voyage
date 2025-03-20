const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const authMiddleware = require("../middleware/authMiddleware");


// Register New Admin
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if admin already exists
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ error: "Admin already exists" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        admin = new Admin({ name, email, password: hashedPassword });
        await admin.save();

        // Generate JWT Token
        const token = jwt.sign({ id: admin._id, isAdmin: true  }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ message: "Admin registered successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Admin Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ error: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

        const token = jwt.sign({ id: admin._id, isAdmin: true  }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


// Secure route - Only logged-in admin can access
router.get("/packages", authMiddleware, async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/packages/:id", authMiddleware, async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.json({ message: "Package deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
