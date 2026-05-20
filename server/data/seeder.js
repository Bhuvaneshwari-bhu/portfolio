require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../config/db');
const Project = require('../models/Project');
const seedProjects = require('./seedData');

async function seed() {
  await connectDB();
  console.log('\n🌱 Starting database seed...\n');

  await Project.deleteMany({});
  console.log('🗑️  Cleared existing projects');

  const created = await Project.insertMany(seedProjects);
  console.log(`✅ Inserted ${created.length} projects:\n`);
  created.forEach((p) => console.log(`   • ${p.title}`));

  console.log('\n✨ Seed complete!\n');
  await disconnectDB();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
