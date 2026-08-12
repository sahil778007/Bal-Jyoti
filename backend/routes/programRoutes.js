const express = require('express');
const router = express.Router();
const {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram
} = require('../controllers/programController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getPrograms)
  .post(protect, createProgram);

router.route('/:id')
  .get(getProgramById)
  .put(protect, updateProgram)
  .delete(protect, deleteProgram);

module.exports = router;
