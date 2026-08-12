const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['Education', 'Women Empowerment', 'Handmade Rugs', 'Bamboo Crafts', 'Basketry', 'Stitching', 'Eco Tourism', 'Village', 'Children', 'Events', 'Nature', 'Culture'] },
  imageUrl: { type: String, required: true },
  publicId: { type: String }, // Cloudinary public_id
  location: { type: String, default: 'Bodh Gaya, Bihar' },
  description: { type: String },
  spanClass: { type: String, enum: ['', 'span-tall', 'span-wide', 'span-big'], default: '' },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', GallerySchema);
