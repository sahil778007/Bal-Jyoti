const express = require('express');
const router = express.Router();
const { getContacts, createContact, markAsRead, deleteContact, exportCsv } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getContacts);
router.post('/', createContact);
router.get('/export/csv', protect, exportCsv);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteContact);

module.exports = router;
