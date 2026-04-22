import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import { Key, Copy, Check, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { copyToClipboard } from '../lib/utils';
import Button from '../components/ui/Button';

export default function ApiConsolePage() {
  const [copied, setCopied] = useState(false);
  // In production this would come from an API query
  const demoKey = 'tiawa_sk_•••••••••••••••••••••••••••••••••';

  async function handleCopy() {
    await copyToClipboard(demoKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-white">API Console</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your API keys and view usage stats.</p>
        </div>

        {/* API key card */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.12)' }}>
              <Key size={20} style={{ color: '#a78bfa' }} />
            </div>
            <div>
              <h2 className="text-white font-semibold">Your API Key</h2>
              <p className="text-xs text-gray-500">Keep this secret — treat it like a password.</p>
            </div>
          </div>

          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-sm"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className="flex-1 text-gray-300 truncate">{demoKey}</span>
            <button onClick={handleCopy} className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/5 transition-all">
              {copied ? <Check size={16} style={{ color: '#4ade80' }} /> : <Copy size={16} style={{ color: '#9ca3af' }} />}
            </button>
          </div>

          <div className="flex gap-3 mt-4">
            <Button variant="outline" size="sm">
              <RefreshCw size={14} /> Regenerate Key
            </Button>
          </div>
        </Card>

        {/* Base URL & endpoints reference */}
        <Card>
          <h2 className="text-white font-semibold mb-4">Quick Reference</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Base URL</p>
              <code
                className="block px-3 py-2 rounded-lg font-mono text-gray-300"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {import.meta.env.VITE_API_BASE_URL}
              </code>
            </div>

            {[
              { method: 'POST', path: '/shorten', desc: 'Create a short URL' },
              { method: 'GET', path: '/links', desc: 'List your links' },
              { method: 'GET', path: '/links/{id}/analytics', desc: 'Get link analytics' },
              { method: 'DELETE', path: '/links/{id}', desc: 'Delete a link' },
            ].map((ep) => (
              <div key={ep.path} className="flex items-center gap-3">
                <span
                  className="px-2 py-0.5 rounded text-xs font-bold font-mono"
                  style={{
                    background: ep.method === 'GET' ? 'rgba(14,165,233,0.12)' : ep.method === 'POST' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                    color: ep.method === 'GET' ? '#38bdf8' : ep.method === 'POST' ? '#34d399' : '#f87171',
                  }}
                >
                  {ep.method}
                </span>
                <code className="text-gray-300 font-mono text-xs flex-1">{ep.path}</code>
                <span className="text-gray-500 text-xs">{ep.desc}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Token usage */}
        <Card>
          <h2 className="text-white font-semibold mb-6">Token Consumption Guide</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { tokens: '1', label: 'per link created' },
              { tokens: '1', label: 'per QR generated' },
              { tokens: '0.1', label: 'per click tracked' },
              { tokens: '0.2', label: 'per advanced report' },
            ].map((t) => (
              <div key={t.label} className="text-center p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="text-2xl font-extrabold text-white mb-1">{t.tokens}</div>
                <div className="text-xs text-gray-500">token {t.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
