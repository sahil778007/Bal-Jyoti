const express = require('express');
const router = express.Router();
const { getContentData, updateAboutFounder, updateHomepageContent } = require('../controllers/contentController');
const { protect } = require('../middleware/auth');

router.get('/', getContentData);
router.put('/about-founder', protect, updateAboutFounder);
router.put('/homepage', protect, updateHomepageContent);

module.exports = router;
