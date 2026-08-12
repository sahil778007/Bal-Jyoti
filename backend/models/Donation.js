const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donorName: { type: String, required: true, trim: true },
  donorEmail: { type: String, required: true, trim: true },
  donorPhone: { type: String },
  donorAddress: { type: String },
  panNumber: { type: String },
  amount: { type: Number, required: true, min: 100 },
  purpose: { type: String, required: true, default: 'General Donation' },
  message: { type: String },
  paymentType: { type: String, default: 'Offline Bank Transfer' },
  transactionRef: { type: String },
  status: { type: String, enum: ['intent_submitted', 'receipt_emailed', 'verified', 'rejected'], default: 'intent_submitted' },
  receiptIssued: { type: Boolean, default: false },
  verifiedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);
