'use client';

import Link from 'next/link';
import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset?: () => void;
  retry?: () => void;
};

export default function ChatRouteError({ error, reset, retry }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const recover = retry ?? reset;

  return (
    <main>
      <div className="site-shell" style={{ paddingTop: 40 }}>
        <section className="error-card">
          <div className="error-flag">Route failed</div>
          <h1>This route crashed on purpose.</h1>
          <p className="error-copy">
            The render-time failure path is working. Recover here, then go back and verify the happy path again.
          </p>
          <div className="error-actions">
            <button className="retry-button" type="button" onClick={() => recover?.()}>
              Try again
            </button>
            <Link className="button-secondary" href="/chat">
              Back to live project
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
