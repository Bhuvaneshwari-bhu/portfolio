const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: [2000, 'Long description cannot exceed 2000 characters'],
    },
    techStack: {
      type: [String],
      required: [true, 'Tech stack is required'],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one technology is required',
      },
    },
    githubLink: {
      type: String,
      trim: true,
      default: '',
    },
    liveLink: {
      type: String,
      trim: true,
      default: '',
    },
    videoDemoLink: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      enum: ['AI', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'Other'],
      default: 'Full Stack',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#6366f1',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for common queries
projectSchema.index({ featured: -1, order: 1, createdAt: -1 });
projectSchema.index({ category: 1 });

module.exports = mongoose.model('Project', projectSchema);
