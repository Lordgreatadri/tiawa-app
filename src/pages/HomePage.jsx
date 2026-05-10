import { Link2, QrCode, BarChart2, Zap, Globe2, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import UrlShortener from '../components/features/UrlShortener';
import PublicLayout from '../components/layout/PublicLayout';

const features = [
  {
    icon: Link2,
    color: 'violet',
    title: 'Instant URL Shortening',
    desc: 'Convert any long URL into a clean, shareable short link in under a second. No account needed to get started.',
  },
  {
    icon: QrCode,
    color: 'blue',
    title: 'QR Code Generation',
    desc: 'Every short link gets a free QR code. Perfect for flyers, posters, restaurant menus, and WhatsApp campaigns.',
  },
  {
    icon: BarChart2,
    color: 'green',
    title: 'Click Analytics',
    desc: 'Track every click with detailed insights — device type, browser, time of day, and geographic location.',
  },
//   {
//     icon: Globe2,
//     color: 'orange',
//     title: 'Africa-First Insights',
//     desc: 'See exactly where your audience is — Ghana, Nigeria, Kenya and beyond. Tailored for the African market.',
//   },
//   {
//     icon: Zap,
//     color: 'violet',
//     title: 'Micro-Pricing',
//     desc: 'No rigid subscriptions. Buy token bundles — pay only for what you use.',
//   },
//   {
//     icon: Code2,
//     color: 'blue',
//     title: 'Developer API',
//     desc: 'Integrate link shortening directly into your apps with our clean RESTful API and token-based auth.',
//   },
];

const useCases = [
  {
    emoji: '🏪',
    title: 'Small Businesses',
    desc: 'Share your menu, product catalogue, or booking page with a clean short link on WhatsApp and Instagram.',
  },
  {
    emoji: '⛪',
    title: 'Churches & Events',
    desc: 'Print QR codes on flyers and programmes. See how many people scanned and registered.',
  },
  {
    emoji: '📱',
    title: 'WhatsApp Campaigns',
    desc: 'Replace messy long links in broadcasts with branded short URLs that are easy to remember.',
  },
  {
    emoji: '👩‍💻',
    title: 'Developers & Agencies',
    desc: 'Integrate link shortening and analytics into your SaaS, app, or client campaigns via our API.',
  },
];

const colorMap = {
  violet: { bg: 'rgba(124,58,237,0.1)', text: '#a78bfa' },
  blue: { bg: 'rgba(14,165,233,0.1)', text: '#38bdf8' },
  green: { bg: 'rgba(16,185,129,0.1)', text: '#34d399' },
  orange: { bg: 'rgba(251,146,60,0.12)', text: '#fb923c' },
};

const steps = [
  { n: 1, grad: 'linear-gradient(135deg,#7c3aed,#4f46e5)', title: 'Paste your URL', desc: 'Drop any long URL — a product page, form, social profile, or campaign landing page.' },
  { n: 2, grad: 'linear-gradient(135deg,#4f46e5,#0ea5e9)', title: 'Get your short link + QR', desc: 'Instantly receive a compact short URL and a scannable QR code ready to share or print.' },
  { n: 3, grad: 'linear-gradient(135deg,#0ea5e9,#10b981)', title: 'Track & grow', desc: 'Track click analytics, device insights, location data, and campaign management... Coming Soon.' },
];

export default function HomePage() {
  return (
    <PublicLayout>
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(124,58,237,0.18)' }} />
          <div className="absolute -top-10 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(79,70,229,0.12)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full blur-3xl" style={{ background: 'rgba(109,40,217,0.07)' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-8"
            style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', color: '#a78bfa' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Free to use · No login required
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Short links with
            <br />
            <span style={{ background: 'linear-gradient(90deg,#a78bfa,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Your-Business
            </span>{' '}
            insights
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Shorten URLs, generate QR codes and track every click — built for business' growth.
          </p>

          <UrlShortener />
        </div>
      </section>

      {/* ── TRUST STATS ── */}
      <div 
        className="py-10"
        style={{ display: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: '10K+', label: 'Links Shortened' },
              { val: '50K+', label: 'Clicks Tracked' },
              { val: '15+', label: 'Countries Reached' },
              { val: '99.9%', label: 'Uptime' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-white">{s.val}</div>
                <div className="text-sm mt-1" style={{ color: '#9ca3af' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything you need to grow</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9ca3af' }}>
              More than just a URL shortener. A complete link management platform built for modern businesses.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const c = colorMap[f.color];
              return (
                <div key={f.title} className="p-6 rounded-2xl group transition-all" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: c.bg }}>
                    <f.icon size={24} style={{ color: c.text }} />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="py-24"
        style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How it works</h2>
            <p className="text-lg" style={{ color: '#9ca3af' }}>Three simple steps to launch your campaign</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg"
                  style={{ background: s.grad }}
                >
                  {s.n}
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Built for real-world campaigns</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9ca3af' }}>
              From street-side vendors to enterprise teams — tiawa.co adapts to your needs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {useCases.map((u) => (
              <div key={u.title} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-3xl mb-4">{u.emoji}</div>
                <h4 className="text-white font-semibold mb-2">{u.title}</h4>
                <p className="text-sm" style={{ color: '#9ca3af' }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24" style={{ display: 'none', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="p-12 rounded-3xl relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg,rgba(79,46,180,0.5),rgba(30,27,75,0.5))', border: '1px solid rgba(124,58,237,0.25)' }}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl" style={{ background: 'rgba(124,58,237,0.12)' }} />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl" style={{ background: 'rgba(79,70,229,0.1)' }} />
            </div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to grow smarter?</h2>
              <p className="text-lg mb-8" style={{ color: '#9ca3af' }}>
                Join thousands of businesses using tiawa.co to track, optimise and grow their audience across the glob.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="px-8 py-4 rounded-xl text-white font-semibold transition-all"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}
                >
                  Create Free Account
                </Link>
                <a
                  href="#features"
                  className="px-8 py-4 rounded-xl font-semibold transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#d1d5db' }}
                >
                  Explore Features
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}