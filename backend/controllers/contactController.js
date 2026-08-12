const Contact = require('../models/Contact');
const { jsonToCsv } = require('../services/exportUtils');

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (err) { next(err); }
};

exports.createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (err) { next(err); }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!contact) return res.status(404).json({ success: false, error: 'Contact message not found' });
    res.status(200).json({ success: true, data: contact });
  } catch (err) { next(err); }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, error: 'Contact message not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (err) { next(err); }
};

exports.exportCsv = async (req, res, next) => {
  try {
    const contacts = await Contact.find().lean();
    const csv = jsonToCsv(contacts, ['Name', 'Email', 'Subject', 'Message', 'Read', 'Date']);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="contact_messages.csv"');
    res.status(200).send(csv);
  } catch (err) { next(err); }
};
