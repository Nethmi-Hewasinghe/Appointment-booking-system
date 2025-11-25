// src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../assets/logo.png';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const navLinkBase =
    'relative hidden text-sm text-slate-300 hover:text-amber-300 sm:inline-block transition-colors';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-gradient-to-b from-slate-950/95 via-slate-900/95 to-slate-950/90 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              {/* subtle glow behind logo */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-amber-400/30 blur-md" />
              <img
                src={Logo}
                alt="Salon Monarch Logo"
                className="relative h-10 w-10 rounded-2xl object-cover shadow-lg ring-1 ring-amber-300/40"
              />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-wide text-slate-50">
                Salon Monarch
              </span>
              <span className="text-[11px] text-slate-400">
                Luxury Salon Appointments
              </span>
            </div>
          </Link>

          {/* Nav / Actions */}
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className={navLinkBase}>
              Home
              <span className="absolute inset-x-0 -bottom-1 mx-auto h-px w-0 bg-amber-400 transition-all duration-200 group-hover:w-full sm:group-hover:w-full" />
            </Link>

            <Link to="/about" className={navLinkBase}>
              About
            </Link>

            <Link to="/contact" className={navLinkBase}>
              Contact
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="hidden rounded-full border border-slate-700/80 px-4 py-1.5 text-xs font-medium text-slate-200 transition hover:border-amber-400/80 hover:text-amber-300 sm:inline-block"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-slate-800 px-4 py-1.5 text-xs font-semibold text-slate-50 shadow-sm transition hover:bg-slate-700 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
