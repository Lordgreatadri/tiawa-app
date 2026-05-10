
/**
 * Tiawa Logger
 * ─────────────────────────────────────────────────────────────────────────────
 * Structured, levelled logging for the React app.
 *
 * In development  → writes to the browser console (colour-coded by level) AND
 *                   appends entries to localStorage under the key "tiawa_logs".
 * In production   → only ERROR and WARN levels reach the console; all others
 *                   are silenced to avoid leaking internal detail.
 *
 * "Log to file" — call logger.download() from the browser console at any time
 *   to export the in-memory log buffer as a timestamped .json file.
 *
 * API request/response logging is wired in api/client.js using this module.
 * Contact-form submissions are written here before any backend integration.
 */
const IS_DEV = import.meta.env.DEV;
const MAX_ENTRIES = 500;          // circular buffer size stored in localStorage
const LS_KEY      = 'tiawa_logs'; // localStorage key

// ─── internal buffer (survives HMR in dev) ───────────────────────────────────
let _buffer = [];

function _loadFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) _buffer = JSON.parse(raw);
  } catch {
    _buffer = [];
  }
}

function _persist(entry) {
  _buffer.push(entry);
  if (_buffer.length > MAX_ENTRIES) _buffer.shift();
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(_buffer));
  } catch {
    // localStorage full — clear old entries and retry once
    _buffer = _buffer.slice(-50);
    try { localStorage.setItem(LS_KEY, JSON.stringify(_buffer)); } catch { /* give up */ }
  }
}

_loadFromStorage();

// ─── level definitions ───────────────────────────────────────────────────────
const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };
const STYLES  = {
  debug: 'color:#6b7280;font-weight:500',
  info:  'color:#38bdf8;font-weight:500',
  warn:  'color:#fb923c;font-weight:600',
  error: 'color:#f87171;font-weight:700',
};

// ─── core write function ──────────────────────────────────────────────────────
function _write(level, context, message, data) {
  const entry = {
    ts:      new Date().toISOString(),
    level,
    context,
    message,
    ...(data !== undefined ? { data } : {}),
  };

  // Dev: always show everything
  if (IS_DEV) {
    const prefix = `%c[Tiawa:${context}] ${level.toUpperCase()}`;
    if (data !== undefined) {
      // eslint-disable-next-line no-console
      console[level === 'debug' ? 'log' : level](prefix, STYLES[level], message, data);
    } else {
      // eslint-disable-next-line no-console
      console[level === 'debug' ? 'log' : level](prefix, STYLES[level], message);
    }
    _persist(entry);
    return;
  }

  // Prod: only warn + error reach console
  if (LEVELS[level] >= LEVELS.warn) {
    // eslint-disable-next-line no-console
    console[level](
      `[Tiawa:${context}] ${level.toUpperCase()} — ${message}`,
      data ?? '',
    );
  }
  // Still persist error/warn in production for later download
  if (LEVELS[level] >= LEVELS.warn) _persist(entry);
}

// ─── public API ──────────────────────────────────────────────────────────────
const logger = {
  /** Low-level trace — dev only */
  debug: (ctx, msg, data) => _write('debug', ctx, msg, data),
  /** Normal operational events */
  info:  (ctx, msg, data) => _write('info',  ctx, msg, data),
  /** Unexpected but recoverable situations */
  warn:  (ctx, msg, data) => _write('warn',  ctx, msg, data),
  /** Errors that affect user experience */
  error: (ctx, msg, data) => _write('error', ctx, msg, data),

  /**
   * Export the current log buffer as a downloadable JSON file.
   * Call from browser console: logger.download()
   */
  download() {
    const blob = new Blob([JSON.stringify(_buffer, null, 2)], { type: 'application/json' });
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = `tiawa-logs-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  },

  /** Clear in-memory buffer and localStorage */
  clear() {
    _buffer = [];
    try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
  },

  /** Return a copy of the current in-memory buffer */
  entries: () => [..._buffer],
};

// Expose on window for easy console access during debugging
if (IS_DEV) {
  window.__tiawaLogger = logger;
  window.logger = logger;   // shorthand: logger.download(), logger.entries(), logger.clear()
}

export default logger;