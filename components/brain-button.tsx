'use client';

import React, { useState, useEffect, useRef } from 'react';

export type ButtonState = 'idle' | 'loading' | 'success' | 'error' | 'disabled';

export type BrainButtonProps = {
  /** Optional controlled state. If provided, overrides internal state. */
  state?: ButtonState;
  /** Action handler called on click (can be async). */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  /** Labels for each state */
  idleLabel?: string;
  loadingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  disabledLabel?: string;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  /** Size modifier */
  size?: 'sm' | 'md' | 'lg';
  /** Controlled disabled state */
  disabled?: boolean;
  /** Simulated async duration when testing uncontrolled mode (ms) */
  simulatedDelay?: number;
  /** Simulated failure probability when testing uncontrolled mode (0 to 1) */
  failureRate?: number;
  /** Type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Extra class names */
  className?: string;
  /** Children fallback if idleLabel is omitted */
  children?: React.ReactNode;
  /** Optional callback on state change */
  onStateChange?: (state: ButtonState) => void;
  /** Test ID for automated assertions */
  'data-testid'?: string;
};

export function BrainButton({
  state: controlledState,
  onClick,
  idleLabel = 'Send message',
  loadingLabel = 'Sending...',
  successLabel = 'Message sent!',
  errorLabel = 'Failed — Retry',
  disabledLabel,
  variant = 'primary',
  size = 'md',
  disabled = false,
  simulatedDelay = 1200,
  failureRate = 0,
  type = 'button',
  className = '',
  children,
  onStateChange,
  'data-testid': testId = 'brain-button'
}: BrainButtonProps) {
  const [internalState, setInternalState] = useState<ButtonState>(disabled ? 'disabled' : 'idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentState = controlledState ?? (disabled ? 'disabled' : internalState);

  useEffect(() => {
    onStateChange?.(currentState);
  }, [currentState, onStateChange]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (currentState === 'loading' || currentState === 'disabled') {
      return;
    }

    if (onClick) {
      try {
        if (!controlledState) {
          setInternalState('loading');
        }
        await onClick(event);
        if (!controlledState) {
          setInternalState('success');
          timeoutRef.current = setTimeout(() => {
            setInternalState('idle');
          }, 2200);
        }
      } catch {
        if (!controlledState) {
          setInternalState('error');
        }
      }
      return;
    }

    // Default simulated behavior if no onClick provided
    if (!controlledState) {
      setInternalState('loading');
      timeoutRef.current = setTimeout(() => {
        const isError = Math.random() < failureRate;
        if (isError) {
          setInternalState('error');
        } else {
          setInternalState('success');
          timeoutRef.current = setTimeout(() => {
            setInternalState('idle');
          }, 2200);
        }
      }, simulatedDelay);
    }
  };

  const getLabel = () => {
    switch (currentState) {
      case 'loading':
        return loadingLabel;
      case 'success':
        return successLabel;
      case 'error':
        return errorLabel;
      case 'disabled':
        return disabledLabel ?? idleLabel;
      case 'idle':
      default:
        return children ?? idleLabel;
    }
  };

  const isBusy = currentState === 'loading';
  const isInteractive = currentState !== 'loading' && currentState !== 'disabled';

  return (
    <button
      type={type}
      className={`brain-btn brain-btn-${variant} brain-btn-${size} state-${currentState} ${className}`}
      onClick={handleClick}
      disabled={currentState === 'loading' || currentState === 'disabled'}
      aria-busy={isBusy}
      aria-live="polite"
      aria-disabled={!isInteractive}
      data-testid={testId}
      data-state={currentState}
    >
      <span className="brain-btn-content">
        <span className="brain-btn-icon-slot" aria-hidden="true">
          {currentState === 'idle' && (
            <svg className="icon icon-send" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
          {currentState === 'loading' && (
            <svg className="icon icon-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
            </svg>
          )}
          {currentState === 'success' && (
            <svg className="icon icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {currentState === 'error' && (
            <svg className="icon icon-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          {currentState === 'disabled' && (
            <svg className="icon icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
        </span>
        <span className="brain-btn-label">{getLabel()}</span>
      </span>
    </button>
  );
}
