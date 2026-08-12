const express = require('express');
const router = express.Router();
const { getGalleryImages, uploadGalleryImage, updateGalleryImage, deleteGalleryImage } = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');

router.get('/', getGalleryImages);
router.post('/', protect, uploadGalleryImage);
router.put('/:id', protect, updateGalleryImage);
router.delete('/:id', protect, deleteGalleryImage);

module.exports = router;
