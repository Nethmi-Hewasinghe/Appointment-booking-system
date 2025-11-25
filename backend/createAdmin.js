import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async (email, password) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      // Update existing admin with new password
      const salt = await bcrypt.genSalt(10);
      adminExists.password = await bcrypt.hash(password, salt);
      await adminExists.save();
      console.log(`\n✅ Admin ${email} password updated successfully!`);
    } else {
      // Create new admin
      const admin = new Admin({
        email,
        password,
      });
      await admin.save();
      console.log(`\n✅ Admin ${email} created successfully!`);
    }
    
    console.log('\nYou can now log in with:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Get email and password from command line arguments or use defaults
const email = process.argv[2] || 'admin@example.com';
const password = process.argv[3] || 'admin123';

createAdmin(email, password);
