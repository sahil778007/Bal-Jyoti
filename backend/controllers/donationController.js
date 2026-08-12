const Donation = require('../models/Donation');
const { jsonToCsv, generateReceiptHTML } = require('../services/exportUtils');

exports.getDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: donations.length, data: donations });
  } catch (err) { next(err); }
};

exports.createDonation = async (req, res, next) => {
  try {
    const receiptNum = 'BJF-' + Date.now().toString().slice(-6) + Math.floor(1000 + Math.random() * 9000);
    const donation = await Donation.create({
      ...req.body,
      receiptNumber: req.body.receiptNumber || receiptNum
    });
    res.status(201).json({ success: true, data: donation });
  } catch (err) { next(err); }
};

exports.approveOfflineDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, {
      status: 'completed',
      receiptNumber: 'BJF-OFFLINE-' + Date.now().toString().slice(-6)
    }, { new: true });
    if (!donation) return res.status(404).json({ success: false, error: 'Donation not found' });
    res.status(200).json({ success: true, data: donation });
  } catch (err) { next(err); }
};

exports.deleteDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) return res.status(404).json({ success: false, error: 'Donation not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (err) { next(err); }
};

exports.exportCsv = async (req, res, next) => {
  try {
    const donations = await Donation.find().lean();
    const csv = jsonToCsv(donations, ['Receipt', 'Donor Name', 'Email', 'Amount', 'Payment Method', 'Status', 'Date']);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="donations_report.csv"');
    res.status(200).send(csv);
  } catch (err) { next(err); }
};

exports.printReceipt = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ success: false, error: 'Donation record not found' });
    const html = generateReceiptHTML(donation);
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) { next(err); }
};
