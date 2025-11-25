import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    console.log('Admin user created successfully:', {
      email: admin.email,
      _id: admin._id,
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
