// src/pages/BookingConfirmation.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  useEffect(() => {
    if (!booking) {
      navigate('/');
    }
  }, [booking, navigate]);

  if (!booking) return null;

  return (
    <div className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Booking Confirmed!
          </h1>
          <p className="mt-6 text-base text-gray-600">
            Thank you for booking with us, {booking.name}. We've sent a confirmation to{' '}
            {booking.email}.
          </p>
          <div className="mt-10 bg-gray-50 p-6 rounded-lg text-left max-w-md mx-auto">
            <h2 className="text-lg font-medium text-gray-900">Appointment Details</h2>
            <dl className="mt-4 space-y-2">
              <div className="flex">
                <dt className="w-32 text-gray-500">Service:</dt>
                <dd className="text-gray-900">{booking.serviceType}</dd>
              </div>
              <div className="flex">
                <dt className="w-32 text-gray-500">Date:</dt>
                <dd className="text-gray-900">
                  {new Date(booking.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </dd>
              </div>
              <div className="flex">
                <dt className="w-32 text-gray-500">Time:</dt>
                <dd className="text-gray-900">{booking.time}</dd>
              </div>
              <div className="flex">
                <dt className="w-32 text-gray-500">Status:</dt>
                <dd className="text-gray-900">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Back to home
            </a>
            <a
              href="#"
              className="text-sm font-semibold text-gray-900"
              onClick={(e) => {
                e.preventDefault();
                window.print();
              }}
            >
              Print confirmation <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;