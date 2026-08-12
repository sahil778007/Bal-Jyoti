const Program = require('../models/Program');

// @desc    Get all programs/interventions
// @route   GET /api/v1/programs
// @access  Public
exports.getPrograms = async (req, res, next) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: programs.length, data: programs });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single program by ID or slug
// @route   GET /api/v1/programs/:id
// @access  Public
exports.getProgramById = async (req, res, next) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, error: 'Program not found' });
    }
    res.status(200).json({ success: true, data: program });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new program
// @route   POST /api/v1/programs
// @access  Private/Admin
exports.createProgram = async (req, res, next) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json({ success: true, data: program });
  } catch (err) {
    next(err);
  }
};

// @desc    Update program
// @route   PUT /api/v1/programs/:id
// @access  Private/Admin
exports.updateProgram = async (req, res, next) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!program) {
      return res.status(404).json({ success: false, error: 'Program not found' });
    }
    res.status(200).json({ success: true, data: program });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete program
// @route   DELETE /api/v1/programs/:id
// @access  Private/Admin
exports.deleteProgram = async (req, res, next) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, error: 'Program not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
