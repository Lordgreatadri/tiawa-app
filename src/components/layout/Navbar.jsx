import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import AppLogo from '../ui/AppLogo';

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ background: 'rgba(10,10,15,0.85)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <AppLogo />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{display: 'none'}}
                  className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-colors"
                  style={{ display: 'none', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <p className="text-xs font-medium text-gray-400 mb-0.5"></p>
              <a href="mailto:akwaaba@44technology.co" className="text-sm text-white hover:text-violet-300 transition-colors">
               Talk to us:  akwaaba@44technology.co
              </a>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 space-y-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-sm text-gray-400 hover:text-white py-2"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-sm text-gray-400 hover:text-white py-2"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="block text-sm text-gray-400 hover:text-white py-2 w-full text-left"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-sm text-gray-400 hover:text-white py-2"
                onClick={() => setMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="inline-block text-sm font-semibold px-4 py-2 rounded-lg text-white"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}