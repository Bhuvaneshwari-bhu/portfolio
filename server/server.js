require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');
const seedProjects = require('./data/seedData');
const Project = require('./models/Project');

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  // 1. Connect to MongoDB (in-memory or Atlas)
  await connectDB();

  // 2. Auto-seed if the collection is empty
  const count = await Project.countDocuments();
  if (count === 0) {
    console.log('📦 Empty database detected — auto-seeding projects...');
    await Project.insertMany(seedProjects);
    console.log(`✅ Seeded ${seedProjects.length} projects`);
  }

  // 3. Start HTTP server
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API base:    http://localhost:${PORT}/api`);
    console.log(`❤️  Health:      http://localhost:${PORT}/api/health`);
    console.log(`📂 Projects:    http://localhost:${PORT}/api/projects`);
    console.log(`🌍 Env:         ${process.env.NODE_ENV || 'development'}\n`);
  });
}

bootstrap().catch((err) => {
  console.error('❌ Bootstrap failed:', err.message);
  process.exit(1);
});
