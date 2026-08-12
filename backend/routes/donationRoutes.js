const express = require('express');
const router = express.Router();
const { getDonations, createDonation, approveOfflineDonation, deleteDonation, exportCsv, printReceipt } = require('../controllers/donationController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getDonations);
router.post('/', createDonation);
router.get('/export/csv', protect, exportCsv);
router.get('/:id/receipt', protect, printReceipt);
router.put('/:id/approve', protect, approveOfflineDonation);
router.delete('/:id', protect, deleteDonation);

module.exports = router;
