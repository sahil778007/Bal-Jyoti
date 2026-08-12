const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security Middleware (with loose Content Security Policy for FontAwesome & Google Fonts)
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(rateLimiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static directory for uploaded files and root images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, '../images')));

// API Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bal Jyoti Foundation REST API Operational',
    timestamp: new Date().toISOString()
  });
});

// Mount API Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/applications', require('./routes/applicationRoutes'));
app.use('/api/v1/donations', require('./routes/donationRoutes'));
app.use('/api/v1/gallery', require('./routes/galleryRoutes'));
app.use('/api/v1/events', require('./routes/eventRoutes'));
app.use('/api/v1/contact', require('./routes/contactRoutes'));
app.use('/api/v1/newsletter', require('./routes/newsletterRoutes'));
app.use('/api/v1/team', require('./routes/teamRoutes'));
app.use('/api/v1/content', require('./routes/contentRoutes'));
app.use('/api/v1/settings', require('./routes/settingRoutes'));
app.use('/api/v1/programs', require('./routes/programRoutes'));
app.use('/api/v1/media', require('./routes/mediaRoutes'));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'API Endpoint Not Found' });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
