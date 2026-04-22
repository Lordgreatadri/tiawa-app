import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

import PublicLayout from '../components/layout/PublicLayout';
import Button from '../components/ui/Button';
import logger from '../lib/logger';

const SUBJECTS = [
  'General Enquiry',
  'Technical Support',
  'Partnership / Integration',
  'Billing & Plans',
  'Feature Request',
  'Other',
];

const CONTACT_METHODS = ['Email', 'WhatsApp', 'Phone Call', 'Either'];

const CONTACT_TIMES = [
  'Anytime',
  'Morning (9am - 12pm GMT)',
  'Afternoon (12pm - 3pm GMT)',
  'Evening (3pm - 6pm GMT)',
  'Weekends only',
];

const INFO_CARDS = [
  {
    icon: Mail,
    iconColor: '#a78bfa',
    iconBg: 'rgba(124,58,237,0.15)',
    label: 'Email',
    value: 'akwaaba@44technology.co',
    href: 'mailto:akwaaba@44technology.co',
    sub: 'We reply within 24 hours',
    hoverColor: 'hover:text-violet-300',
  },
  {
    icon: Phone,
    iconColor: '#fb923c',
    iconBg: 'rgba(251,146,60,0.12)',
    label: 'Phone / WhatsApp',
    value: '+233 20 668 8119',
    href: 'tel:+233206688119',
    sub: 'Mon - Fri, 9 am - 6 pm GMT',
    hoverColor: 'hover:text-orange-300',
  },
  {
    icon: MapPin,
    iconColor: '#34d399',
    iconBg: 'rgba(16,185,129,0.1)',
    label: 'Based in',
    value: 'Accra, Ghana',
    href: null,
    sub: 'Serving all of Africa & beyond',
  },
  {
    icon: Clock,
    iconColor: '#38bdf8',
    iconBg: 'rgba(14,165,233,0.1)',
    label: 'Business Hours',
    value: 'Mon – Fri: 9:00 – 18:00',
    href: null,
    sub: 'Greenwich Mean Time (GMT, UTC+0)',
  },
];

const EMPTY = {
  name: '', subject: '', email: '', phone: '',
  preferred_contact: 'Email', preferred_time: 'Anytime', message: '',
};

// Minimal client-side validation matching the Laravel rules
function validate(fields) {
  const errs = {};
  if (!fields.name.trim())    errs.name    = 'Full name is required.';
  if (!fields.subject)        errs.subject  = 'Please select a subject.';
  if (!fields.email.trim())   errs.email   = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                              errs.email   = 'Please enter a valid email address.';
  if (!fields.message.trim()) errs.message = 'Message is required.';
  return errs;
}

const inputBase = {
  background: 'rgba(255,255,255,0.05)',
  fontFamily: "'Inter', sans-serif",
};

function fieldStyle(hasError) {
  return {
    ...inputBase,
    border: `1px solid ${hasError ? '#f87171' : 'rgba(255,255,255,0.1)'}`,
  };
}

