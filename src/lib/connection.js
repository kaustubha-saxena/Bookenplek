import mongoose from 'mongoose';

const cached = globalThis.mongooseConnectionCache ??= {
  promise: null,
};

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    const error = new Error('MONGODB_URI is not configured');
    error.code = 'MONGODB_URI_MISSING';
    throw error;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (mongoose.connection.readyState !== 2) {
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
      .then(() => mongoose)
      .catch((error) => {
        cached.promise = null;
        throw error;
      });
  }

  return cached.promise;
}
