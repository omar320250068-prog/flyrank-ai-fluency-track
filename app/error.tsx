'use client';

import Link from 'next/link';
import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset?: () => void;
  retry?: () => void;
};

export default function RootError({ error, reset, retry }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const recover = retry ?? reset;

  return (
    <main>
      <div className="site-shell" style={{ paddingTop: 40 }}>
        <section className="error-card">
          <div className="error-flag">Page failed</div>
          <h1>This page crashed, but the rest of the site is still here.</h1>
          <p className="error-copy">
            Use try again to remount the route, or go back to the live project and continue from a working state.
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
