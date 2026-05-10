import { useState } from 'react';
import { Copy, Check, Code2, Key, Send, BookOpen, ChevronRight, ExternalLink } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import PublicLayout from '../components/layout/PublicLayout';
import { copyToClipboard } from '../lib/utils';

// ── Custom Stripe/OpenAI-style dark theme ────────────────────────────────────
const tiawaTheme = {
  'code[class*="language-"]': {
    color: '#e2e8f0',
    background: 'none',
    fontFamily: "'Fira Code', 'Cascadia Code', 'Fira Mono', 'Menlo', monospace",
    fontSize: '13.5px',
    lineHeight: '1.75',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    tabSize: 2,
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#e2e8f0',
    background: '#0d1117',
    fontFamily: "'Fira Code', 'Cascadia Code', 'Fira Mono', 'Menlo', monospace",
    fontSize: '13.5px',
    lineHeight: '1.75',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    tabSize: 2,
    hyphens: 'none',
    padding: '1.25rem 1.5rem',
    margin: 0,
    overflow: 'auto',
  },
  comment:    { color: '#4b5563', fontStyle: 'italic' },
  prolog:     { color: '#4b5563' },
  doctype:    { color: '#4b5563' },
  cdata:      { color: '#4b5563' },
  punctuation:{ color: '#94a3b8' },
  property:   { color: '#93c5fd' },
  tag:        { color: '#f87171' },
  boolean:    { color: '#fb923c' },
  number:     { color: '#fb923c' },
  constant:   { color: '#fb923c' },
  symbol:     { color: '#fb923c' },
  deleted:    { color: '#f87171' },
  selector:   { color: '#86efac' },
  'attr-name':{ color: '#86efac' },
  string:     { color: '#86efac' },
  char:       { color: '#86efac' },
  builtin:    { color: '#86efac' },
  inserted:   { color: '#86efac' },
  operator:   { color: '#94a3b8' },
  entity:     { color: '#fdba74', cursor: 'help' },
  url:        { color: '#67e8f9' },
  variable:   { color: '#e2e8f0' },
  atrule:     { color: '#a78bfa' },
  'attr-value': { color: '#86efac' },
  keyword:    { color: '#c084fc' },
  function:   { color: '#60a5fa' },
  'function-definition': { color: '#60a5fa' },
  'class-name': { color: '#67e8f9' },
  regex:      { color: '#fb923c' },
  important:  { color: '#fb923c', fontWeight: 'bold' },
  bold:       { fontWeight: 'bold' },
  italic:     { fontStyle: 'italic' },
};

