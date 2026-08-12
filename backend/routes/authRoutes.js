const express = require('express');
const router = express.Router();
const { login, getMe, forgotPassword, register } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/me', protect, getMe);
router.post('/register', protect, adminOnly, register);

module.exports = router;
