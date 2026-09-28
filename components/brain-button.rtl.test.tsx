import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { BrainButton } from './brain-button';

describe('BrainButton Component (React Testing Library)', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders accessible button with idle role and text', () => {
    render(<BrainButton idleLabel="Deploy app" />);

    const button = screen.getByRole('button', { name: /Deploy app/i });
    expect(button).toBeDefined();
    expect(button.getAttribute('aria-busy')).toBe('false');
  });

  it('renders loading state with aria-busy and disabled attribute', () => {
    render(<BrainButton state="loading" loadingLabel="Deploying..." />);

    const button = screen.getByRole('button', { name: /Deploying.../i });
    expect(button).toBeDefined();
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('renders success state with check label', () => {
    render(<BrainButton state="success" successLabel="Deployed!" />);

    const button = screen.getByRole('button', { name: /Deployed!/i });
    expect(button).toBeDefined();
  });

  it('renders error state and handles retry click callback', () => {
    const handleClick = vi.fn();
    render(<BrainButton state="error" errorLabel="Failed — Retry" onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /Failed — Retry/i });
    expect(button).toBeDefined();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents click events when in disabled state', () => {
    const handleClick = vi.fn();
    render(<BrainButton disabled idleLabel="Disabled Action" onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /Disabled Action/i });
    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
