'use client';

import './globals.css';
import Link from 'next/link';
import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset?: () => void;
  retry?: () => void;
};

export default function GlobalError({ error, reset, retry }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const recover = retry ?? reset;

  return (
    <html lang="en">
      <body>
        <main>
          <div className="site-shell" style={{ paddingTop: 40 }}>
            <section className="error-card">
              <div className="error-flag">Global error</div>
              <h1>Something went wrong at the root.</h1>
              <p className="error-copy">
                This is the fallback for uncaught exceptions outside the route boundary. It still gives you a way back.
              </p>
              <div className="error-actions">
                <button className="retry-button" type="button" onClick={() => recover?.()}>
                  Reload app
                </button>
                <Link className="button-secondary" href="/">
                  Back home
                </Link>
              </div>
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
