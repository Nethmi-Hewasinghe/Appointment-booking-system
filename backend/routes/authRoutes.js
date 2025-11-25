import express from 'express';
import {
  registerAdmin,
  authAdmin,
  logoutAdmin,
  getAdminProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerAdmin);
router.post('/login', authAdmin);

// Protected routes
router.post('/logout', protect, logoutAdmin);
router.get('/profile', protect, getAdminProfile);

export default router;
