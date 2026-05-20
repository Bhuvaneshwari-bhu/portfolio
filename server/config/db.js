const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer = null;

/**
 * Resolves the MongoDB URI to use.
 * Priority: MONGODB_URI env var > in-memory server (dev only).
 */
async function resolveMongoUri() {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  // Zero-config dev mode — spin up an in-memory MongoDB instance
  console.log('⚡ MONGODB_URI not set — starting in-memory MongoDB...');
  memoryServer = await MongoMemoryServer.create({
    instance: { dbName: 'portfolio' },
  });
  return memoryServer.getUri();
}

async function connectDB() {
  try {
    const uri = await resolveMongoUri();

    const conn = await mongoose.connect(uri, {
      dbName: 'portfolio',
    });

    const host = memoryServer ? 'in-memory (dev)' : conn.connection.host;
    console.log(`✅ MongoDB connected: ${host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
}

async function disconnectDB() {
  await mongoose.connection.close();
  if (memoryServer) await memoryServer.stop();
}

module.exports = { connectDB, disconnectDB };
