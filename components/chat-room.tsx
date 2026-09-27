'use client';

import { ChatFailureCard } from '@/components/chat-failure';
import { MessageSkeleton } from '@/components/message-skeleton';
import { classifyChatError } from '@/lib/chat-failure';
import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';
import { useEffect, useMemo, useRef, useState } from 'react';

const promptPresets = [
  {
    label: 'Happy path',
    prompt: 'Show me the clean run and the next useful step.',
    scenario: undefined as string | undefined
  },
  {
    label: 'Rate limit',
    prompt: 'Trigger the rate limit state and show the retry.',
    scenario: 'rate-limit'
  },
  {
    label: 'Mid-stream failure',
    prompt: 'Trigger a mid-stream failure and keep the last user message.',
    scenario: 'mid-stream'
  },
  {
    label: 'No results',
    prompt: 'Show the no results state with a next action.',
    scenario: undefined
  },
  {
    label: 'Slow reply',
    prompt: 'Take the slow path so the pending skeleton can settle first.',
    scenario: 'slow'
  },
  {
    label: 'Broken JSON',
    prompt: 'Return malformed JSON from a tool.',
    scenario: 'malformed'
  }
];

function messageText(message: { parts?: Array<{ type: string; text?: string }> }) {
  return (
    message.parts
      ?.filter(part => part.type === 'text')
      .map(part => part.text ?? '')
      .join('')
      .trim() ?? ''
  );
}

