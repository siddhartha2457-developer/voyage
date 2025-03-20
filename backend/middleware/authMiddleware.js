const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, "secret123"); // Change "your-secret-key" with your actual secret key
        
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: "Access Denied. Admins only." });
        }
        req.admin = decoded; // Attach admin data to request
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token." });
    }
};
