import apiClient from './client';

/**
 * Shorten a URL (no auth required — IP rate-limited)
 * POST /requests/create
 * Body: { url, short_path }
 * Response: { data: { short_url, short_path } }
 */
export const shortenUrl = async ({ url, customAlias = '' }) => {
  const { data } = await apiClient.post('/requests/create', {
    url,
    short_path: customAlias,
  });
  // API wraps payload in a `data` key
  return data.data ?? data;
};

/**
 * Get all links for the authenticated user
 * GET /links
 */
export const getLinks = async ({ page = 1, perPage = 15 } = {}) => {
  const { data } = await apiClient.get('/links', { params: { page, per_page: perPage } });
  return data;
};

/**
 * Get a single link by ID
 * GET /links/:id
 */
export const getLink = async (id) => {
  const { data } = await apiClient.get(`/links/${id}`);
  return data;
};

/**
 * Delete a link by ID
 * DELETE /links/:id
 */
export const deleteLink = async (id) => {
  const { data } = await apiClient.delete(`/links/${id}`);
  return data;
};

/**
 * Get stats/analytics for a short URL
 * GET /reports/{short_path}/
 */
export const getLinkAnalytics = async (shortPath) => {
  const { data } = await apiClient.get(`/reports/${shortPath}/`);
  return data.data ?? data;
};

/**
 * Get dashboard summary stats
 * GET /dashboard/stats
 */
export const getDashboardStats = async () => {
  const { data } = await apiClient.get('/dashboard/stats');
  return data;
};