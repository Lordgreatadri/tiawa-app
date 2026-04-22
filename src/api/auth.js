import apiClient from './client';

/**
 * Login
 * POST /auth/login
 */
export const login = async ({ email, password }) => {
  const { data } = await apiClient.post('/auth/login', { email, password });
  if (data.token) {
    localStorage.setItem('tiawa_token', data.token);
  }
  return data;
};

/**
 * Register
 * POST /auth/register
 */
export const register = async ({ name, email, password, password_confirmation }) => {
  const { data } = await apiClient.post('/auth/register', {
    name,
    email,
    password,
    password_confirmation,
  });
  if (data.token) {
    localStorage.setItem('tiawa_token', data.token);
  }
  return data;
};

/**
 * Logout
 * POST /auth/logout
 */
export const logout = async () => {
  await apiClient.post('/auth/logout');
  localStorage.removeItem('tiawa_token');
};

/**
 * Get current authenticated user
 * GET /auth/me
 */
export const getMe = async () => {
  const { data } = await apiClient.get('/auth/me');
  return data;
};
