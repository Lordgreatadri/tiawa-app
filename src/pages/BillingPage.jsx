import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { CreditCard, Zap, Check } from 'lucide-react';

const plans = [
  {
    phase: 'Phase 1 — User Growth',
    name: 'Free',
    price: '$0',
    sub: 'forever',
    badge: 'ACTIVE NOW',
    badgeColor: '#a78bfa',
    borderColor: 'rgba(124,58,237,0.4)',
    features: [
      { ok: true, text: 'URL shortening (no login needed)' },
      { ok: true, text: 'QR code generation & download' },
      { ok: true, text: 'Basic click count' },
      { ok: false, text: 'Analytics dashboard' },
      { ok: false, text: 'Link management' },
    ],
    cta: 'Current plan',
    ctaDisabled: true,
  },
  {
    phase: 'Phase 2 — Conversion',
    name: 'Starter',
    price: '$2',
    sub: '/ 5,000 tokens',
    badge: 'COMING SOON',
    badgeColor: '#818cf8',
    borderColor: 'rgba(124,58,237,0.3)',
    features: [
      { ok: true, text: 'Everything in Free' },
      { ok: true, text: 'Full analytics dashboard' },
      { ok: true, text: 'Device & location insights' },
      { ok: true, text: 'QR code downloads (PNG & SVG)' },
      { ok: true, text: 'Link management dashboard' },
    ],
    cta: 'Join waitlist',
    ctaDisabled: false,
  },
  {
    phase: 'Phase 3 — Monetization',
    name: 'Growth',
    price: '$10',
    sub: '/ 50,000 tokens',
    badge: 'ROADMAP',
    badgeColor: '#9ca3af',
    borderColor: 'rgba(255,255,255,0.07)',
    features: [
      { ok: true, text: 'Everything in Starter' },
      { ok: true, text: 'Custom branded domains' },
      { ok: true, text: 'Team accounts & collaboration' },
      { ok: true, text: 'Webhooks & integrations' },
      { ok: true, text: 'Priority support + API keys' },
    ],
    cta: 'Get early access',
    ctaDisabled: true,
  },
];

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Billing</h1>
          <p className="text-sm text-gray-500 mt-1">Choose a plan that fits your growth.</p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative p-6 rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${plan.borderColor}` }}
            >
              <div
                className="absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-xl"
                style={{ background: 'rgba(124,58,237,0.15)', color: plan.badgeColor }}
              >
                {plan.badge}
              </div>
              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: plan.badgeColor }}>
                  {plan.phase}
                </div>
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <div className="mt-2 text-3xl font-extrabold text-white">
                  {plan.price}{' '}
                  <span className="text-base font-normal text-gray-500">{plan.sub}</span>
                </div>
              </div>
              <ul className="space-y-3 text-sm mb-6">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3" style={{ color: f.ok ? '#d1d5db' : '#6b7280' }}>
                    <span className="mt-0.5 font-bold" style={{ color: f.ok ? plan.badgeColor : '#4b5563' }}>
                      {f.ok ? '✓' : '✗'}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.ctaDisabled ? 'outline' : 'primary'}
                className="w-full"
                disabled={plan.ctaDisabled}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Token balance */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.12)' }}>
              <Zap size={20} style={{ color: '#a78bfa' }} />
            </div>
            <div>
              <h2 className="text-white font-semibold">Token Balance</h2>
              <p className="text-xs text-gray-500">Remaining usage credits.</p>
            </div>
          </div>
          <p className="text-4xl font-extrabold text-white">100 <span className="text-base font-normal text-gray-500">tokens remaining</span></p>
          <div className="mt-4 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-2 rounded-full" style={{ width: '100%', background: 'linear-gradient(90deg,#7c3aed,#4f46e5)' }} />
          </div>
          <p className="text-xs text-gray-600 mt-2">Free tier: 100 tokens</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
