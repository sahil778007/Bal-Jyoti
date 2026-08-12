const Setting = require('../models/Setting');

exports.getSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (err) { next(err); }
};

exports.updateSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (settings) {
      settings = await Setting.findByIdAndUpdate(settings._id, { ...req.body, updatedAt: Date.now() }, { new: true, runValidators: true });
    } else {
      settings = await Setting.create(req.body);
    }
    res.status(200).json({ success: true, message: 'Settings saved successfully', data: settings });
  } catch (err) { next(err); }
};
