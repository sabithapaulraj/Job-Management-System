const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    jobTitle: { type: String, required: true },
    location: { type: String, required: true },
    company: { type: String, required: true },
    skillsRequired: { type: [String], required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true },
    status: { type: String, required: true },
});

module.exports = mongoose.model('Job', JobSchema);