'use client';

import type { FailureCopy } from '@/lib/chat-failure';

type ChatFailureCardProps = {
  failure: FailureCopy;
  failedPrompt?: string;
  retrying: boolean;
  onRetry: () => void;
};

export function ChatFailureCard({ failure, failedPrompt, retrying, onRetry }: ChatFailureCardProps) {
  return (
    <article className="bubble error" data-testid="chat-failure" data-kind={failure.kind}>
      <div className="bubble-title">{failure.title}</div>
      <p className="message-content">{failure.copy}</p>
      {failedPrompt ? (
        <p className="failed-prompt">
          Will retry: <span>{failedPrompt}</span>
        </p>
      ) : null}
      <div className="error-actions">
        <button
          className={`retry-button ${retrying ? 'is-busy' : ''}`}
          type="button"
          onClick={onRetry}
          disabled={retrying}
          aria-busy={retrying}
        >
          {retrying ? 'Retrying failed message…' : 'Retry failed message'}
        </button>
      </div>
    </article>
  );
}
