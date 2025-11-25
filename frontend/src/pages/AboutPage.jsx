// src/pages/AboutPage.jsx
import RavinduImg from '../assets/staff1.jpeg';
import DilaniImg from '../assets/staff2.jpeg';
import HashanImg from '../assets/staff3.jpeg';

import BridalImg from "../assets/services/bridal.jpeg";
import HaircutImg from "../assets/services/haircut.jpeg";
import ColourImg from "../assets/services/colour.jpeg";
import TreatmentImg from "../assets/services/treatment.jpeg";

import {
  ScissorsIcon,
  SparklesIcon,
  HeartIcon,
  UserGroupIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const AboutPage = () => {
  const services = [
    {
      name: 'Haircuts & Styling',
      description:
        'Classic cuts, fades, blow-dries and styling for everyday or events.',
      icon: ScissorsIcon,
    },
    {
      name: 'Colour & Highlights',
      description: 'Balayage, global colour, highlights and tone correction.',
      icon: SparklesIcon,
    },
    {
      name: 'Hair Treatments',
      description: 'Deep conditioning, keratin, scalp care and repair rituals.',
      icon: HeartIcon,
    },
    {
      name: 'Grooming & Beard',
      description: 'Beard shaping, razor work and finishing details.',
      icon: UserGroupIcon,
    },
    {
      name: 'Bridal & Event Glam',
      description:
        'Bridal hair, bridesmaid styling and special occasion looks with trials available.',
      icon: SparklesIcon,
    },
  ];

  const team = [
    {
      name: 'Ravindu Perera',
      role: 'Creative Director & Senior Stylist',
      specialty: 'Precision cuts, modern fades, occasion styling.',
      img: RavinduImg,
    },
    {
      name: 'Dilani Fernando',
      role: 'Colour Specialist',
      specialty:
        'Balayage, highlights, subtle dimension and colour correction.',
      img: DilaniImg,
    },
    {
      name: 'Hashan Madushanka',
      role: 'Grooming & Styling',
      specialty: 'Men’s grooming, beard design and classic gentleman styles.',
      img: HashanImg,
    },
  ];

  const testimonials = [
    {
      name: 'Tharushi Jayasinghe',
      role: 'Regular client',
      quote:
        'I finally found a salon that actually listens. My haircut and colour look exactly how I imagined, and the booking process is so easy.',
    },
    {
      name: 'Kasun Ranasinghe',
      role: 'Grooming client',
      quote:
        'The team is super professional and the atmosphere is calm and relaxing. I always walk out feeling sharp and confident.',
    },
    {
      name: 'Mihiri Senanayake',
      role: 'Bridal & events',
      quote:
        'They handled my event styling perfectly. Timing, service and results were all on point – highly recommend.',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-50">
      <section className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* subtle gradient accent */}
        <div className="pointer-events-none absolute -left-32 top-10 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="relative space-y-8">
          {/* Intro */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
              About us
            </p>
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl bg-gradient-to-r from-amber-200 via-rose-200 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-lg">
              Crafted cuts, colour &amp; care in one premium salon.
            </h1>
            <p className="text-sm text-slate-300">
              Salon Monarch is a contemporary salon dedicated to helping you
              look and feel your best. From classic cuts to modern colour
              transformations, we focus on personalised styling, healthy hair,
              and a relaxing in-salon experience.
            </p>
            <p className="text-sm text-slate-300">
              Our team takes time to understand your lifestyle, face shape, and
              preferences before recommending any service. Whether you&apos;re
              getting ready for a big event or simply treating yourself, every
              visit is tailored to you.
            </p>
          </div>

          {/* What we offer */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
              What we offer
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              A curated menu of hair, grooming and bridal services to match your
              style and occasions.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.name}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400/80 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-amber-500/25"
                  >
                    {/* glowing highlight */}
                    <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-amber-500/0 via-amber-400/0 to-fuchsia-500/0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30" />
                    <div className="relative z-10">
                      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/40 group-hover:bg-amber-400/25">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-50">
                        {service.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service Highlights */}
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
              Service highlights
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              A glimpse of the work we love doing – from bridal glam to everyday
              cuts.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {[
                {
                  label: 'Bridal',
                  title: 'Bridal Hair & Makeup',
                  desc: 'Soft glam, elegant updos and timeless bridal looks.',
                  // put these image files in: public/assets/services/...
                  image: BridalImg,
                },
                {
                  label: 'Cuts',
                  title: 'Signature Haircuts',
                  desc: 'From skin fades to layered cuts tailored to you.',
                  image: HaircutImg,
                },
                {
                  label: 'Colour',
                  title: 'Colour & Dimension',
                  desc: 'Balayage, highlights and rich global colour.',
                  image: ColourImg,
                },
                {
                  label: 'Treatments',
                  title: 'Care & Treatments',
                  desc: 'Repair, hydration and smoothness treatments.',
                  image: TreatmentImg,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/60 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/25"
                >
                  {/* Image container */}
                  <div className="relative h-64 w-full overflow-hidden rounded-t-2xl bg-slate-900/40">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                      style={{ objectPosition: 'center' }}
                    />

                    {/* Label */}
                    <span className="absolute left-3 top-3 rounded-full bg-amber-400/20 px-3 py-1 text-[11px] font-medium text-amber-300 backdrop-blur-md">
                      {item.label}
                    </span>

                    {/* Bottom gradient for text readability */}
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950/90 to-transparent" />
                  </div>

                  {/* Text content */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-slate-50">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meet the Team */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
              Meet the team
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              A small, dedicated team of stylists focused on detail, comfort and
              consistency.
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="flex h-full flex-col items-center rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="mb-3 h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-amber-300/60 transition duration-300 group-hover:scale-105"
                  />

                  <h3 className="text-sm font-semibold text-slate-50">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-amber-300">
                    {member.role}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {member.specialty}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
              What our clients say
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              A few words from guests who have visited Salon Monarch.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl"
                >
                  <div className="mb-2 flex items-center gap-1 text-amber-300">
                    <StarIcon className="h-4 w-4" />
                    <StarIcon className="h-4 w-4" />
                    <StarIcon className="h-4 w-4" />
                    <StarIcon className="h-4 w-4" />
                    <StarIcon className="h-4 w-4" />
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    “{t.quote}”
                  </p>
                  <div className="mt-3 text-xs">
                    <p className="font-semibold text-slate-50">{t.name}</p>
                    <p className="text-slate-400">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our promise */}
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-sm font-semibold text-slate-50">
              Our promise to you
            </h2>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              <li>• Honest recommendations that suit your hair and lifestyle.</li>
              <li>• Clean, hygienic space with carefully selected products.</li>
              <li>• Respect for your time with organised, on-schedule bookings.</li>
              <li>
                • Consistent results, whether it&apos;s your first visit or your
                tenth.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
