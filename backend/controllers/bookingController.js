// backend/controllers/bookingController.js
import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';
import {
  sendBookingAcknowledgement,
  sendBookingConfirmation,
  sendBookingNotification,
  sendBookingUpdated,
  sendBookingCancelled,
} from '../utils/emailService.js';

/**
 * @desc   Create a new booking (public form + admin add)
 * @route  POST /api/bookings
 * @access Public
 */
export const createBooking = asyncHandler(async (req, res) => {
  const { name, email, phone, date, time, serviceType, status } = req.body;

  if (!name || !email || !phone || !date || !time || !serviceType) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Prevent double-booking of an already approved slot
  const existingApproved = await Booking.findOne({
    date,
    time,
    status: 'approved',
  });

  if (existingApproved) {
    res.status(409);
    throw new Error('This time slot is already booked');
  }

  const booking = await Booking.create({
    name,
    email,
    phone,
    date,
    time,
    serviceType,
    status: status || 'pending',
  });

  if (!booking) {
    res.status(400);
    throw new Error('Invalid booking data');
  }

  // Try to send emails; if they fail, don't break the API
  try {
    // Email to admin: “new booking request”
    await sendBookingNotification(booking);

    // Email to customer: “we received your request”
    await sendBookingAcknowledgement(booking);
  } catch (err) {
    console.error('Email sending failed for new booking:', err.message);
  }

  res.status(201).json({
    _id: booking._id,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    date: booking.date,
    time: booking.time,
    serviceType: booking.serviceType,
    status: booking.status,
  });
});

/**
 * @desc   Get all bookings (optionally filter by ?status=pending/approved/cancelled)
 * @route  GET /api/bookings
 * @access Private/Admin
 */
export const getBookings = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const query = {};
  if (status && ['pending', 'approved', 'cancelled'].includes(status)) {
    query.status = status;
  }

  const bookings = await Booking.find(query)
    .sort({ date: 1, time: 1 })
    .select('-__v');

  res.json(bookings);
});

/**
 * @desc   Get a single booking by ID
 * @route  GET /api/bookings/:id
 * @access Private/Admin
 */
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).select('-__v');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  res.json(booking);
});

/**
 * @desc   Update booking (full edit from admin)
 * @route  PUT /api/bookings/:id
 * @access Private/Admin
 */
export const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  const prevStatus = booking.status;

  const {
    name,
    email,
    phone,
    date,
    time,
    serviceType,
    status,
  } = req.body;

  // Compute what the new values will be (using existing values if not provided)
  const nextStatus = status || booking.status;
  const nextDate = date || booking.date;
  const nextTime = time || booking.time;

  // If approving this booking, ensure no other approved booking exists at the same slot
  if (nextStatus === 'approved') {
    const existingApproved = await Booking.findOne({
      date: nextDate,
      time: nextTime,
      status: 'approved',
      _id: { $ne: booking._id },
    });

    if (existingApproved) {
      res.status(409);
      throw new Error('This time slot is already booked');
    }
  }

  // Update only fields that were sent
  if (name !== undefined) booking.name = name;
  if (email !== undefined) booking.email = email;
  if (phone !== undefined) booking.phone = phone;
  if (date !== undefined) booking.date = date;
  if (time !== undefined) booking.time = time;
  if (serviceType !== undefined) booking.serviceType = serviceType;
  if (status !== undefined) booking.status = status;

  const updatedBooking = await booking.save();

  // If newly approved, send confirmation email
  if (prevStatus !== 'approved' && updatedBooking.status === 'approved') {
    try {
      await sendBookingConfirmation(updatedBooking);
    } catch (err) {
      console.error(
        'Failed to send confirmation email (updateBooking):',
        err.message
      );
    }
  } else {
    // Otherwise, send "updated" email
    try {
      await sendBookingUpdated(updatedBooking);
    } catch (err) {
      console.error(
        'Failed to send updated email (updateBooking):',
        err.message
      );
    }
  }

  res.json({
    _id: updatedBooking._id,
    name: updatedBooking.name,
    email: updatedBooking.email,
    phone: updatedBooking.phone,
    date: updatedBooking.date,
    time: updatedBooking.time,
    serviceType: updatedBooking.serviceType,
    status: updatedBooking.status,
  });
});

/**
 * @desc   Update booking status only (Approve / Cancel / Pending)
 * @route  PATCH /api/bookings/:id/status
 * @access Private/Admin
 */
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!['pending', 'approved', 'cancelled'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  const prevStatus = booking.status;
  booking.status = status;
  const updatedBooking = await booking.save();

  // If newly approved, send confirmation email
  if (prevStatus !== 'approved' && updatedBooking.status === 'approved') {
    try {
      await sendBookingConfirmation(updatedBooking);
    } catch (err) {
      console.error(
        'Failed to send confirmation email (updateBookingStatus):',
        err.message
      );
    }
  } else if (updatedBooking.status === 'cancelled') {
    // If explicitly set to cancelled via status change
    try {
      await sendBookingCancelled(updatedBooking);
    } catch (err) {
      console.error(
        'Failed to send cancellation email (updateBookingStatus):',
        err.message
      );
    }
  } else {
    // For other status changes, you could also send update email if you want
    // await sendBookingUpdated(updatedBooking);
  }

  res.json({
    _id: updatedBooking._id,
    name: updatedBooking.name,
    email: updatedBooking.email,
    phone: updatedBooking.phone,
    date: updatedBooking.date,
    time: updatedBooking.time,
    serviceType: updatedBooking.serviceType,
    status: updatedBooking.status,
  });
});

/**
 * @desc   Delete a booking
 * @route  DELETE /api/bookings/:id
 * @access Private/Admin
 */
export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Try sending cancellation email before deleting
  try {
    await sendBookingCancelled(booking);
  } catch (err) {
    console.error(
      'Failed to send cancellation email (deleteBooking):',
      err.message
    );
  }

  // ✅ Use model-based delete instead of booking.remove()
  await Booking.deleteOne({ _id: booking._id });

  res.status(200).json({ message: 'Booking removed successfully' });
});
