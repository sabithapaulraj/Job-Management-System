const Job = require('../models/Job');

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a job
exports.addJob = async (req, res) => {
    const job = new Job(req.body);
    try {
        const savedJob = await job.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Edit a job
exports.editJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a job
exports.deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search jobs
exports.searchJobs = async (req, res) => {
    const { query } = req;
    try {
        const jobs = await Job.find(query);
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};