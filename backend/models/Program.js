const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  impactStats: {
    beneficiaries: { type: String },
    villages: { type: String },
    outreach: { type: String }
  },
  imageUrl: { type: String, required: true },
  featured: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Program', ProgramSchema);
