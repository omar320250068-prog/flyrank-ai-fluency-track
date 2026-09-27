import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';

export default function AboutPage() {
  return (
    <main>
      <div className="site-shell">
        <section className="section" style={{ paddingTop: 32 }}>
          <div className="about-card">
            <div className="pill">About</div>
            <h1 className="display" style={{ marginTop: 14 }}>
              Short enough to read, direct enough to trust.
            </h1>
            <p className="bio">
              I am Omar, and I verify before I ship. I use AI to move faster, but I keep the judgment, the review, and
              the final call with me.
            </p>
            <p className="bio">
              This portfolio is intentionally small: the claim, the proof, and the live project. If that does not hold
              up, nothing else matters.
            </p>
            <p className="bio">
              <Link className="inline-link" href="/chat">
                Go back to the live project {'->'}
              </Link>
            </p>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}