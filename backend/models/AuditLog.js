const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  adminUser: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: String },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
