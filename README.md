<p align="center">
  <img src="../assets/welcome.jpg" alt="Tiawa homepage — URL shortener with instant short link and QR code" width="100%">
</p>

# Tiawa React App — Smarter Short Links for your business

> The React/Vite frontend for Tiawa: URL shortening, QR codes, and click analytics — consuming the Tiawa REST API.

This directory (`reactapp/`) contains a pixel-faithful React replica of the Tiawa Laravel/Blade UI.

---

## ? Key Features

- **Instant URL Shortening** � No account needed.
- **QR Code Generation** � Every short link gets a scannable QR code.
- **Click Analytics** � Clicks over time, device breakdown, top countries.
- **Link Management Dashboard** � Create, view, copy, and delete links.
- **API Console** � Manage API keys and view endpoint references.
- **Billing / Token Tracker** � Phase-based pricing with token balance.
- **Auth-protected routes** � JWT in localStorage; route guard for dashboard.

---

## Screenshots

<p align="center">
  <img src="../assets/welcome.jpg" alt="Tiawa homepage showing a shortened link result with short URL and scannable QR code" width="90%">
  <br><em>The homepage in action — paste any URL, receive a short link (e.g. <code>tiawa.co/woe8qgf</code>) and a ready-to-scan QR code, no login required.</em>
</p>

<p align="center">
  <img src="../assets/use-case.jpg" alt="Tiawa 'Built for real-world campaigns' section showing four use-case cards: Small Businesses, Churches &amp; Events, WhatsApp Campaigns, and Developers &amp; Agencies" width="90%">
  <br><em>Four audience cards — Small Businesses, Churches &amp; Events, WhatsApp Campaigns, and Developers &amp; Agencies — showing how Tiawa fits every campaign type.</em>
</p>

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Routing | React Router DOM v7 |
| Data fetching | TanStack React Query v5 + Axios |
| Styling | Tailwind CSS v3 |
| Charts | Recharts v3 |
| Icons | Lucide React |
| Tests | Vitest + @testing-library/react |

---

## Setup

```bash
cd reactapp
npm install --legacy-peer-deps
cp .env.example .env
# Set VITE_TIAWA_API_URL and VITE_TIAWA_API_KEY in .env
npm run dev
```

Visit `http://localhost:5173`.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_TIAWA_API_URL` | Tiawa API base URL — leave blank in dev (Vite proxy handles it) |
| `VITE_TIAWA_API_KEY` | Bearer token for the Tiawa API |
| `VITE_APP_NAME` | App name displayed in the UI (default: `Tiawa`) |

> Never commit `.env` — it is gitignored.

---

## Tests

```bash
npm run test:run    # run once
npm run test        # watch mode
npm run test:coverage
```

---

## License

Proprietary — all rights reserved.
