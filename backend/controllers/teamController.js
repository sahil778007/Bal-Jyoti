const Team = require('../models/Team');

exports.getTeamMembers = async (req, res, next) => {
  try {
    const members = await Team.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: members.length, data: members });
  } catch (err) { next(err); }
};

exports.createTeamMember = async (req, res, next) => {
  try {
    const member = await Team.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (err) { next(err); }
};

exports.updateTeamMember = async (req, res, next) => {
  try {
    const member = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!member) return res.status(404).json({ success: false, error: 'Team member not found' });
    res.status(200).json({ success: true, data: member });
  } catch (err) { next(err); }
};

exports.deleteTeamMember = async (req, res, next) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: 'Team member not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (err) { next(err); }
};
