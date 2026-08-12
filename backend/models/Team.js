const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  quote: { type: String },
  photoUrl: { type: String, required: true },
  category: { type: String, enum: ['founder', 'leadership', 'advisor', 'staff'], default: 'leadership' },
  socials: {
    linkedin: { type: String },
    twitter: { type: String },
    email: { type: String }
  },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', TeamSchema);
