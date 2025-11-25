import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const checkAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    // Find all admin users
    const admins = await Admin.find({});
    console.log('\n=== Admin Users ===');
    console.log(JSON.stringify(admins, null, 2));
    
    if (admins.length > 0) {
      console.log('\nTo test login with the first admin, run:');
      console.log(`curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "${admins[0].email}", "password": "YOUR_PASSWORD"}'`);
    } else {
      console.log('\nNo admin users found. To create one, run:');
      console.log(`curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "yourpassword"}'`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkAdmin();
