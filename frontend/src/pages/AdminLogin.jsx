// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Logo from "../assets/logo.png"; // 👈 Add your logo here!

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success("Logged in successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 pt-16">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />

      {/* Centered login card */}
      <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo on top */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-amber-400/25 blur-xl"></div>
              <img
                src={Logo}
                alt="Salon Monarch Logo"
                className="relative h-16 w-16 rounded-2xl object-cover shadow-lg ring-2 ring-amber-300/40 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Header text */}
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
              Admin Area
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-50">
              Admin Sign In
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Log in to manage bookings, time slots & salon activity.
            </p>
          </div>

          {/* Login form card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/60 backdrop-blur-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/70 outline-none"
                  placeholder="admin@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/70 outline-none"
                  placeholder="••••••••"
                />
              </div>

              {/* Remember + forgot */}
              <div className="flex items-center justify-between text-xs">
                <label className="inline-flex items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-amber-400 focus:ring-amber-400"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="font-medium text-amber-300 hover:text-amber-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-amber-400 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              {/* Info text */}
              <p className="text-center text-[11px] text-slate-500 mt-2">
                Only authorized staff can access the Salon Monarch admin panel.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
