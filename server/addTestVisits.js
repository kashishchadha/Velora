import mongoose from 'mongoose';
import Post from './models/post.model.js';
import dotenv from 'dotenv';

dotenv.config();

const addTestVisits = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');

    const posts = await Post.find({}).limit(10);
    
    if (posts.length === 0) {
      console.log('No posts found');
      process.exit(0);
    }

    console.log(`Found ${posts.length} posts. Adding random visit counts...`);

    for (let i = 0; i < posts.length; i++) {
      const randomVisits = Math.floor(Math.random() * 100) + 1;
      await Post.findByIdAndUpdate(posts[i]._id, { visit: randomVisits });
      console.log(`Updated post "${posts[i].title}" with ${randomVisits} visits`);
    }

    console.log('\nAll posts updated! Now check "Most Popular" to see them sorted by visits.');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

addTestVisits();
