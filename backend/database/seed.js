const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Application = require('../models/Application');
const Donation = require('../models/Donation');
const Gallery = require('../models/Gallery');
const Event = require('../models/Event');
const Team = require('../models/Team');
const Setting = require('../models/Setting');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/baljyoti';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for Seeding...');

    // Seed Admin User
    const existingAdmin = await User.findOne({ email: 'admin@baljyotifoundation.org' });
    if (!existingAdmin) {
      await User.create({
        name: 'Bal Jyoti Administrator',
        email: 'admin@baljyotifoundation.org',
        password: 'Admin@123456',
        role: 'superadmin'
      });
      console.log('Default Admin Account Created: admin@baljyotifoundation.org / Admin@123456');
    }

    // Seed Default Settings
    const existingSetting = await Setting.findOne();
    if (!existingSetting) {
      await Setting.create({
        siteName: 'Bal Jyoti Foundation',
        siteEmail: 'info@baljyotifoundation.org',
        sitePhone: '+91 12345 67890',
        address: 'Bodhgaya, Bihar, India',
        facebook: 'https://facebook.com/baljyoti',
        instagram: 'https://instagram.com/baljyoti',
        bankName: 'State Bank of India',
        accountNumber: '39485710294',
        ifscCode: 'SBIN0001234',
        accountName: 'Bal Jyoti Foundation'
      });
      console.log('Default Website Settings Initialized.');
    }

    console.log('Seeding Completed Successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
};

seedData();
