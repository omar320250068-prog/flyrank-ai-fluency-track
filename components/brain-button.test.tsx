import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BrainButton } from './brain-button';

describe('BrainButton Motion & State System', () => {
  it('renders idle state with correct accessible attributes', () => {
    const html = renderToStaticMarkup(
      createElement(BrainButton, {
        state: 'idle',
        idleLabel: 'Send message'
      })
    );

    expect(html).toContain('data-state="idle"');
    expect(html).toContain('Send message');
    expect(html).toContain('aria-busy="false"');
    expect(html).toContain('icon-send');
  });

  it('renders loading state with busy aria attribute and disabled lockout', () => {
    const html = renderToStaticMarkup(
      createElement(BrainButton, {
        state: 'loading',
        loadingLabel: 'Sending message...'
      })
    );

    expect(html).toContain('data-state="loading"');
    expect(html).toContain('Sending message...');
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('disabled=""');
    expect(html).toContain('icon-spinner');
  });

  it('renders success state with check icon and success class', () => {
    const html = renderToStaticMarkup(
      createElement(BrainButton, {
        state: 'success',
        successLabel: 'Message sent!'
      })
    );

    expect(html).toContain('data-state="success"');
    expect(html).toContain('state-success');
    expect(html).toContain('Message sent!');
    expect(html).toContain('icon-check');
  });

  it('renders error state with alert icon and retry label', () => {
    const html = renderToStaticMarkup(
      createElement(BrainButton, {
        state: 'error',
        errorLabel: 'Failed — Retry send'
      })
    );

    expect(html).toContain('data-state="error"');
    expect(html).toContain('state-error');
    expect(html).toContain('Failed — Retry send');
    expect(html).toContain('icon-alert');
  });

  it('renders disabled state with lock icon and disabled attribute', () => {
    const html = renderToStaticMarkup(
      createElement(BrainButton, {
        disabled: true
      })
    );

    expect(html).toContain('data-state="disabled"');
    expect(html).toContain('disabled=""');
    expect(html).toContain('aria-disabled="true"');
    expect(html).toContain('icon-lock');
  });
});
