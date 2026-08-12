const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Non-Binary', 'Prefer not to say'], default: 'Prefer not to say' },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  qualification: { type: String, required: true },
  currentCollegeCompany: { type: String },
  courseDegree: { type: String },
  skills: { type: String, required: true },
  experience: { type: String },
  preferredRole: { 
    type: String, 
    enum: ['Intern', 'Trainee', 'Volunteer', 'Employee', 'Partner'],
    required: true 
  },
  department: { 
    type: String, 
    enum: ['Education', 'Women Empowerment', 'Rugs', 'Bamboo', 'Basketry', 'Stitching', 'Eco Tourism', 'Administration', 'Marketing', 'IT'],
    required: true 
  },
  duration: { 
    type: String, 
    enum: ['1 Month', '2 Months', '3 Months', '6 Months', '1 Year'],
    required: true 
  },
  availableFrom: { type: String, required: true },
  resumeUrl: { type: String },
  resumeFileName: { type: String },
  portfolioUrl: { type: String },
  profilePhotoUrl: { type: String },
  whyJoin: { type: String, required: true },
  contribution: { type: String, required: true },
  declaration: { type: Boolean, required: true, default: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
