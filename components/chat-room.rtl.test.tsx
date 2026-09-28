import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import React from 'react';
import { ChatRoom } from './chat-room';

// Mock AI SDK useChat hook to isolate component tests from network/API calls
vi.mock('@ai-sdk/react', () => {
  return {
    useChat: vi.fn()
  };
});

import { useChat } from '@ai-sdk/react';

describe('ChatRoom Component (React Testing Library)', () => {
  const mockSendMessage = vi.fn();
  const mockRegenerate = vi.fn();
  const mockClearError = vi.fn();
  const mockStop = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useChat as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      error: null,
      regenerate: mockRegenerate,
      clearError: mockClearError,
      status: 'idle',
      stop: mockStop
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders first-run empty state with heading and prompt presets', () => {
    render(<ChatRoom />);

    // Query by heading role instead of test IDs or CSS classes
    const heading = screen.getByRole('heading', {
      name: /No conversations yet/i
    });
    expect(heading).toBeDefined();

    // Query preset buttons by role
    const happyPathButtons = screen.getAllByRole('button', { name: /Happy path/i });
    expect(happyPathButtons.length).toBeGreaterThan(0);
  });

  it('validates empty input form submission without invoking API', () => {
    render(<ChatRoom />);

    const sendButton = screen.getAllByRole('button', { name: /^Send$/i })[0];
    fireEvent.click(sendButton);

    // Assert that empty input notice is displayed via status role
    const statusNote = screen.getByRole('status');
    expect(statusNote.textContent).toMatch(/Empty input is blocked/i);

    // Verify sendMessage API was NOT called
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it('submits typed prompt when form is submitted with non-empty input', async () => {
    render(<ChatRoom />);

    const inputArea = screen.getAllByRole('textbox', { name: /Chat input/i })[0];
    fireEvent.change(inputArea, { target: { value: 'Show me the clean run.' } });

    const sendButton = screen.getAllByRole('button', { name: /^Send$/i })[0];
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith({ text: 'Show me the clean run.' }, undefined);
    });
  });

  it('renders user and assistant messages across streaming state', () => {
    (useChat as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      messages: [
        { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hello AI' }] },
        { id: '2', role: 'assistant', parts: [{ type: 'text', text: 'Hello user! Here is your reply.' }] }
      ],
      sendMessage: mockSendMessage,
      error: null,
      regenerate: mockRegenerate,
      clearError: mockClearError,
      status: 'streaming',
      stop: mockStop
    });

    render(<ChatRoom />);

    expect(screen.getByText('Hello AI')).toBeDefined();
    expect(screen.getByText('Hello user! Here is your reply.')).toBeDefined();

    // Assert Stop button is visible during streaming
    const stopButton = screen.getByRole('button', { name: /Stop/i });
    expect(stopButton).toBeDefined();
  });

  it('renders designed failure UI on API mid-stream error and triggers retry', async () => {
    (useChat as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      messages: [
        { id: '1', role: 'user', parts: [{ type: 'text', text: 'Trigger mid-stream failure' }] }
      ],
      sendMessage: mockSendMessage,
      error: new Error('Injected mid-stream failure'),
      regenerate: mockRegenerate,
      clearError: mockClearError,
      status: 'idle',
      stop: mockStop
    });

    render(<ChatRoom />);

    // Verify designed error copy is rendered
    expect(screen.getByText('Stream interrupted')).toBeDefined();

    // Find retry button by role
    const retryButton = screen.getByRole('button', { name: /Retry failed message/i });
    expect(retryButton).toBeDefined();

    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(mockClearError).toHaveBeenCalled();
      expect(mockRegenerate).toHaveBeenCalled();
    });
  });
});