export function ChatRoom() {
  const transport = useMemo(
    () =>
      new TextStreamChatTransport({
        api: '/api/chat'
      }),
    []
  );
  const { messages, sendMessage, error, regenerate, clearError, status, stop } = useChat({
    transport
  });
  const [input, setInput] = useState('');
  const [emptyHint, setEmptyHint] = useState(false);
  const [retryLocked, setRetryLocked] = useState(false);
  const [online, setOnline] = useState(true);
  const lastPromptRef = useRef('');
  const feedRef = useRef<HTMLDivElement>(null);
  const isPending = status === 'submitted' || status === 'streaming';
  const lastMessage = messages.at(-1);
  const lastAssistantHasText = lastMessage?.role === 'assistant' && Boolean(messageText(lastMessage));
  const showSkeleton = isPending && !lastAssistantHasText;
  const lastUserMessage = [...messages].reverse().find(message => message.role === 'user');
  const lastUserPrompt = lastUserMessage ? messageText(lastUserMessage) || lastPromptRef.current : lastPromptRef.current;
  const lastAssistantMessage = [...messages]
    .reverse()
    .find(message => message.role === 'assistant' && messageText(message));
  const noResults = lastAssistantMessage
    ? messageText(lastAssistantMessage).toLowerCase().includes('no matching')
    : false;
  const failure = error ? classifyChatError(error) : null;

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener('online', sync);
    window.addEventListener('offline', sync);
    return () => {
      window.removeEventListener('online', sync);
      window.removeEventListener('offline', sync);
    };
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) {
      return;
    }

    const syncViewport = () => {
      const offset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      document.documentElement.style.setProperty('--keyboard-offset', `${offset}px`);
    };

    syncViewport();
    viewport.addEventListener('resize', syncViewport);
    viewport.addEventListener('scroll', syncViewport);
    return () => {
      viewport.removeEventListener('resize', syncViewport);
      viewport.removeEventListener('scroll', syncViewport);
    };
  }, []);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) {
      return;
    }

    const distanceFromBottom = feed.scrollHeight - feed.scrollTop - feed.clientHeight;
    if (distanceFromBottom < 96) {
      feed.scrollTop = feed.scrollHeight;
    }
  }, [messages, status, error]);

  async function submitPrompt(prompt: string, scenario?: string) {
    if (!prompt.trim() || isPending || retryLocked) {
      return;
    }

    if (!navigator.onLine) {
      setOnline(false);
      return;
    }

    lastPromptRef.current = prompt.trim();
    setEmptyHint(false);
    clearError();
    await sendMessage({ text: prompt.trim() }, scenario ? { body: { scenario } } : undefined);
    setInput('');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim()) {
      setEmptyHint(true);
      return;
    }

    await submitPrompt(input);
  }

  async function handleRetry() {
    if (retryLocked || isPending) {
      return;
    }

    setRetryLocked(true);
    clearError();

    try {
      await regenerate();
    } finally {
      window.setTimeout(() => setRetryLocked(false), 280);
    }
  }

  return (
    <div className="chat-shell">
      <div className="chat-grid">
        <section className="chat-thread" aria-label="Chat preview">
          <div className="chat-header">
            <div>
              <div className="pill">Live project</div>
              <h1 className="chat-heading">Try the stream, break it, retry it.</h1>
            </div>
            <div className="route-hint desktop-only">Route: /chat</div>
          </div>

          <div className="chat-feed" ref={feedRef} aria-live="polite" aria-relevant="additions text">
            {messages.length === 0 ? (
              <div className="empty-state">
                <h2>No conversations yet — try asking about a clean run.</h2>
                <p className="empty-copy">
                  First run is empty on purpose. Pick an example and the composer fills it, then the stream starts.
                </p>
                <div className="chip-row" style={{ marginTop: 14 }}>
                  {promptPresets.slice(0, 4).map(preset => (
                    <button
                      key={preset.label}
                      className="chip"
                      type="button"
                      onClick={() => submitPrompt(preset.prompt, preset.scenario)}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map(message => {
              const text = messageText(message);
              if (!text) {
                return null;
              }

              return (
                <article key={message.id} className={`bubble ${message.role === 'user' ? 'user' : 'assistant'}`}>
                  <div className="bubble-title">{message.role === 'user' ? 'You' : 'Assistant'}</div>
                  <p className="message-content">{text}</p>
                </article>
              );
            })}

            {showSkeleton ? <MessageSkeleton /> : null}

            {failure ? (
              <ChatFailureCard
                failure={failure}
                failedPrompt={lastUserPrompt || lastPromptRef.current}
                retrying={retryLocked}
                onRetry={() => {
                  void handleRetry();
                }}
              />
            ) : null}

            {noResults && !isPending && !failure ? (
              <article className="bubble assistant">
                <div className="bubble-title">No results</div>
                <p className="message-content">
                  No match yet — try asking about a clean run, or tap an example to fill the next prompt.
                </p>
                <div className="chip-row" style={{ marginTop: 12 }}>
                  <button
                    className="chip"
                    type="button"
                    onClick={() => submitPrompt(promptPresets[0].prompt)}
                  >
                    Ask about a clean run
                  </button>
                </div>
              </article>
            ) : null}

            {!online ? (
              <article className="bubble error">
                <div className="bubble-title">Offline</div>
                <p className="message-content">
                  The network is down. Reconnect, then retry the failed message — not the whole conversation.
                </p>
              </article>
            ) : null}
          </div>

          <form className="composer" onSubmit={handleSubmit}>
            {emptyHint ? (
              <p className="empty-note" role="status">
                Empty input is blocked. Try “Show me the clean run” or pick an example.
              </p>
            ) : null}
            <div className="input-row">
              <textarea
                value={input}
                onChange={event => {
                  setInput(event.target.value);
                  if (event.target.value.trim()) {
                    setEmptyHint(false);
                  }
                }}
                placeholder="Ask for the happy path, a rate limit, or a mid-stream failure..."
                aria-label="Chat input"
                disabled={status === 'submitted' || status === 'streaming'}
              />
              <div className="composer-buttons">
                {isPending ? (
                  <button className="button-secondary" type="button" onClick={() => stop()}>
                    Stop
                  </button>
                ) : (
                  <button className="button" type="submit" disabled={retryLocked}>
                    Send
                  </button>
                )}
              </div>
            </div>
            <div className="composer-actions">
              {promptPresets.map(preset => (
                <button
                  key={preset.label}
                  className="button-secondary"
                  type="button"
                  onClick={() => submitPrompt(preset.prompt, preset.scenario)}
                  disabled={isPending || retryLocked}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </form>
        </section>

        <aside className="chat-sidebar" aria-label="Failure checklist">
          <div className="sidebar-section">
            <h2>What this page handles</h2>
            <ul>
              <li>Empty first run with click-to-fill examples.</li>
              <li>Pending stream with a bubble-shaped skeleton.</li>
              <li>API, rate-limit, network, and mid-stream failures with a retry that targets one message.</li>
              <li>Stop for an in-flight response, locked against a double retry.</li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h2>Sabotage order</h2>
            <ol className="sabotage-list">
              <li>Send empty input: blocked with a next action.</li>
              <li>Kill the network before send, then reconnect.</li>
              <li>Use mid-stream failure, then retry the failed message twice.</li>
              <li>Use rate limit for a 429.</li>
              <li>Use broken JSON for a malformed tool payload.</li>
              <li>
                <a className="inline-link" href="/chat?panic=1">
                  Trigger the route error boundary
                </a>
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
