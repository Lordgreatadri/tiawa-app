import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

import AppLogo from '../ui/AppLogo';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid md:grid-cols-4 gap-8 mb-8" style={{ display: 'none' }}>
          <div className="md:col-span-2">
            <AppLogo variant="footer" />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#9ca3af' }}>
              More than shortening — insightful, trackable, and locally optimised links for the African market.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-white mb-4">Product</h5>
            <ul className="space-y-2 text-sm" style={{ color: '#9ca3af' }}>
              <li><a href="/#features" className="hover:text-gray-300 transition-colors">Features</a></li>
              <li><a href="/#how-it-works" className="hover:text-gray-300 transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">API Docs</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-white mb-4">Account</h5>
            <ul className="space-y-2 text-sm" style={{ color: '#9ca3af' }}>
              <li><Link to="/contact" className="hover:text-gray-300 transition-colors">Contact Us</Link></li>
              <li><Link to="/login" className="hover:text-gray-300 transition-colors  cursor-not-allowed pointer-events-none">Log in</Link></li>
              <li><Link to="/register" className="hover:text-gray-300 transition-colors  cursor-not-allowed pointer-events-none">Sign up</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact strip */}
        <div
          className="mt-8 rounded-2xl px-6 py-5 grid sm:grid-cols-3 gap-4"
          style={{display: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(124,58,237,0.15)' }}
            >
              <Mail size={16} style={{ color: '#a78bfa' }} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-0.5">Email</p>
              <a href="mailto:akwaaba@44technology.co" className="text-sm text-white hover:text-violet-300 transition-colors">
                akwaaba@44technology.co
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(251,146,60,0.12)' }}
            >
              <Phone size={16} style={{ color: '#fb923c' }} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-0.5">Phone / WhatsApp</p>
              <a href="tel:+233206688119" className="text-sm text-white hover:text-orange-300 transition-colors">
                +233 20 668 8119
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(16,185,129,0.1)' }}
            >
              <MapPin size={16} style={{ color: '#34d399' }} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-0.5">Based in</p>
              <p className="text-sm text-white">Accra, Ghana</p>
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-end gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >

          <p className="text-xs" style={{ color: '#9ca3af' }}>
            &copy; {new Date().getFullYear()}  Powered by Tiawa.co is hosted and supported by <a href="https://44technology.co" className="hover:text-white transition-colors" style={{ color: '#d1d5db' }}>44 Technology</a>
          </p>
        </div>
      </div>
    </footer>
  );
}