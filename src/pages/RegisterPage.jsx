import { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import AppLogo from '../components/ui/AppLogo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

import { register } from '../api/auth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    if (form.password !== form.password_confirmation) {
      setErrors({ password_confirmation: 'Passwords do not match.' });
      return;
    }

    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.data?.errors) {
        const flat = {};
        Object.entries(err.response.data.errors).forEach(([k, v]) => {
          flat[k] = Array.isArray(v) ? v[0] : v;
        });
        setErrors(flat);
      } else {
        setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: '#0a0a0f' }}
    >
      <div className="w-full max-w-sm">
        <AppLogo variant="auth" />

        <div
          className="p-8 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
          <p className="text-sm text-gray-500 mb-8">Free to start — no credit card required</p>

          {apiError && (
            <div
              className="mb-6 p-3 rounded-xl text-sm"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}
            >
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full name"
              type="text"
              placeholder="John Mensah"
              value={form.name}
              onChange={set('name')}
              required
              prefix={<User size={16} />}
              error={errors.name}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
              required
              prefix={<Mail size={16} />}
              error={errors.email}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={set('password')}
              required
              prefix={<Lock size={16} />}
              error={errors.password}
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="Repeat password"
              value={form.password_confirmation}
              onChange={set('password_confirmation')}
              required
              prefix={<Lock size={16} />}
              error={errors.password_confirmation}
            />

            <Button type="submit" loading={loading} className="w-full mt-2" size="lg">
              Create account
            </Button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="hover:underline" style={{ color: '#a78bfa' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}