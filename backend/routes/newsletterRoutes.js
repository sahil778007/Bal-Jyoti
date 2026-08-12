const express = require('express');
const router = express.Router();
const { getSubscribers, subscribe, deleteSubscriber, exportCsv } = require('../controllers/newsletterController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getSubscribers);
router.post('/subscribe', subscribe);
router.get('/export/csv', protect, exportCsv);
router.delete('/:id', protect, deleteSubscriber);

module.exports = router;
