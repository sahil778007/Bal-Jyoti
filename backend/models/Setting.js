const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Bal Jyoti Foundation' },
  logo: { type: String, default: 'images/logo.png' },
  favicon: { type: String, default: 'images/logo.png' },
  contactEmail: { type: String, default: 'info@baljyotifoundation.org' },
  contactPhone: { type: String, default: '+91 12345 67890' },
  address: { type: String, default: 'Bodhgaya, Bihar, India' },
  googleMapsUrl: { type: String, default: 'https://maps.app.goo.gl/sriyA1cAj9hP6e8aA' },
  
  // Social Media Links
  facebook: { type: String, default: 'https://facebook.com/baljyoti' },
  instagram: { type: String, default: 'https://instagram.com/baljyoti' },
  twitter: { type: String, default: 'https://twitter.com/baljyoti' },
  youtube: { type: String, default: 'https://youtube.com/baljyoti' },
  linkedin: { type: String, default: 'https://linkedin.com/company/baljyoti' },
  
  // Hero & Homepage Sections
  heroTitle: { type: String, default: 'Empowering Rural Artisans & Communities' },
  heroSubtitle: { type: String, default: 'Bal Jyoti Foundation preserves ancient craft traditions while building sustainable livelihoods for women and families in Bihar & Jharkhand.' },
  heroEyebrow: { type: String, default: 'HERITAGE & EMPOWERMENT' },
  
  // About & Founder
  aboutText: { type: String, default: 'Bal Jyoti Foundation is a non-profit NGO based in Bodhgaya, Bihar, dedicated to rural community transformation, handloom weaving, bamboo crafts, and child education.' },
  missionText: { type: String, default: 'To empower rural artisans with modern market access, fair wages, and sustainable skill development.' },
  visionText: { type: String, default: 'A self-reliant rural India where indigenous craftsmanship creates lasting economic dignity.' },
  founderName: { type: String, default: 'Gauri Kumari' },
  founderTitle: { type: String, default: 'Founder & Managing Trustee' },
  founderBio: { type: String, default: 'Gauri Kumari founded Bal Jyoti Foundation with a vision to bring economic freedom to rural women and preserve handloom weaving heritage.' },
  founderImage: { type: String, default: 'images/team_gauri.png' },
  founderQuote: { type: String, default: 'True empowerment begins when a woman holds the loom and shapes her own destiny.' },
  
  // Bank Details
  bankDetails: {
    accountName: { type: String, default: 'Bal Jyoti Foundation' },
    bankName: { type: String, default: 'Punjab National Bank' },
    accountNumber: { type: String, default: '49220002100004394' },
    ifscCode: { type: String, default: 'PUNB0492200' },
    branchName: { type: String, default: 'Bodhgaya (Gaya)' },
    branchAddress: { type: String, default: 'Bodhgaya (Gaya), Bihar – 824231' },
    swiftCode: { type: String, default: 'PUNBINBB' },
    donationInstructions: { type: String, default: 'Please mention your name and the purpose of your donation in the bank transfer description. After completing the transfer, please send your transaction receipt to our official contact so that our team can verify and acknowledge your contribution.' },
    donationEmail: { type: String, default: 'info@baljyotifoundation.org' },
    donationPhone: { type: String, default: '+91 12345 67890' }
  },
  
  // SEO Settings
  metaTitle: { type: String, default: 'Bal Jyoti Foundation | Empowering Rural Artisans' },
  metaDescription: { type: String, default: 'Bal Jyoti Foundation empowers rural women and artisans across Bihar through handloom rugs, bamboo crafts, and education.' },
  metaKeywords: { type: String, default: 'Bal Jyoti, NGO, Bihar, Handloom Rugs, Bamboo Craft, Women Empowerment, Bodhgaya' },

  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Setting', SettingSchema);
