const Newsletter = require('../models/Newsletter');
const { jsonToCsv } = require('../services/exportUtils');

exports.getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: subscribers.length, data: subscribers });
  } catch (err) { next(err); }
};

exports.subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' });
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(200).json({ success: true, message: 'Already subscribed' });
    const sub = await Newsletter.create({ email: email.toLowerCase() });
    res.status(201).json({ success: true, data: sub });
  } catch (err) { next(err); }
};

exports.deleteSubscriber = async (req, res, next) => {
  try {
    const sub = await Newsletter.findByIdAndDelete(req.params.id);
    if (!sub) return res.status(404).json({ success: false, error: 'Subscriber not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (err) { next(err); }
};

exports.exportCsv = async (req, res, next) => {
  try {
    const subs = await Newsletter.find().lean();
    const csv = jsonToCsv(subs, ['Email', 'Subscribed Date']);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="newsletter_subscribers.csv"');
    res.status(200).send(csv);
  } catch (err) { next(err); }
};
