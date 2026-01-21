import mongoose from 'mongoose';
import Post from './models/post.model.js';
import dotenv from 'dotenv';

dotenv.config();

const updateVisits = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');

    const result = await Post.updateMany(
      { visit: { $exists: false } },
      { $set: { visit: 0 } }
    );

    console.log(`Updated ${result.modifiedCount} posts with visit field`);
    
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateVisits();
