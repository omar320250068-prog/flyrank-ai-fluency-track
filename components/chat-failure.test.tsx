import { test, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ChatFailureCard } from './chat-failure';
import { classifyChatError } from '../lib/chat-failure';

test('mid-stream failure path renders the designed error UI and retry', () => {
  const failure = classifyChatError(new Error('Injected mid-stream failure'));
  const html = renderToStaticMarkup(
    createElement(ChatFailureCard, {
      failure,
      failedPrompt: 'Trigger a mid-stream failure and keep the last user message.',
      retrying: false,
      onRetry: () => undefined
    })
  );

  expect(failure.kind).toBe('mid-stream');
  expect(html).toContain('data-testid="chat-failure"');
  expect(html).toContain('data-kind="mid-stream"');
  expect(html).toContain('Stream interrupted');
  expect(html).toContain('Retry failed message');
  expect(html).toContain('Will retry:');
  expect(html).toContain('Trigger a mid-stream failure');
});

test('rate limit failure path renders 429 designed error UI and retry', () => {
  const failure = classifyChatError({ statusCode: 429, message: 'Rate limit reached.' });
  const html = renderToStaticMarkup(
    createElement(ChatFailureCard, {
      failure,
      failedPrompt: 'Trigger the rate limit state',
      retrying: false,
      onRetry: () => undefined
    })
  );

  expect(failure.kind).toBe('rate-limit');
  expect(html).toContain('data-kind="rate-limit"');
  expect(html).toContain('Rate limit');
  expect(html).toContain('overloaded right now');
  expect(html).toContain('Will retry:');
});

test('malformed JSON failure path renders designed tool error UI', () => {
  const failure = classifyChatError(new Error('Unexpected token < in JSON'));
  const html = renderToStaticMarkup(
    createElement(ChatFailureCard, {
      failure,
      failedPrompt: 'Return malformed JSON',
      retrying: false,
      onRetry: () => undefined
    })
  );

  expect(failure.kind).toBe('malformed');
  expect(html).toContain('data-kind="malformed"');
  expect(html).toContain('Broken tool payload');
  expect(html).toContain('malformed JSON');
});

test('retry button communicates busy state so a second click cannot fire', () => {
  const failure = classifyChatError(new Error('Injected mid-stream failure'));
  const html = renderToStaticMarkup(
    createElement(ChatFailureCard, {
      failure,
      failedPrompt: 'failed prompt',
      retrying: true,
      onRetry: () => undefined
    })
  );

  expect(html).toContain('disabled');
  expect(html).toContain('Retrying failed message');
});


