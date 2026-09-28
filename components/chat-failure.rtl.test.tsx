import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { ChatFailureCard } from './chat-failure';
import { classifyChatError } from '../lib/chat-failure';

describe('ChatFailureCard Component (React Testing Library)', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders mid-stream failure card with accessible heading and retry button', () => {
    const handleRetry = vi.fn();
    const failure = classifyChatError(new Error('Injected mid-stream failure'));

    render(
      <ChatFailureCard
        failure={failure}
        failedPrompt="Show me mid-stream failure"
        retrying={false}
        onRetry={handleRetry}
      />
    );

    // Query heading and prompt by text content, not CSS class names
    expect(screen.getByText('Stream interrupted')).toBeDefined();
    expect(screen.getByText('Show me mid-stream failure')).toBeDefined();

    const retryBtn = screen.getByRole('button', { name: /Retry failed message/i });
    expect(retryBtn).toBeDefined();

    fireEvent.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('renders rate-limit 429 failure card with copy and busy retry state', () => {
    const failure = classifyChatError({ statusCode: 429, message: 'Rate limit reached' });

    render(
      <ChatFailureCard
        failure={failure}
        failedPrompt="Rate limit prompt"
        retrying={true}
        onRetry={() => undefined}
      />
    );

    expect(screen.getByText('Rate limit')).toBeDefined();
    expect(screen.getByText(/model is overloaded/i)).toBeDefined();

    const retryBtn = screen.getByRole('button', { name: /Retrying failed message/i });
    expect(retryBtn.hasAttribute('disabled')).toBe(true);
    expect(retryBtn.getAttribute('aria-busy')).toBe('true');
  });
});
