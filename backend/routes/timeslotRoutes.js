import express from 'express';
import {
  getAvailableTimeSlots,
  getTimeSlotsWithStatus,
} from '../controllers/timeslotController.js';

const router = express.Router();

// Public routes
router.get('/', getAvailableTimeSlots);
router.get('/status', getTimeSlotsWithStatus);

export default router;
