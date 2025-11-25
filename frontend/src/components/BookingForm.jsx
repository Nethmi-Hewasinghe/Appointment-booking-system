// src/components/BookingForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarDaysIcon,
  ClockIcon,
  ScissorsIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const serviceTypes = [
  'Haircut',
  'Hair Colour',
  'Facial',
  'Grooming',
  'Bridal & Event Glam',
  'Hair Treatments',
];


const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null,
    time: '',
    serviceType: 'Haircut',
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);
  const navigate = useNavigate();

  // current step for the stepper
  const currentStep = !formData.date ? 1 : !formData.time ? 2 : 3;

  // Fetch available time slots when date or service changes
  useEffect(() => {
    if (formData.date) {
      const formattedDate = formData.date.toISOString().split('T')[0];
      fetchAvailableSlots(formattedDate);
    }
  }, [formData.date, formData.serviceType]);

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await axios.get(`/timeslots?date=${date}`);
      setAvailableSlots(response.data.availableSlots || []);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      toast.error('Failed to load available time slots');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date, time: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date) return;

    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        date: formData.date.toISOString().split('T')[0],
      };

      const { data } = await axios.post('/bookings', bookingData);

      toast.success('Appointment booked successfully!');
      setSuccessBooking(data);

      // reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: null,
        time: '',
        serviceType: 'Haircut',
      });
      setAvailableSlots([]);
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to book appointment';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step indicator */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-700/70 bg-slate-900/80 px-4 py-3 text-xs sm:text-sm">
          {[
            { id: 1, label: 'Choose Date', icon: CalendarDaysIcon },
            { id: 2, label: 'Pick Time', icon: ClockIcon },
            { id: 3, label: 'Confirm Service', icon: ScissorsIcon },
          ].map((step, index, arr) => {
            const active = currentStep === step.id;
            const completed = currentStep > step.id;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-1 items-center">
                <div
                  className={[
                    'flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition',
                    completed
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                      : active
                      ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                      : 'border-slate-600 bg-slate-800 text-slate-400',
                  ].join(' ')}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="ml-2">
                  <p
                    className={[
                      'font-medium',
                      completed || active
                        ? 'text-slate-100'
                        : 'text-slate-400',
                    ].join(' ')}
                  >
                    Step {step.id}
                  </p>
                  <p className="text-[11px] text-slate-400">{step.label}</p>
                </div>

                {index !== arr.length - 1 && (
                  <div className="mx-2 hidden flex-1 border-t border-dashed border-slate-700 sm:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          {/* Name */}
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Full Name *
            </label>
            <div className="relative mt-1">
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-xl border border-slate-700 bg-slate-800/80 px-10 py-2.5 text-sm text-slate-50 placeholder-slate-500 shadow-inner focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                placeholder="e.g. John Doe"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Email Address *
            </label>
            <div className="relative mt-1">
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-xl border border-slate-700 bg-slate-800/80 px-10 py-2.5 text-sm text-slate-50 placeholder-slate-500 shadow-inner focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="sm:col-span-3">
            <label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Phone Number *
            </label>
            <div className="relative mt-1">
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full rounded-xl border border-slate-700 bg-slate-800/80 px-10 py-2.5 text-sm text-slate-50 placeholder-slate-500 shadow-inner focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                placeholder="e.g. 07X XXX XXXX"
                required
              />
            </div>
          </div>

          {/* Service type */}
          <div className="sm:col-span-3">
            <label
              htmlFor="serviceType"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Service Type *
            </label>
            <div className="relative mt-1">
              <ScissorsIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="block w-full appearance-none rounded-xl border border-slate-700 bg-slate-800/80 px-10 py-2.5 text-sm text-slate-50 shadow-inner focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                required
              >
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                ▼
              </span>
            </div>
          </div>

          {/* Date */}
          <div className="sm:col-span-3">
            <label
              htmlFor="date"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Date *
            </label>
            <div className="relative mt-1">
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                minDate={new Date()}
                className="block w-full rounded-xl border border-slate-700 bg-slate-800/80 px-10 py-2.5 text-sm text-slate-50 placeholder-slate-500 shadow-inner focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                placeholderText="Select a date"
                dateFormat="MMMM d, yyyy"
                required
              />
            </div>
          </div>

          {/* Time */}
          <div className="sm:col-span-3">
            <label
              htmlFor="time"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Time Slot *
            </label>
            <div className="relative mt-1">
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="block w-full appearance-none rounded-xl border border-slate-700 bg-slate-800/80 px-10 py-2.5 text-sm text-slate-50 shadow-inner focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!formData.date || availableSlots.length === 0}
                required
              >
                <option value="">
                  {formData.date
                    ? availableSlots.length > 0
                      ? 'Select a time slot'
                      : 'No slots available'
                    : 'Select a date first'}
                </option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                ▼
              </span>
            </div>
            {formData.date && availableSlots.length === 0 && (
              <p className="mt-1 text-xs text-slate-400">
                No available time slots for the selected date. Please choose another date.
              </p>
            )}
          </div>
        </div>

        <div className="pt-3 sm:pt-5">
          <div className="flex flex-col items-stretch justify-end gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              By booking, you agree to arrive 5–10 minutes early. Changes can be made by calling the
              salon.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </form>

      {/* Success modal */}
      {successBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur">
          <div className="w-full max-w-md rounded-3xl border border-emerald-500/50 bg-slate-950 p-6 shadow-2xl shadow-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/20">
                <CheckCircleIcon className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  Booking confirmed!
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  We&apos;ve reserved your chair. A confirmation email will be sent shortly.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-900/80 p-4 text-xs text-slate-200">
              <p className="font-medium text-slate-100">
                {successBooking.name || 'Guest'}
              </p>
              <p className="mt-1 text-slate-300">
                {successBooking.serviceType} on{' '}
                <span className="font-semibold">
                  {successBooking.date} at {successBooking.time}
                </span>
              </p>
              {successBooking.email && (
                <p className="mt-1 text-slate-400">
                  Confirmation to: {successBooking.email}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSuccessBooking(null)}
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const booking = successBooking;
                  setSuccessBooking(null);
                  navigate('/booking-confirmation', { state: { booking } });
                }}
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/30 hover:bg-emerald-300"
              >
                View full confirmation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingForm;
