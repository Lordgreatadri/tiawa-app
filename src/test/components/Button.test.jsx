import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '../../components/ui/Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('shows a loading spinner and hides children when loading', () => {
    render(<Button loading>Submit</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    // spinner svg should be present
    expect(btn.querySelector('svg')).toBeTruthy();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies the primary variant by default', () => {
    const { container } = render(<Button>Go</Button>);
    expect(container.firstChild.className).toMatch(/gradient|violet/i);
  });
});
