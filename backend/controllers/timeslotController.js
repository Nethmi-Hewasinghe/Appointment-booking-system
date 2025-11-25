import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';

// @desc    Get available time slots for a specific date
// @route   GET /api/timeslots
// @access  Public
export const getAvailableTimeSlots = asyncHandler(async (req, res) => {
  const { date } = req.query;

  if (!date) {
    res.status(400);
    throw new Error('Please provide a date parameter');
  }

  // Define business hours (9:00 AM to 5:00 PM)
  const startTime = 9; // 9:00 AM
  const endTime = 17; // 5:00 PM
  const interval = 30; // 30 minutes interval
  
  // Generate all possible time slots for the day
  const allSlots = [];
  for (let hour = startTime; hour < endTime; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      allSlots.push(timeString);
    }
  }

  // Get all approved bookings for the specified date
  const bookings = await Booking.find({
    date,
    status: 'approved',
  });

  // Extract the booked time slots
  const bookedSlots = bookings.map(booking => booking.time);

  // Filter out the booked slots
  const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

  res.json({
    date,
    availableSlots,
    totalSlots: allSlots.length,
    bookedSlots: bookedSlots.length,
    availableCount: availableSlots.length,
  });
});

// @desc    Get time slots for a specific date with booking status
// @route   GET /api/timeslots/status
// @access  Public
export const getTimeSlotsWithStatus = asyncHandler(async (req, res) => {
  const { date } = req.query;

  if (!date) {
    res.status(400);
    throw new Error('Please provide a date parameter');
  }

  // Get all bookings for the specified date
  const bookings = await Booking.find({ date });

  // Create a map of time slots to their status
  const timeSlots = {};
  
  // Define business hours (9:00 AM to 5:00 PM)
  const startTime = 9; // 9:00 AM
  const endTime = 17; // 5:00 PM
  const interval = 30; // 30 minutes interval
  
  // Initialize all time slots as available
  for (let hour = startTime; hour < endTime; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots[timeString] = 'available';
    }
  }
  
  // Update status based on bookings
  bookings.forEach(booking => {
    timeSlots[booking.time] = booking.status;
  });

  res.json({
    date,
    timeSlots,
  });
});
