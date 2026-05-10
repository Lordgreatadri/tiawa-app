import axios from 'axios';
import logger from '../lib/logger';

// VITE_TIAWA_API_URL is blank in dev (Vite proxy handles /requests & /reports).
// Set it to https://api.44labs.co at build time for production.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_TIAWA_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // API uses Bearer token authentication
    Authorization: `Bearer ${import.meta.env.VITE_TIAWA_API_KEY || ''}`,
  },
  timeout: 15000,
});

// ── Request interceptor: log every outgoing API call ────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // Override Authorization with user session token if present
    const token = localStorage.getItem('tiawa_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    logger.info('API:Request', `${config.method?.toUpperCase()} ${config.url}`, {
      baseURL: config.baseURL,
      params:  config.params,
      // Body logged in dev only — never in production
      ...(import.meta.env.DEV ? { body: config.data } : {}),
    });

    // Stamp the request start time so we can compute duration in the response
    config.metadata = { startTime: Date.now() };
    return config;
  },
  (error) => {
    logger.error('API:Request', 'Request setup failed', {
      message: error.message,
    });
    return Promise.reject(error);
  },
);

// ── Response interceptor: log success + errors ───────────────────────────────
apiClient.interceptors.response.use(
  (response) => {
    const ms = response.config.metadata
      ? Date.now() - response.config.metadata.startTime
      : null;

    logger.info('API:Response', `${response.status} ${response.config.url}`, {
      status:      response.status,
      duration_ms: ms,
      // Log full body in dev so business-logic failures (HTTP 200 + status:"Failed") are visible
      ...(import.meta.env.DEV ? { body: response.data } : {}),
    });

    return response;
  },
  (error) => {
    const status   = error.response?.status;
    const url      = error.config?.url;
    const ms       = error.config?.metadata
      ? Date.now() - error.config.metadata.startTime
      : null;

    logger.error('API:Response', `${status ?? 'NETWORK_ERROR'} ${url}`, {
      status,
      duration_ms:  ms,
      reason:       error.response?.data?.reason ?? error.message,
      status_code:  error.response?.data?.status_code,
    });

    if (status === 401) {
      localStorage.removeItem('tiawa_token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export default apiClient;
