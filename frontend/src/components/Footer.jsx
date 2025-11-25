// src/components/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/95 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid gap-8 sm:grid-cols-3">
          
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-slate-100 tracking-wide">
              Salon Monarch
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Elevating appointments with style, comfort & modern luxury.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-amber-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <span className="text-slate-400">Phone:</span> 
                <span className="ml-1 text-slate-200 hover:text-amber-300 transition">+94 76 123 4567</span>
              </li>
              <li>
                <span className="text-slate-400">Email:</span>
                <span className="ml-1 text-slate-200 hover:text-amber-300 transition">salonmonarch@gmail.com</span>
              </li>
              <li className="text-slate-400 text-xs mt-3">
                Open daily • 9:00 AM – 5:00 PM
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-800"></div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} <span className="text-slate-300 font-medium">Salon Monarch</span>.  
            All rights reserved.
          </p>

          <p className="tracking-wide text-slate-400">
            Delivering quality grooming with a touch of luxury ✂️✨
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
