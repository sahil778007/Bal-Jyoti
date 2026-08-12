const express = require('express');
const router = express.Router();
const { getDashboardStats, globalSearch } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/dashboard-stats', getDashboardStats);
router.get('/search', globalSearch);

module.exports = router;