// ── Highlighted code block (used for single snippets) ────────────────────────
function CodeBlock({ code, language = 'json', title, showLineNumbers = false }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="rounded-xl overflow-hidden my-4"
      style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}
      >
        <span className="text-xs font-mono font-medium" style={{ color: '#6b7280' }}>
          {title || language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-all"
          style={{
            background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${copied ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.08)'}`,
            color: copied ? '#4ade80' : '#9ca3af',
          }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={tiawaTheme}
        showLineNumbers={showLineNumbers}
        lineNumberStyle={{ color: '#374151', minWidth: '2.5em', paddingRight: '1em', userSelect: 'none' }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function Section({ id, icon: Icon, color, title, children }) {
  const colorMap = {
    violet: { bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.3)', text: '#a78bfa' },
    blue:   { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', text: '#93c5fd' },
    orange: { bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.3)', text: '#fdba74' },
    green:  { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.3)',  text: '#86efac' },
  };
  const c = colorMap[color] || colorMap.violet;

  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
          <Icon size={20} style={{ color: c.text }} />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Pill({ children, color = 'violet' }) {
  const colorMap = {
    violet: { bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.3)', text: '#a78bfa' },
    green:  { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.3)',  text: '#86efac' },
    blue:   { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', text: '#93c5fd' },
    orange: { bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.3)', text: '#fdba74' },
  };
  const c = colorMap[color];
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-md text-xs font-mono font-semibold"
      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
    >
      {children}
    </span>
  );
}

// ── Code Examples tab data ──────────────────────────────────────────────────

const LANG_SUBTITLES = {
  JavaScript: 'Fetch API · Node.js / Browser',
  Python:     'httpx · requests compatible',
  PHP:        'Guzzle HTTP client',
  cURL:       'Shell · terminal · CI scripts',
};

const LANG_CODES = {
  JavaScript: [
    'const API_KEY  = process.env.TIAWA_API_KEY;  // server-side env var',
    "const BASE_URL = 'https://api.tiawa.co';",
    '',
    '// ── Create a short link ──────────────────────────────────────────',
    "async function createShortLink(longUrl, shortPath = '') {",
    '  const body = { url: longUrl };',
    '  if (shortPath) body.short_path = shortPath;   // optional custom slug',
    '',
    '  const res = await fetch(`${BASE_URL}/requests/create`, {',
    "    method:  'POST',",
    '    headers: {',
    "      'Content-Type':  'application/json',",
    '      \'Authorization\': `Bearer ${API_KEY}`,',
    '    },',
    '    body: JSON.stringify(body),',
    '  });',
    '',
    '  if (!res.ok) throw new Error(`API error: ${res.status}`);',
    '  const json = await res.json();',
    '  return json.data;  // { short_url, short_path }',
    '}',
    '',
    '// ── Query link analytics ─────────────────────────────────────────',
    'async function getLinkAnalytics(shortPath) {',
    '  const res = await fetch(`${BASE_URL}/reports/${shortPath}/`, {',
    "    headers: { 'Authorization': `Bearer ${API_KEY}` },",
    '  });',
    '',
    '  if (!res.ok) throw new Error(`API error: ${res.status}`);',
    '  const json = await res.json();',
    '  return json.data;',
    '}',
    '',
    '// Usage',
    "const link = await createShortLink('https://example.com/long-url', 'my-promo');",
    'console.log(link.short_url);      // https://tiawa.co/my-promo',
    '',
    "const stats = await getLinkAnalytics('my-promo');",
    'console.log(stats.total_clicks);  // 142',
  ].join('\n'),

  Python: [
    'import os, httpx',
    '',
    'API_KEY  = os.environ["TIAWA_API_KEY"]',
    'BASE_URL = "https://api.tiawa.co"',
    'HEADERS  = {',
    '    "Content-Type":  "application/json",',
    '    "Authorization": f"Bearer {API_KEY}",',
    '}',
    '',
    '# ── Create a short link ──────────────────────────────────────────',
    'def create_short_link(long_url: str, short_path: str = "") -> dict:',
    '    body = {"url": long_url}',
    '    if short_path:',
    '        body["short_path"] = short_path   # optional custom slug',
    '',
    '    r = httpx.post(f"{BASE_URL}/requests/create", json=body, headers=HEADERS)',
    '    r.raise_for_status()',
    '    return r.json()["data"]   # { short_url, short_path }',
    '',
    '# ── Query link analytics ─────────────────────────────────────────',
    'def get_link_analytics(short_path: str) -> dict:',
    '    r = httpx.get(f"{BASE_URL}/reports/{short_path}/", headers=HEADERS)',
    '    r.raise_for_status()',
    '    return r.json()["data"]',
    '',
    '# Usage',
    'link  = create_short_link("https://example.com/long-url", "my-promo")',
    'print(link["short_url"])      # https://tiawa.co/my-promo',
    '',
    'stats = get_link_analytics("my-promo")',
    'print(stats["total_clicks"])  # 142',
  ].join('\n'),

  PHP: [
    '<?php',
    'use GuzzleHttp\\Client;',
    '',
    "$apiKey  = $_ENV['TIAWA_API_KEY'];",
    "$baseUrl = 'https://api.tiawa.co';",
    '',
    '$client = new Client([',
    "    'base_uri' => $baseUrl,",
    "    'headers'  => [",
    "        'Content-Type'  => 'application/json',",
    '        \'Authorization\' => "Bearer {$apiKey}",',
    '    ],',
    ']);',
    '',
    '// ── Create a short link ──────────────────────────────────────────',
    'function createShortLink(Client $client, string $longUrl, string $shortPath = \'\'): array {',
    "    $body = ['url' => $longUrl];",
    "    if ($shortPath !== '') $body['short_path'] = $shortPath;",
    '',
    "    $res  = $client->post('/requests/create', ['json' => $body]);",
    '    $data = json_decode($res->getBody(), true);',
    "    return $data['data'];   // ['short_url' => ..., 'short_path' => ...]",
    '}',
    '',
    '// ── Query link analytics ─────────────────────────────────────────',
    'function getLinkAnalytics(Client $client, string $shortPath): array {',
    '    $res  = $client->get("/reports/{$shortPath}/");',
    '    $data = json_decode($res->getBody(), true);',
    "    return $data['data'];",
    '}',
    '',
    '// Usage',
    "$link  = createShortLink($client, 'https://example.com/long-url', 'my-promo');",
    "echo $link['short_url'];      // https://tiawa.co/my-promo",
    '',
    "$stats = getLinkAnalytics($client, 'my-promo');",
    "echo $stats['total_clicks'];  // 142",
  ].join('\n'),

  cURL: [
    '# ── Create a short link (with optional custom slug) ─────────────',
    'curl -X POST https://api.tiawa.co/requests/create \\',
    '  -H "Content-Type: application/json" \\',
    '  -H "Authorization: Bearer YOUR_API_KEY" \\',
    "  -d '{",
    '    "url": "https://example.com/very/long/path",',
    '    "short_path": "my-promo"',
    "  }'",
    '',
    '# Response:',
    '# {',
    '#   "data": {',
    '#     "short_url":  "https://tiawa.co/my-promo",',
    '#     "short_path": "my-promo"',
    '#   }',
    '# }',
    '',
    '# ── Query link analytics ─────────────────────────────────────────',
    'curl -X GET https://api.tiawa.co/reports/my-promo/ \\',
    '  -H "Authorization: Bearer YOUR_API_KEY"',
    '',
    '# Response:',
    '# {',
    '#   "data": {',
    '#     "short_path":   "my-promo",',
    '#     "short_url":    "https://tiawa.co/my-promo",',
    '#     "original_url": "https://example.com/very/long/path",',
    '#     "total_clicks": 142,',
    '#     "created_at":   "2026-05-01T10:30:00Z"',
    '#   }',
    '# }',
  ].join('\n'),
};

const LANG_ICONS = {
  JavaScript: (
    <span className="w-4 h-4 rounded text-xs font-bold flex items-center justify-center flex-shrink-0"
      style={{ background: '#f7df1e', color: '#1a1a1a', fontSize: '9px' }}>JS</span>
  ),
  Python: (
    <span className="w-4 h-4 rounded text-xs font-bold flex items-center justify-center flex-shrink-0"
      style={{ background: '#3776ab', color: '#ffd43b', fontSize: '9px' }}>Py</span>
  ),
  PHP: (
    <span className="w-4 h-4 rounded text-xs font-bold flex items-center justify-center flex-shrink-0"
      style={{ background: '#8892bf', color: '#fff', fontSize: '8px' }}>PHP</span>
  ),
  cURL: (
    <span className="w-4 h-4 rounded text-xs font-bold flex items-center justify-center flex-shrink-0"
      style={{ background: '#1a1a2e', color: '#4ade80', fontSize: '9px', fontFamily: 'monospace' }}>$_</span>
  ),
};

// ── language → Prism language id mapping ────────────────────────────────────
const LANG_PRISM = {
  JavaScript: 'javascript',
  Python:     'python',
  PHP:        'php',
  cURL:       'bash',
};

function CodeTabs() {
  const tabs = ['JavaScript', 'Python', 'PHP', 'cURL'];
  const [active, setActive] = useState('JavaScript');
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyToClipboard(LANG_CODES[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
    >
      {/* ── Tab bar ──────────────────────────────────────────────────── */}
      <div
        className="flex items-stretch"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#161b22' }}
      >
        {/* Tabs */}
        <div className="flex items-end flex-1 px-1 pt-1 min-w-0 overflow-x-auto gap-0.5">
          {tabs.map((tab) => {
            const isActive = tab === active;
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all focus:outline-none"
                style={{
                  color:        isActive ? '#e2e8f0' : '#6b7280',
                  background:   isActive ? '#0d1117' : 'transparent',
                  border:       'none',
                  borderTop:    isActive ? '2px solid #7c3aed' : '2px solid transparent',
                  borderRadius: '6px 6px 0 0',
                  marginBottom: '-1px',
                  cursor: 'pointer',
                }}
              >
                {LANG_ICONS[tab]}
                {tab}
              </button>
            );
          })}
        </div>

        {/* Runtime label + copy — right side */}
        <div className="flex items-center gap-3 px-4 flex-shrink-0" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-xs font-mono hidden sm:block" style={{ color: '#374151' }}>
            {LANG_SUBTITLES[active]}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all"
            style={{
              background: copied ? 'rgba(34,197,94,0.1)'  : 'rgba(255,255,255,0.05)',
              border:     `1px solid ${copied ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.08)'}`,
              color:      copied ? '#4ade80' : '#9ca3af',
              cursor: 'pointer',
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* ── Syntax-highlighted code panel ───────────────────────────── */}
      <SyntaxHighlighter
        language={LANG_PRISM[active]}
        style={tiawaTheme}
        showLineNumbers
        lineNumberStyle={{
          color: '#2d3748',
          minWidth: '2.75em',
          paddingRight: '1.25em',
          userSelect: 'none',
          fontFamily: "'Fira Code', monospace",
        }}
        wrapLongLines={false}
        customStyle={{ margin: 0, borderRadius: 0, maxHeight: '520px', overflowY: 'auto' }}
      >
        {LANG_CODES[active]}
      </SyntaxHighlighter>
    </div>
  );
}

function ParamRow({ name, type, required, desc }) {
  return (
    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <td className="py-3 pr-4 font-mono text-sm" style={{ color: '#fb923c' }}>{name}</td>
      <td className="py-3 pr-4 text-xs" style={{ color: '#6b7280' }}>{type}</td>
      <td className="py-3 pr-4">
        {required ? <Pill color="violet">required</Pill> : <Pill color="green">optional</Pill>}
      </td>
      <td className="py-3 text-sm" style={{ color: '#9ca3af' }}>{desc}</td>
    </tr>
  );
}

const BASE_URL = 'https://api.tiawa.co';

export default function DeveloperPage() {
  const tocItems = [
    { id: 'get-started', label: 'Get Started' },
    { id: 'authentication', label: 'Authentication' },
    { id: 'create-link', label: 'Create a Short Link' },
    { id: 'query-link', label: 'Query Link Analytics' },
    { id: 'examples', label: 'Code Examples' },
    { id: 'errors', label: 'Error Reference' },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <div
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.15), transparent)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', color: '#a78bfa' }}
          >
            <Code2 size={15} /> Developer API
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Integrate tiawa.co into your app
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: '#9ca3af' }}>
            A clean RESTful API to shorten URLs, generate QR codes, and query click analytics.
            Token-based authentication. Works from any language or platform.
          </p>
          <a
            href={`mailto:akwaaba@44technology.co?subject=API Key Request — tiawa.co&body=Hi,%0D%0A%0D%0AI'd like to request an API key for tiawa.co.%0D%0A%0D%0AName:%0D%0AUse-case:%0D%0AWebsite / App:%0D%0A`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', display: 'none' }}
          >
            <Key size={16} /> Request an API Key
          </a>
          <p className="mt-3 text-xs" style={{ color: '#6b7280', display: 'none' }}>
            Send your request to{' '}
            <a href="mailto:akwaaba@44technology.co" className="hover:text-violet-400 transition-colors" style={{ color: '#a78bfa' }}>
              akwaaba@44technology.co
            </a>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#6b7280' }}>
                On this page
              </p>
              <nav className="space-y-1">
                {tocItems.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors hover:text-white"
                    style={{ color: '#9ca3af' }}
                  >
                    <ChevronRight size={13} />
                    {t.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">

            {/* ── 1. Get Started ────────────────────────────────── */}
            <Section id="get-started" icon={BookOpen} color="violet" title="Get Started">
              <p className="text-base mb-4" style={{ color: '#9ca3af' }}>
                The tiawa.co API is a REST API with JSON request/response bodies.
                All endpoints live under the base URL:
              </p>
              <CodeBlock title="Base URL" language="bash" code={BASE_URL} />
              <p className="text-base mt-4" style={{ color: '#9ca3af' }}>
                To access protected endpoints you need an <strong className="text-white">API key</strong>.
                Email <a href="mailto:akwaaba@44technology.co" className="hover:text-violet-300 transition-colors" style={{ color: '#a78bfa' }}>akwaaba@44technology.co</a> to
                request one. Free-tier shortening (no analytics) is available without a key,
                but is IP-rate-limited.
              </p>
            </Section>

            {/* ── 2. Authentication ────────────────────────────────── */}
            <Section id="authentication" icon={Key} color="orange" title="Authentication">
              <p className="text-base mb-4" style={{ color: '#9ca3af' }}>
                Pass your API key as a <Pill color="orange">Bearer</Pill> token in every request header:
              </p>
              <CodeBlock
                title="Request Header"
                language="http"
                code={`Authorization: Bearer YOUR_API_KEY`}
              />
              <p className="text-sm mt-4" style={{ color: '#6b7280' }}>
                Keep your key confidential. On the front-end, store it in a <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.08)' }}>.env</code> file
                and never commit it to version control.
              </p>
              <CodeBlock
                title=".env (local dev)"
                language="bash"
                code={`# .env\nTIAWA_API_URL=        # leave blank — Vite proxy handles /requests & /reports\nTIAWA_API_KEY=your_api_key_here`}
              />
              <CodeBlock
                title=".env.production (build)"
                language="bash"
                code={`# .env.production\nTIAWA_API_URL=https://api.tiawa.co\nTIAWA_API_KEY=your_api_key_here`}
              />
              <div
                className="mt-4 p-4 rounded-xl text-sm"
                style={{ background: 'rgba(251,146,60,0.07)', border: '1px solid rgba(251,146,60,0.2)', color: '#fdba74' }}
              >
                <strong>Tip for local dev:</strong> leave <code className="text-xs">TIAWA_API_URL</code> blank.
                The Vite (if you are React) dev server proxies <code className="text-xs">/requests</code> and <code className="text-xs">/reports</code> to{' '}
                <code className="text-xs">https://api.tiawa.co</code> so you avoid CORS issues in the browser.
                Open <strong>vite.config.js</strong> to review or adjust the proxy rules.
              </div>
            </Section>

            {/* ── 3. Create a Short Link ────────────────────────────── */}
            <Section id="create-link" icon={Send} color="blue" title="Create a Short Link">
              <div className="flex flex-wrap gap-2 mb-4">
                <Pill color="blue">POST</Pill>
                <span className="font-mono text-sm" style={{ color: '#e2e8f0' }}>/requests/create</span>
              </div>

              <p className="text-base mb-4" style={{ color: '#9ca3af' }}>
                Submits a long URL to be shortened. Optionally include a{' '}
                <Pill color="orange">short_path</Pill> to customise the slug.
              </p>

              {/* Parameters table */}
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Parameter</th>
                      <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Type</th>
                      <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Status</th>
                      <th className="pb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ParamRow name="url" type="string" required desc="The full destination URL you want to shorten. Must be a valid URL including the scheme (https://)." />
                    <ParamRow name="short_path" type="string" required={false} desc="Custom slug for the short link. Min 5 chars, max 16 chars. Letters, numbers, hyphens and underscores only. If omitted, a random slug is generated." />
                  </tbody>
                </table>
              </div>

              <CodeBlock
                title="Request Body"
                language="json"
                code={`{\n  "url": "https://example.com/very/long/article?utm_source=newsletter",\n  "short_path": "my-article"   // optional, 5–16 chars\n}`}
              />

              <p className="text-sm mb-2 font-semibold text-white">Successful response — <Pill color="green">200 OK</Pill></p>
              <CodeBlock
                title="Response"
                language="json"
                code={`{\n  "data": {\n    "short_url": "https://tiawa.co/my-article",\n    "short_path": "my-article"\n  }\n}`}
              />

              <p className="text-sm mt-4 mb-2 font-semibold text-white">Example — cURL</p>
              <CodeBlock
                title="cURL"
                language="bash"
                code={`curl -X POST https://api.tiawa.co/requests/create \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -d '{\n    "url": "https://example.com/very/long/path",\n    "short_path": "my-link"\n  }'`}
              />
            </Section>

            {/* ── 4. Query Link Analytics ───────────────────────────── */}
            <Section id="query-link" icon={ExternalLink} color="green" title="Query Link Analytics">
              <div className="flex flex-wrap gap-2 mb-4">
                <Pill color="green">GET</Pill>
                <span className="font-mono text-sm" style={{ color: '#e2e8f0' }}>/reports/<span style={{ color: '#fb923c' }}>{'{short_path}'}</span>/</span>
              </div>

              <p className="text-base mb-4" style={{ color: '#9ca3af' }}>
                Retrieves click analytics for a short link. Replace{' '}
                <Pill color="orange">{'{short_path}'}</Pill> with the slug of the short link.
                Requires a valid API key.
              </p>

              <CodeBlock
                title="Endpoint"
                language="bash"
                code={`GET https://api.tiawa.co/reports/{short_path}/`}
              />

              <p className="text-sm mb-2 font-semibold text-white">Example — cURL</p>
              <CodeBlock
                title="cURL"
                language="bash"
                code={`curl -X GET https://api.tiawa.co/reports/my-article/ \\\n  -H "Authorization: Bearer YOUR_API_KEY"`}
              />

              <p className="text-sm mt-4 mb-2 font-semibold text-white">Successful response — <Pill color="green">200 OK</Pill></p>
              <CodeBlock
                title="Response"
                language="json"
                code={`{\n  "data": {\n    "short_path": "my-article",\n    "short_url":  "https://tiawa.co/my-article",\n    "original_url": "https://example.com/very/long/article",\n    "total_clicks": 142,\n    "created_at": "2026-05-01T10:30:00Z",\n    "clicks": [\n      { "timestamp": "2026-05-04T08:12:33Z", "country": "GH", "device": "mobile" },\n      ...\n    ]\n  }\n}`}
              />

              <div
                className="mt-4 p-4 rounded-xl text-sm"
                style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)', color: '#86efac' }}
              >
                The trailing slash (<code className="text-xs">/</code>) at the end of the URL is required.
              </div>
            </Section>

            {/* ── 5. Code Examples ─────────────────────────────────── */}
            <Section id="examples" icon={Code2} color="violet" title="Code Examples">
              <p className="text-base mb-6" style={{ color: '#9ca3af' }}>
                Select your preferred language or runtime. Every example covers both
                creating a short link and querying analytics.
              </p>
              <CodeTabs />
            </Section>

            {/* ── 6. Error Reference ───────────────────────────────── */}
            <Section id="errors" icon={BookOpen} color="orange" title="Error Reference">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th className="pb-2 pr-6 text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Status</th>
                      <th className="pb-2 pr-6 text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Meaning</th>
                      <th className="pb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>Common Cause</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { status: '400', pill: 'blue', label: 'Bad Request',     cause: 'Missing or invalid fields — check url / short_path format and length.' },
                      { status: '401', pill: 'orange', label: 'Unauthorized',   cause: 'Missing or invalid API key in the Authorization header.' },
                      { status: '409', pill: 'violet', label: 'Conflict',       cause: 'The requested short_path is already taken. Choose a different one.' },
                      { status: '422', pill: 'blue', label: 'Validation Error', cause: 'short_path is too short (<5) or too long (>16), or contains invalid characters.' },
                      { status: '429', pill: 'orange', label: 'Rate Limited',   cause: 'Too many requests from your IP / key. Slow down and retry after a moment.' },
                      { status: '500', pill: 'orange', label: 'Server Error',   cause: 'Unexpected server error. Contact akwaaba@44technology.co if it persists.' },
                    ].map((row) => (
                      <tr key={row.status} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td className="py-3 pr-6"><Pill color={row.pill}>{row.status}</Pill></td>
                        <td className="py-3 pr-6 font-semibold text-sm text-white">{row.label}</td>
                        <td className="py-3 text-sm" style={{ color: '#9ca3af' }}>{row.cause}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className="mt-8 p-6 rounded-2xl"
                style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
              >
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Key size={16} style={{ color: '#a78bfa' }} /> Need an API key?
                </h3>
                <p className="text-sm mb-4" style={{ color: '#9ca3af' }}>
                  Send a short message to{' '}
                  <a href="mailto:akwaaba@44technology.co" className="hover:text-violet-300 transition-colors" style={{ color: '#a78bfa' }}>
                    akwaaba@44technology.co
                  </a>{' '}
                  with your name, use-case and the app/website URL. We'll get back to you within 24 hours.
                </p>
                <a
                  href="mailto:akwaaba@44technology.co?subject=API Key Request — tiawa.co&body=Hi,%0D%0A%0D%0AI'd like to request an API key for tiawa.co.%0D%0A%0D%0AName:%0D%0AUse-case:%0D%0AWebsite / App:%0D%0A"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}
                >
                  <Send size={14} /> Request API Key
                </a>
              </div>
            </Section>

          </main>
        </div>
      </div>
    </PublicLayout>
  );
}