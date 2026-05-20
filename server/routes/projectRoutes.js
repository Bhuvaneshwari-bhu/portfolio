const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

// ─── /api/projects ────────────────────────────────────────────────────────────
router.route('/')
  .get(getAllProjects)
  .post(createProject);

// ─── /api/projects/:id ────────────────────────────────────────────────────────
router.route('/:id')
  .get(getSingleProject)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;
