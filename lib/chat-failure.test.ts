import { expect, describe, it } from 'vitest';
import { classifyChatError } from './chat-failure';

describe('classifyChatError', () => {
  it('classifies rate limit status and error messages', () => {
    expect(classifyChatError({ statusCode: 429, message: 'Rate limit reached.' }).kind).toBe('rate-limit');
    expect(classifyChatError({ status: 429, message: 'Too many requests' }).kind).toBe('rate-limit');
    expect(classifyChatError(new Error('rate limit exceeded')).kind).toBe('rate-limit');
  });

  it('classifies mid-stream failures', () => {
    expect(classifyChatError(new Error('Injected mid-stream failure')).kind).toBe('mid-stream');
    expect(classifyChatError(new Error('Stream interrupted')).kind).toBe('mid-stream');
  });

  it('classifies network and fetch failures', () => {
    expect(classifyChatError(new Error('Failed to fetch')).kind).toBe('network');
    expect(classifyChatError(new Error('NetworkError when attempting to fetch resource.')).kind).toBe('network');
    expect(classifyChatError(new Error('Load failed')).kind).toBe('network');
  });

  it('classifies malformed JSON tool payloads', () => {
    expect(classifyChatError(new Error('Unexpected token < in JSON')).kind).toBe('malformed');
    expect(classifyChatError(new Error('SyntaxError: malformed json response')).kind).toBe('malformed');
  });

  it('classifies empty input errors', () => {
    expect(classifyChatError({ statusCode: 400, message: 'Empty input is not allowed.' }).kind).toBe('empty');
    expect(classifyChatError(new Error('empty input')).kind).toBe('empty');
  });

  it('falls back to unknown error for unrecognized failures', () => {
    expect(classifyChatError(new Error('Something random')).kind).toBe('unknown');
    expect(classifyChatError(null).kind).toBe('unknown');
  });
});

