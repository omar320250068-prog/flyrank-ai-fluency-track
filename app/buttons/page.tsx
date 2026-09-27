'use client';

import React, { useState } from 'react';
import { BrainButton, ButtonState } from '@/components/brain-button';
import { SiteFooter } from '@/components/site-footer';

export default function ButtonsPage() {
  const [forcedState, setForcedState] = useState<ButtonState | 'auto'>('auto');
  const [lastActionLog, setLastActionLog] = useState<string>('Ready. Click any button or use controls below.');
  const [clickCount, setClickCount] = useState<number>(0);

  const handleManualTrigger = async (type: 'success' | 'failure' | 'random') => {
    setLastActionLog(`Triggering ${type} flow...`);
    await new Promise(resolve => setTimeout(resolve, 1100));

    if (type === 'failure') {
      setLastActionLog('Action failed! State updated to Error.');
      throw new Error('Simulated failure');
    } else if (type === 'success') {
      setLastActionLog('Action succeeded! State updated to Success.');
    } else {
      const isErr = Math.random() < 0.2;
      if (isErr) {
        setLastActionLog('Random draw failed (20% chance)! Error state triggered.');
        throw new Error('Random failure');
      } else {
        setLastActionLog('Random draw succeeded (80% chance)! Success state triggered.');
      }
    }
  };

  return (
    <main>
      <div className="site-shell" style={{ paddingTop: 28 }}>
        <section className="section-heading">
          <div>
            <div className="eyebrow">Motion with Intent</div>
            <h1 className="display" style={{ marginTop: 14 }}>
              Buttons with a Brain
            </h1>
          </div>
          <p>
            A cohesive motion system communicating state lifecycle: <code>idle</code> → <code>hover</code> → <code>loading</code> → <code>success</code> / <code>error</code> → <code>idle</code>.
            Designed with compositor-only properties, keyboard accessibility, interruptibility protection, and reduced motion overrides.
          </p>
        </section>

        {/* Live Interactive Showcase */}
        <section className="card" style={{ marginBottom: 28, padding: 28 }}>
          <div className="pill" style={{ marginBottom: 16 }}>Live Component System</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 28 }}>
            {/* Primary Action Button */}
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.7)', borderRadius: 18, border: '1px solid rgba(29,23,18,0.08)' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: 12 }}>1. Primary Action (Send Message)</h3>
              <div style={{ minHeight: 64, display: 'flex', alignItems: 'center' }}>
                <BrainButton
                  variant="primary"
                  size="lg"
                  state={forcedState === 'auto' ? undefined : forcedState}
                  onClick={() => handleManualTrigger('random')}
                  onStateChange={state => {
                    if (forcedState === 'auto') {
                      setLastActionLog(`Primary button state changed to: ${state}`);
                    }
                  }}
                  idleLabel="Send message"
                  loadingLabel="Sending message..."
                  successLabel="Message sent!"
                  errorLabel="Failed — Retry send"
                />
              </div>
              <p className="small" style={{ marginTop: 8 }}>
                Main send action for chat & forms. Click to run 20% failure simulation.
              </p>
            </div>

            {/* Secondary System Button */}
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.7)', borderRadius: 18, border: '1px solid rgba(29,23,18,0.08)' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: 12 }}>2. Secondary Action (Retry / Regenerate)</h3>
              <div style={{ minHeight: 64, display: 'flex', alignItems: 'center' }}>
                <BrainButton
                  variant="secondary"
                  size="lg"
                  state={forcedState === 'auto' ? undefined : forcedState}
                  onClick={() => handleManualTrigger('success')}
                  idleLabel="Retry message"
                  loadingLabel="Retrying..."
                  successLabel="Retried successfully!"
                  errorLabel="Retry failed — try again"
                />
              </div>
              <p className="small" style={{ marginTop: 8 }}>
                Shares the exact same motion language, timing curve, and icon transforms.
              </p>
            </div>

            {/* Accent Action Button */}
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.7)', borderRadius: 18, border: '1px solid rgba(29,23,18,0.08)' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: 12 }}>3. Accent Action (Deploy Project)</h3>
              <div style={{ minHeight: 64, display: 'flex', alignItems: 'center' }}>
                <BrainButton
                  variant="accent"
                  size="md"
                  state={forcedState === 'auto' ? undefined : forcedState}
                  onClick={() => handleManualTrigger('failure')}
                  idleLabel="Deploy build"
                  loadingLabel="Deploying build..."
                  successLabel="Deploy live!"
                  errorLabel="Build failed"
                />
              </div>
              <p className="small" style={{ marginTop: 8 }}>
                Guaranteed failure trigger to observe shake keyframes & amber-red alert state.
              </p>
            </div>
          </div>

          {/* Interactive State Override Toolbar */}
          <div style={{ padding: 20, background: 'rgba(184, 77, 40, 0.05)', borderRadius: 18, border: '1px solid rgba(184, 77, 40, 0.15)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: 12, color: 'var(--accent-strong)' }}>
              State Choreography Test Bench:
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              <button
                type="button"
                className={`chip ${forcedState === 'auto' ? 'active' : ''}`}
                style={{ fontWeight: forcedState === 'auto' ? 700 : 500 }}
                onClick={() => setForcedState('auto')}
              >
                Auto (Interactive Lifecycle)
              </button>
              {(['idle', 'loading', 'success', 'error', 'disabled'] as ButtonState[]).map(st => (
                <button
                  key={st}
                  type="button"
                  className="chip"
                  style={{ textTransform: 'capitalize', fontWeight: forcedState === st ? 700 : 400 }}
                  onClick={() => setForcedState(st)}
                >
                  Force: {st}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                className="button-secondary"
                onClick={() => handleManualTrigger('success')}
              >
                Trigger Guaranteed Success
              </button>
              <button
                type="button"
                className="button-secondary"
                onClick={() => handleManualTrigger('failure')}
              >
                Trigger Guaranteed Failure
              </button>
              <button
                type="button"
                className="button-secondary"
                onClick={() => {
                  setClickCount(c => c + 1);
                  setLastActionLog(`Spam click attempt #${clickCount + 1}. Note: Disabled attribute prevents duplicate requests.`);
                }}
              >
                Test Spam Click Protection ({clickCount})
              </button>
            </div>

            <div style={{ marginTop: 14, fontSize: '0.88rem', color: 'var(--muted)', background: '#fff', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(29,23,18,0.08)' }}>
              <strong>Status Log:</strong> {lastActionLog}
            </div>
          </div>
        </section>

        {/* Duration & Easing Rationale */}
        <section className="section">
          <div className="card" style={{ padding: 28 }}>
            <div className="pill">System Design Rationale</div>
            <h2 style={{ fontSize: '1.8rem', marginTop: 12, marginBottom: 16 }}>
              Duration, Easing, and Compositor Architecture
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-strong)' }}>⏱️ Durations & Timing Curves</h3>
                <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: 'var(--muted)' }}>
                  <li><strong>Hover & Focus (180ms):</strong> Instant response under 200ms user perception threshold. Uses <code>cubic-bezier(0.16, 1, 0.3, 1)</code> ease-out for immediate physical feedback.</li>
                  <li><strong>Active Press (120ms):</strong> Fast compression scale (0.97) communicating mechanical feedback on touch/click down.</li>
                  <li><strong>State Morphing (360ms):</strong> Smooth transition from Idle label/icon to Spinner or Checkmark. Allows eye movement without abrupt layout snapping.</li>
                  <li><strong>Success Hold (2200ms):</strong> Keeps the checkmark visible long enough to acknowledge completion before gracefully returning to Idle.</li>
                  <li><strong>Error Shake (420ms):</strong> A 3-cycle horizontal micro-shake using <code>cubic-bezier(0.36, 0.07, 0.19, 0.97)</code> to communicate a soft boundary interrupt without harsh red flashbangs.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-strong)' }}>⚡ Compositor Safety & Accessibility</h3>
                <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: 'var(--muted)' }}>
                  <li><strong>No Layout Thrash:</strong> All micro-animations target GPU-composited properties (<code>transform</code>: scale/translate/rotate, and <code>opacity</code>). No dynamic height/width reflow during state changes.</li>
                  <li><strong>Spam-Click Lockout:</strong> Setting <code>disabled={`true`}</code> and <code>aria-busy={`true`}</code> during <code>loading</code> ensures mid-transition clicks cannot initiate parallel async calls.</li>
                  <li><strong>Keyboard & Screen Reader Accessible:</strong> Styled <code>:focus-visible</code> ring offset with full high-contrast border, plus <code>aria-live="polite"</code> status announcements.</li>
                  <li><strong>Reduced Motion (<code>prefers-reduced-motion</code>):</strong> Keyframe shakes and scale transforms are disabled under reduced motion settings while preserving color contrast and state icon morphs.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
