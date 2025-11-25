// backend/routes/bookingRoutes.js
import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  updateBooking,          // 🔹 add this import
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to create a booking
router.post('/', createBooking);

// Protected admin routes
router.route('/').get(protect, admin, getBookings);

router
  .route('/:id')
  .get(protect, admin, getBookingById)
  .put(protect, admin, updateBooking)      // 🔹 NEW: update booking
  .delete(protect, admin, deleteBooking);  // 🔹 delete booking

router
  .route('/:id/status')
  .patch(protect, admin, updateBookingStatus);

export default router;
