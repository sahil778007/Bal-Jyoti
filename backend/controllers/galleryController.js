const Gallery = require('../models/Gallery');

exports.getGalleryImages = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }
    const images = await Gallery.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: images.length, data: images });
  } catch (err) { next(err); }
};

exports.uploadGalleryImage = async (req, res, next) => {
  try {
    const image = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: image });
  } catch (err) { next(err); }
};

exports.updateGalleryImage = async (req, res, next) => {
  try {
    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!image) return res.status(404).json({ success: false, error: 'Gallery image not found' });
    res.status(200).json({ success: true, data: image });
  } catch (err) { next(err); }
};

exports.deleteGalleryImage = async (req, res, next) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ success: false, error: 'Gallery image not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (err) { next(err); }
};
