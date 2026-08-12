const Setting = require('../models/Setting');
const Story = require('../models/Story');
const Testimonial = require('../models/Testimonial');
const Program = require('../models/Program');

// Get All Public CMS Content Data for Front-end Website
exports.getContentData = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) settings = await Setting.create({});

    const stories = await Story.find().catch(() => []);
    const testimonials = await Testimonial.find().catch(() => []);
    const programs = await Program.find().catch(() => []);

    res.status(200).json({
      success: true,
      data: {
        // Hero & Homepage
        heroTitle: settings.heroTitle,
        heroSubtitle: settings.heroSubtitle,
        heroEyebrow: settings.heroEyebrow,
        
        // About Us & Founder
        aboutText: settings.aboutText,
        missionText: settings.missionText,
        visionText: settings.visionText,
        founderName: settings.founderName,
        founderTitle: settings.founderTitle,
        founderBio: settings.founderBio,
        founderImage: settings.founderImage,
        founderQuote: settings.founderQuote,
        
        // Contact & Brand
        siteName: settings.siteName,
        contactEmail: settings.contactEmail,
        contactPhone: settings.contactPhone,
        address: settings.address,
        logo: settings.logo,
        favicon: settings.favicon,
        socials: {
          facebook: settings.facebook,
          instagram: settings.instagram,
          twitter: settings.twitter,
          youtube: settings.youtube,
          linkedin: settings.linkedin
        },
        bankDetails: settings.bankDetails,

        stories,
        testimonials,
        programs
      }
    });
  } catch (err) { next(err); }
};

// Update About Us & Founder Content
exports.updateAboutFounder = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) settings = await Setting.create({});

    const fields = ['aboutText', 'missionText', 'visionText', 'founderName', 'founderTitle', 'founderBio', 'founderImage', 'founderQuote'];
    fields.forEach(f => {
      if (req.body[f] !== undefined) settings[f] = req.body[f];
    });

    settings.updatedAt = Date.now();
    await settings.save();

    res.status(200).json({
      success: true,
      message: 'About & Founder details updated successfully',
      data: settings
    });
  } catch (err) { next(err); }
};

// Update Homepage & Hero Content
exports.updateHomepageContent = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) settings = await Setting.create({});

    const fields = ['heroTitle', 'heroSubtitle', 'heroEyebrow', 'siteName', 'contactEmail', 'contactPhone', 'address'];
    fields.forEach(f => {
      if (req.body[f] !== undefined) settings[f] = req.body[f];
    });

    settings.updatedAt = Date.now();
    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Homepage content updated successfully',
      data: settings
    });
  } catch (err) { next(err); }
};
