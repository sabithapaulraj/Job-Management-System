const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the connectDB function
require('dotenv').config(); // Load environment variables
const jobRoutes = require('./routes/jobRoutes');

// Connect to MongoDB
connectDB();

const app = express();
console.log("Mongo URI:", process.env.MONGO_URI);
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use('/api/jobs',jobRoutes);

// Sample in-memory job storage
let jobs = [
    { id: 1, title: 'Software Engineer', description: 'Develop and maintain software applications.' },
    { id: 2, title: 'Product Manager', description: 'Oversee product development and strategy.' },
];

// GET route to fetch jobs
app.get('/api/jobs', (req, res) => {
    res.json(jobs); // Respond with the jobs array
});

// POST route to add a new job
app.post('/api/jobs', (req, res) => {
    const newJob = req.body;
    newJob.id = jobs.length + 1; // Assign a new ID based on the current length of the array
    jobs.push(newJob); // Add the new job to the array
    res.status(201).json(newJob); // Respond with the created job
});

// PUT route to update a job
app.put('/api/jobs/:id', (req, res) => {
    const jobId = parseInt(req.params.id); // Match this with your ID type (number or string)
    const updatedJob = req.body;

    const jobIndex = jobs.findIndex(job => job.id === jobId); // Use id or _id based on your data
    if (jobIndex !== -1) {
        jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJob }; // Update job with new data
        res.json(jobs[jobIndex]); // Return the updated job
    } else {
        res.status(404).send({ message: 'Job not found' });
    }
});

// DELETE route to delete a job
app.delete('/api/jobs/:id', (req, res) => {
    const jobId = parseInt(req.params.id); // Assuming you use integers for IDs
    jobs = jobs.filter((job) => job.id !== jobId); // Adjust to use `id` if not `_id`
    res.status(200).json({ message: 'Job deleted successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const jobRoutes = require('./routes/jobRoutes');
// const cors = require('cors');

// // Load .env variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/jobs', jobRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on PORT ${PORT}`);
// });
