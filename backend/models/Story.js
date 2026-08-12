const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  beneficiaryName: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, default: 'Bodh Gaya, Bihar' },
  quote: { type: String, required: true },
  fullStory: { type: String, required: true },
  imageUrl: { type: String, required: true },
  program: { type: String, default: 'Women Empowerment' },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', StorySchema);
