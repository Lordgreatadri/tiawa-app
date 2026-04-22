import { useState, useEffect } from 'react';
import { Link2, Copy, Check, Download, ExternalLink } from 'lucide-react';
import QRCode from 'qrcode';

import { copyToClipboard } from '../../lib/utils';
import Button from '../ui/Button';

import { shortenUrl } from '../../api/links';

export default function UrlShortener() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState(null);

  // Generate QR code as a PNG data URL whenever a new result arrives
  useEffect(() => {
    if (!result?.short_url) { setQrDataUrl(null); return; }
    QRCode.toDataURL(result.short_url, {
      width: 256,
      margin: 1,
      color: { dark: '#000000', light: '#ffffff' },
      errorCorrectionLevel: 'H',
    }).then(setQrDataUrl).catch(() => setQrDataUrl(null));
  }, [result?.short_url]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await shortenUrl({ url });
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(text) {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Link2 size={20} style={{ color: '#9ca3af' }} />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            required
            className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 text-base transition-colors focus:outline-none"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${focused ? 'rgba(124,58,237,0.7)' : 'rgba(255,255,255,0.1)'}`,
              fontFamily: "'Inter', sans-serif",
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
        <Button type="submit" loading={loading} size="lg">
          {loading ? 'Shortening...' : 'Shorten for free'}
        </Button>
      </form>

      {/* Error */}
      {error && (
        <div
          className="mt-4 p-4 rounded-xl text-sm"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}
        >
          {error}
        </div>
      )}

      {/* Result card */}
      {result && (
        <div
          className="mt-6 p-6 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Link info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: '#9ca3af' }}>
                Your Short Link
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={result.short_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold hover:underline break-all transition-colors flex items-center gap-1"
                  style={{ color: '#a78bfa' }}
                >
                  {result.short_url}
                  <ExternalLink size={16} />
                </a>
                <button
                  onClick={() => handleCopy(result.short_url)}
                  className="flex-shrink-0 p-2 rounded-lg transition-all"
                  style={{
                    background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
                  }}
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check size={16} style={{ color: '#4ade80' }} />
                  ) : (
                    <Copy size={16} style={{ color: '#9ca3af' }} />
                  )}
                </button>
              </div>

              <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs mb-1" style={{ color: '#9ca3af' }}>Original URL</p>
                <p className="text-sm break-all" style={{ color: '#9ca3af' }}>{url}</p>
              </div>

              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', color: '#a78bfa' }}
                >
                  ✓ Link created
                </span>
              </div>
            </div>

            {/* QR Code — generated client-side from short_url */}
            {qrDataUrl && (
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div
                  className="p-3 rounded-2xl"
                  style={{ background: '#ffffff', boxShadow: '0 0 0 6px rgba(124,58,237,0.15)' }}
                >
                  <img src={qrDataUrl} alt="QR Code" className="w-36 h-36 block" />
                </div>
                <p className="text-xs font-medium" style={{ color: '#9ca3af' }}>Scan to open</p>
                <a
                  href={qrDataUrl}
                  download={`tiawa-qr-${result.short_path ?? result.short_url.split('/').pop()}.png`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                  style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa' }}
                >
                  <Download size={13} /> Download QR
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-center" style={{ color: '#9ca3af' }}>
        Free to use · No login required
      </p>
    </div>
  );
}