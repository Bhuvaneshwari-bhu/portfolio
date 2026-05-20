const Project = require('../models/Project');
const asyncHandler = require('../middleware/asyncHandler');

// ─── GET /api/projects ────────────────────────────────────────────────────────
const getAllProjects = asyncHandler(async (req, res) => {
  const { category, featured, limit = 20, page = 1 } = req.query;

  const filter = {};
  if (category && category !== 'All') filter.category = category;
  if (featured === 'true') filter.featured = true;

  const skip = (Number(page) - 1) * Number(limit);

  const [projects, total] = await Promise.all([
    Project.find(filter)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .limit(Number(limit))
      .skip(skip)
      .lean(),
    Project.countDocuments(filter),
  ]);

  res.json({
    success: true,
    count: projects.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: projects,
  });
});

// ─── GET /api/projects/:id ────────────────────────────────────────────────────
const getSingleProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).lean();

  if (!project) {
    const err = new Error('Project not found');
    err.statusCode = 404;
    throw err;
  }

  res.json({ success: true, data: project });
});

// ─── POST /api/projects ───────────────────────────────────────────────────────
const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

// ─── PUT /api/projects/:id ────────────────────────────────────────────────────
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).lean();

  if (!project) {
    const err = new Error('Project not found');
    err.statusCode = 404;
    throw err;
  }

  res.json({ success: true, data: project });
});

// ─── DELETE /api/projects/:id ─────────────────────────────────────────────────
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    const err = new Error('Project not found');
    err.statusCode = 404;
    throw err;
  }

  res.json({ success: true, message: 'Project deleted successfully', id: req.params.id });
});

module.exports = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
