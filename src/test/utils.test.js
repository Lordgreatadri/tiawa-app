import { describe, it, expect } from 'vitest';
import { formatNumber, truncateUrl, formatDate } from '../lib/utils';

describe('formatNumber', () => {
  it('returns the number as string for small values', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(999)).toBe('999');
  });

  it('formats thousands with K suffix', () => {
    expect(formatNumber(1000)).toBe('1.0K');
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(25000)).toBe('25.0K');
  });

  it('formats millions with M suffix', () => {
    expect(formatNumber(1_000_000)).toBe('1.0M');
  });
});

describe('truncateUrl', () => {
  it('returns the original URL if under max length', () => {
    expect(truncateUrl('https://short.io', 30)).toBe('https://short.io');
  });

  it('truncates long URLs with ellipsis', () => {
    const url = 'https://very-long-domain-name.com/with/a/very/long/path?and=query&params=too';
    const result = truncateUrl(url, 40);
    expect(result.length).toBeLessThanOrEqual(41); // 40 + '…'
    expect(result.endsWith('…')).toBe(true);
  });
});

describe('formatDate', () => {
  it('formats a valid ISO date string', () => {
    const result = formatDate('2024-01-15T00:00:00Z');
    expect(result).toMatch(/jan/i);
    expect(result).toMatch(/2024/);
  });

  it('returns em-dash for null/undefined', () => {
    expect(formatDate(null)).toBe('—');
    expect(formatDate(undefined)).toBe('—');
  });
});
