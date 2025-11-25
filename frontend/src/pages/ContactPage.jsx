// src/pages/ContactPage.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/contact", {
        name,
        email,
        message,
      });

      toast.success("Message sent successfully!");

      // Reset fields
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-50">
      <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Decorative gradient accents */}
        <div className="pointer-events-none absolute -right-28 top-0 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* Left: intro + contact details */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-slate-900/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-300">
              <ChatBubbleLeftRightIcon className="h-3 w-3" />
              Contact
            </div>

            <h1 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-[2.5rem]">
              Let&apos;s talk about your next appointment.
            </h1>

            <p className="mt-3 text-sm text-slate-300">
              Have questions about bookings, timings, or services? Send us a
              message and we&apos;ll get back to you as soon as possible. You
              can also call or WhatsApp us during opening hours.
            </p>

            {/* Contact info cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="group flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300 group-hover:bg-amber-400/30">
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-50">Call / WhatsApp</p>
                  <p className="mt-1 text-slate-300">+94 76 123 4567</p>
                  <p className="text-[11px] text-slate-500">
                    9.00 AM – 5.00 PM, all 7 days.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300 group-hover:bg-amber-400/30">
                  <EnvelopeIcon className="h-5 w-5" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-50">Email</p>
                  <p className="mt-1 text-slate-300">
                    salonmonarch@gmail.com
                  </p>
                  <p className="text-[11px] text-slate-500">
                    We usually reply within a few hours.
                  </p>
                </div>
              </div>

              <div className="group col-span-1 sm:col-span-2 flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300 group-hover:bg-amber-400/30">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-50">Visit us</p>
                  <p className="mt-1 text-slate-300">
                    No. 65b, Senanayake Mawatha, Colombo 00700, Sri Lanka
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Easy access, parking available nearby.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:pl-4">
            <div className="group mt-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/50 backdrop-blur-sm transition hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-amber-300">
                Send us a message
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Share a few details and we&apos;ll respond via email.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/70"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/70"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/70"
                    placeholder="Tell us what you’d like to book or ask…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="h-3 w-3 animate-spin rounded-full border-[2px] border-slate-900 border-t-transparent" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <ChatBubbleLeftRightIcon className="h-4 w-4" />
                      Send message
                    </>
                  )}
                </button>

                <p className="mt-3 text-[11px] text-slate-500">
                  By sending this message, you agree that we may contact you
                  back using the details provided.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
