const Package = require('../models/Package');


exports.addPackage = async (req, res) => {
    try {
        

        const { name, location, duration, price, description, about, category } = req.body;
        const image = req.file ? req.file.filename : '';

        // Parse included and tourPlan from JSON strings to arrays
        const included = req.body.included ? JSON.parse(req.body.included) : [];
        const tourPlan = req.body.tourPlan ? JSON.parse(req.body.tourPlan) : [];

         // Validate category (optional)
        //  if (!['Kashmir', 'Ladakh'].includes(category)) {
        //     return res.status(400).json({ error: 'Invalid category. Must be Kashmir or Ladakh.' });
        // }


        const newPackage = new Package({
            name,
            location,
            duration,
            price,
            image,
            description,
            about,
            included,
            tourPlan,
            category  // ✅ Add category
        });

        await newPackage.save();
        res.status(201).json({ message: 'Package added successfully', newPackage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getPackages = async (req, res) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};  // ✅ Filter by category if provided

        const packages = await Package.find(query);
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPackageById = async (req, res) => {
    try {
        

        const packageData = await Package.findById(req.params.id);

        if (!packageData) {
            return res.status(404).json({ error: "Package not found" });
        }

        res.status(200).json(packageData);
    } catch (error) {
        console.error("Error fetching package:", error.message);
        res.status(500).json({ error: "Error fetching package" });
    }
};

exports.updatePackage = async (req, res) => {
    try {
        const updatedData = req.body;
        if (req.file) updatedData.image = req.file.path;

        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json({ message: 'Package updated successfully', updatedPackage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
