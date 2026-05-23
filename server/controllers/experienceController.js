const Experience = require('../models/Experience');
const asyncHandler = require('../middleware/asyncHandler');

// GET /api/experiences
const getAllExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find()
    .sort({ order: 1, createdAt: -1 })
    .lean();

  res.json({ success: true, count: experiences.length, data: experiences });
});

// GET /api/experiences/:id
const getSingleExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id).lean();

  if (!experience) {
    const err = new Error('Experience not found');
    err.statusCode = 404;
    throw err;
  }

  res.json({ success: true, data: experience });
});

// POST /api/experiences
const createExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.create(req.body);
  res.status(201).json({ success: true, data: experience });
});

// PUT /api/experiences/:id
const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).lean();

  if (!experience) {
    const err = new Error('Experience not found');
    err.statusCode = 404;
    throw err;
  }

  res.json({ success: true, data: experience });
});

// DELETE /api/experiences/:id
const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);

  if (!experience) {
    const err = new Error('Experience not found');
    err.statusCode = 404;
    throw err;
  }

  res.json({ success: true, message: 'Experience deleted', id: req.params.id });
});

module.exports = {
  getAllExperiences,
  getSingleExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
