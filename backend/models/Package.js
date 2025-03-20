const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    name: String,
    location: String,
    duration: String,
    category: {
        type: String,
        enum: ['Kashmir', 'Ladakh' , 'all'],  // Restrict to these two values
        required: true
    },
    price: Number,
    image: String,
    description: String,
    about: String,
    included: [String],  // Array of included items
    tourPlan: [String]   // Array of tour days
}, { timestamps: true });

module.exports = mongoose.model('Package', PackageSchema);
