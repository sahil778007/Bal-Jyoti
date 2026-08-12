const express = require('express');
const router = express.Router();
const { getMediaFiles, uploadMediaFile, deleteMediaFile } = require('../controllers/mediaController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getMediaFiles);
router.post('/upload', protect, uploadMediaFile);
router.post('/delete', protect, deleteMediaFile);

module.exports = router;
