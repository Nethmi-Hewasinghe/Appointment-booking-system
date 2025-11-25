import mongoose from 'mongoose';

const SERVICE_TYPES = [
  'Haircut',
  'Hair Colour',
  'Facial',
  'Grooming',
  'Bridal & Event Glam',
  'Hair Treatments',
];

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
    },
    date: {
      type: String,
      required: [true, 'Please provide a date'],
    },
    time: {
      type: String,
      required: [true, 'Please provide a time'],
    },
    serviceType: {
      type: String,
      required: [true, 'Please select a service'],
      enum: {
        values: SERVICE_TYPES,
        message: 'Please select a valid service',
      },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster querying
bookingSchema.index({ date: 1, time: 1, status: 1 });

// Prevent duplicate bookings for the same date and time
bookingSchema.index(
  { date: 1, time: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: 'approved' },
    message: 'This time slot is already booked',
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