export default function ContactPage() {
  const [fields, setFields]   = useState(EMPTY);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => { const n = { ...er }; delete n[name]; return n; });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);

    // ── Log the submission to the in-memory / localStorage buffer ──────────
    // This is the "file" store until a backend mailer endpoint is wired up.
    logger.info('ContactForm', 'Form submitted', {
      name:              fields.name,
      subject:           fields.subject,
      email:             fields.email,
      phone:             fields.phone || null,
      preferred_contact: fields.preferred_contact,
      preferred_time:    fields.preferred_time,
      message_length:    fields.message.length,
      // NOTE: message body is intentionally excluded from logs to avoid storing
      // user PII beyond what is necessary.
    });

    // Simulate a short async delay (replace with real API call when backend ready)
    await new Promise((r) => setTimeout(r, 800));

    logger.info('ContactForm', 'Submission recorded (pending backend mailer)');
    setSuccess(true);
    setFields(EMPTY);
    setLoading(false);
  }

  const sharedInputClass =
    'w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors';

  return (
    <PublicLayout>
      {/* Ambient glows — match the Blade page */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)', filter: 'blur(40px)' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(251,146,60,0.07) 0%,transparent 70%)', filter: 'blur(40px)' }}
        />
      </div>

      <div className="relative pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">

          {/* ── Page header ── */}
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium mb-5"
              style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', color: '#a78bfa' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              We'd love to hear from you
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#9ca3af' }}>
              Have a question, partnership idea, or just want to say hello? Fill in the form and we'll get back to you at your preferred time.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">

            {/* ── LEFT: info cards ── */}
            <div className="lg:col-span-2 space-y-4">
              {INFO_CARDS.map(({ icon: Icon, iconColor, iconBg, label, value, href, sub, hoverColor }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: iconBg }}
                  >
                    <Icon size={20} style={{ color: iconColor }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-0.5 uppercase tracking-wide">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className={`text-sm font-medium text-white transition-colors ${hoverColor}`}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-white">{value}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── RIGHT: form ── */}
            <div className="lg:col-span-3">
              <div
                className="rounded-2xl p-8"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Success banner */}
                {success && (
                  <div
                    className="mb-6 flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
                    style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}
                  >
                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <p>
                      Thanks for reaching out! We've received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {/* Name + Subject */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Full Name <span style={{ color: '#fb923c' }}>*</span>
                      </label>
                      <input
                        id="name" name="name" type="text"
                        value={fields.name} onChange={onChange}
                        placeholder="Jane Doe"
                        className={sharedInputClass}
                        style={fieldStyle(errors.name)}
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Subject <span style={{ color: '#fb923c' }}>*</span>
                      </label>
                      <select
                        id="subject" name="subject"
                        value={fields.subject} onChange={onChange}
                        className={`${sharedInputClass} appearance-none`}
                        style={fieldStyle(errors.subject)}
                      >
                        <option value="" disabled style={{ background: '#1a1a2e' }}>Select a topic…</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s} style={{ background: '#1a1a2e' }}>{s}</option>
                        ))}
                      </select>
                      {errors.subject && <p className="mt-1.5 text-xs text-red-400">{errors.subject}</p>}
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Email Address <span style={{ color: '#fb923c' }}>*</span>
                      </label>
                      <input
                        id="email" name="email" type="email"
                        value={fields.email} onChange={onChange}
                        placeholder="you@example.com"
                        className={sharedInputClass}
                        style={fieldStyle(errors.email)}
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Phone / WhatsApp <span className="text-gray-600 font-normal text-xs">(optional)</span>
                      </label>
                      <input
                        id="phone" name="phone" type="tel"
                        value={fields.phone} onChange={onChange}
                        placeholder="+233 700 000 000"
                        className={sharedInputClass}
                        style={fieldStyle(false)}
                      />
                    </div>
                  </div>

                  {/* Preferred contact + time */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="preferred_contact" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Preferred Contact Method
                      </label>
                      <select
                        id="preferred_contact" name="preferred_contact"
                        value={fields.preferred_contact} onChange={onChange}
                        className={`${sharedInputClass} appearance-none`}
                        style={fieldStyle(false)}
                      >
                        {CONTACT_METHODS.map((m) => (
                          <option key={m} value={m} style={{ background: '#1a1a2e' }}>{m}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Best Time to Reach You
                      </label>
                      <select
                        id="preferred_time" name="preferred_time"
                        value={fields.preferred_time} onChange={onChange}
                        className={`${sharedInputClass} appearance-none`}
                        style={fieldStyle(false)}
                      >
                        {CONTACT_TIMES.map((t) => (
                          <option key={t} value={t} style={{ background: '#1a1a2e' }}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">
                      Message <span style={{ color: '#fb923c' }}>*</span>
                    </label>
                    <textarea
                      id="message" name="message" rows={5}
                      value={fields.message} onChange={onChange}
                      placeholder="Tell us how we can help you…"
                      className={`${sharedInputClass} resize-none`}
                      style={fieldStyle(errors.message)}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-gray-400">
                      Fields marked <span style={{ color: '#fb923c' }}>*</span> are required
                    </p>
                    <Button type="submit" loading={loading} size="md">
                      <Send size={15} />
                      {loading ? 'Sending…' : 'Send Message'}
                    </Button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PublicLayout>
  );
}