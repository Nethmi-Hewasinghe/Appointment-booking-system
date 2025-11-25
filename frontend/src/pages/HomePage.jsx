// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import bgImage from '../assets/bg2.png';
import {
  CalendarDaysIcon,
  ScissorsIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const scrollToForm = () => {
    const section = document.getElementById('booking-form');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero Section */}
<section
  className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${bgImage})`,
  }}
>
  {/* Gradient background (transparent) */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-900/50 to-neutral-900/40" />

 {/* Warm glow matching salon lights */}
<div className="pointer-events-none absolute -left-24 top-32 h-80 w-80 rounded-full bg-amber-500/25 blur-3xl" />

<div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />


  

  


        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-20 sm:px-6 lg:flex-row lg:items-center lg:pb-24 lg:pt-24 lg:px-8">
          {/* Left content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-slate-900/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
              <SparklesIcon className="h-4 w-4" />
              Premium Barber &amp; Salon Bookings
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-slate-50">Look sharp.</span>
              <span className="mt-1 block bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-400 bg-clip-text text-transparent">
                Book your next cut in seconds.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
              No more waiting on calls or walk-ins. Browse available slots, pick your favourite
              stylist, and lock in the perfect time for your haircut, colour, or styling &mdash;
              all in one smooth flow.
            </p>

            {/* Features */}
            <dl className="mt-8 grid gap-4 text-sm text-slate-200 sm:grid-cols-3">
              <div className="flex items-start gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/15">
                  <CalendarDaysIcon className="h-4 w-4 text-amber-300" />
                </div>
                <div>
                  <dt className="font-semibold">Live time slots</dt>
                  <dd className="text-xs text-slate-400">See what&apos;s free before you walk in.</dd>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/15">
                  <ScissorsIcon className="h-4 w-4 text-amber-300" />
                </div>
                <div>
                  <dt className="font-semibold">Services in one place</dt>
                  <dd className="text-xs text-slate-400">Haircuts, beard trims, colour &amp; more.</dd>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/15">
                  <ShieldCheckIcon className="h-4 w-4 text-amber-300" />
                </div>
                <div>
                  <dt className="font-semibold">Instant confirmations</dt>
                  <dd className="text-xs text-slate-400">Email reminders and secure bookings.</dd>
                </div>
              </div>
            </dl>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Book an appointment
              </button>

         

              <p className="mt-2 w-full text-xs text-slate-500 sm:mt-0 sm:w-auto">
                Open hours: 9.00 AM &ndash; 5.00 PM, 7 days a week.
              </p>
            </div>
          </div>

          {/* Right side preview card */}
          <div className="flex-1">
            <div className="mx-auto max-w-md rounded-3xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-2xl shadow-black/60 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Next available</p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">Today, 4:30 PM</p>
                  <p className="text-xs text-slate-400">Senior Barber • Classic Cut</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-rose-400 text-slate-950 font-bold text-lg shadow-md">
                  24/7
                </div>
              </div>

              <div className="mt-6 space-y-3 text-xs text-slate-300">
                <div className="flex items-center justify-between rounded-2xl bg-slate-800/70 px-3 py-3">
                  <div>
                    <p className="text-slate-200">Fade + Beard Trim</p>
                    <p className="text-[11px] text-slate-400">45 min • LKR 2,800</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                    Popular
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-800/40 px-3 py-3">
                  <div>
                    <p className="text-slate-200">Hair Colour + Styling</p>
                    <p className="text-[11px] text-slate-400">60 min • LKR 4,500</p>
                  </div>
                  <span className="rounded-full bg-slate-700/80 px-2.5 py-1 text-[11px] text-slate-300">
                    Limited slots
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-700/80 px-3 py-3">
                  <div>
                    <p className="text-slate-200">You&apos;re one step away</p>
                    <p className="text-[11px] text-slate-400">Pick a date, time &amp; service below.</p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-[11px] text-slate-500">
                No pre-payment required. You&apos;ll receive an instant email with your booking details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="relative border-t border-slate-800/80 bg-slate-950/95">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-400/10 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
              Schedule an appointment
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-50 sm:text-3xl">
              Choose your date, time &amp; service
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Fill in the form below and we&apos;ll hold the chair just for you.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-4 shadow-xl shadow-black/50 sm:p-6 lg:p-8">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Mobile floating Book Now button */}
      <button
        type="button"
        onClick={scrollToForm}
        className="fixed bottom-5 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/40 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 md:hidden"
      >
        <CalendarDaysIcon className="h-4 w-4" />
        Book Now
      </button>
    </div>
  );
};

export default HomePage;
