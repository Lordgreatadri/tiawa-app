import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UrlShortener from '../../components/features/UrlShortener';

// Mock API module
vi.mock('../../api/links', () => ({
  shortenUrl: vi.fn(),
}));

import { shortenUrl } from '../../api/links';

function wrapper({ children }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

beforeEach(() => vi.clearAllMocks());

describe('UrlShortener', () => {
  it('renders the form with URL input and submit button', () => {
    render(<UrlShortener />, { wrapper });
    expect(screen.getByPlaceholderText(/paste your long url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /shorten/i })).toBeInTheDocument();
  });

  it('does not call API when URL input is empty', async () => {
    render(<UrlShortener />, { wrapper });
    fireEvent.click(screen.getByRole('button', { name: /shorten/i }));
    // form has required type=url — browser prevents submission; API not called
    expect(shortenUrl).not.toHaveBeenCalled();
  });

  it('shows the result card on successful API response', async () => {
    shortenUrl.mockResolvedValueOnce({
      short_url: 'https://tiaw.a/abc123',
      original_url: 'https://example.com',
      clicks: 0,
    });

    render(<UrlShortener />, { wrapper });
    fireEvent.change(screen.getByPlaceholderText(/paste your long url/i), {
      target: { value: 'https://example.com' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /shorten/i }).closest('form'));

    await waitFor(() => {
      expect(screen.getByText('https://tiaw.a/abc123')).toBeInTheDocument();
    });
  });

  it('shows an error message on API failure', async () => {
    shortenUrl.mockRejectedValueOnce({
      response: { data: { message: 'Rate limit exceeded' } },
    });

    render(<UrlShortener />, { wrapper });
    fireEvent.change(screen.getByPlaceholderText(/paste your long url/i), {
      target: { value: 'https://example.com' },
    });
    // Use submit event to bypass browser URL validation
    fireEvent.submit(screen.getByRole('button', { name: /shorten/i }).closest('form'));

    await waitFor(() => {
      expect(screen.getByText(/rate limit exceeded/i)).toBeInTheDocument();
    });
  });
});
