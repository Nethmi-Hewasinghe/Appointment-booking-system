import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';

// Generate JWT and set as cookie (optional)
const generateToken = (res, adminId) => {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Optional cookie – frontend still uses Authorization header
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

// @desc    Register a new admin
// @route   POST /api/auth/register
// @access  Public (you can later protect this)
export const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if admin exists
  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  // Create admin
  const admin = await Admin.create({
    email,
    password, // hashed in pre-save hook
  });

  if (!admin) {
    res.status(400);
    throw new Error('Invalid admin data');
  }

  const token = generateToken(res, admin._id);

  res.status(201).json({
    token,
    user: {
      _id: admin._id,
      email: admin.email,
    },
  });
});

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt for email:', email);

  // Because password has select: false, you might need .select('+password')
  const admin = await Admin.findOne({ email }).select('+password');
  console.log('Admin found:', admin ? 'Yes' : 'No');

  if (admin) {
    console.log('Checking password...');
    const isMatch = await admin.matchPassword(password);
    console.log('Password match:', isMatch);

    if (isMatch) {
      console.log('Generating token...');
      const token = generateToken(res, admin._id);

      return res.json({
        token,
        user: {
          _id: admin._id,
          email: admin.email,
        },
      });
    }
  }

  console.log('Login failed for email:', email);
  res.status(401);
  throw new Error('Invalid email or password');
});

// @desc    Logout admin / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get admin profile
// @route   GET /api/auth/profile
// @access  Private
export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json({
      _id: admin._id,
      email: admin.email,
    });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});
