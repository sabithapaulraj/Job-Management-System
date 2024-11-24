const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/', jobController.getAllJobs);
router.post('/', jobController.addJob);
router.put('/:id', jobController.editJob);
router.delete('/:id', jobController.deleteJob);
// router.get('/search', jobController.searchJobs);

module.exports = router;