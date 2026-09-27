import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';

type AppRoute = '/chat' | '/projects';

const proofPoints = [
  { label: 'Primary action', value: 'Try the live project' },
  { label: 'Claim', value: 'I ship AI-assisted things' },
  { label: 'Reviewer lens', value: 'One person, one decision' }
];

const caseCards = [
  {
    title: 'Live project',
    copy: 'A working chat flow with a designed empty state, pending skeletons, retry, and a route-level error boundary.',
    href: '/chat',
    badge: 'Pinned first',
    primary: true,
    bullets: ['Handles empty input, rate limits, and interrupted streams.', 'Built to be tested, not admired.']
  },
  {
    title: 'Case study 2',
    copy: 'A compact second proof point that keeps the reviewer on the same path instead of sending them to a dead-end page.',
    href: '/projects',
    badge: 'Short proof',
    primary: false,
    bullets: ['Shows what shipped.', 'Links back to the live project.']
  }
] as const satisfies ReadonlyArray<{
  title: string;
  copy: string;
  href: AppRoute;
  badge: string;
  primary?: boolean;
  bullets: readonly string[];
}>;

export default function HomePage() {
  return (
    <main>
      <div className="site-shell">
        <section className="hero-grid">
          <div>
            <div className="eyebrow">Portfolio checkpoint 1</div>
            <h1>I ship AI-assisted things.</h1>
            <p className="lead">
              This portfolio is built for one reviewer and one action: try the live project. Every page has to earn its
              place, and the chat flow has to keep working when the network or the API does not.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/chat">
                Try the live project
              </Link>
              <Link className="button-secondary" href="/projects">
                See the proof
              </Link>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="panel-grid">
              <div className="pill">What this build proves</div>
              <div className="stat-strip">
                {proofPoints.map(point => (
                  <div key={point.label} className="stat">
                    <strong>{point.value}</strong>
                    <span>{point.label}</span>
                  </div>
                ))}
              </div>
              <p className="small">
                The site starts with the claim, then shows the work. No separate contact page. No extra pages that pull
                the reviewer away from the live project.
              </p>
            </div>
          </aside>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <div className="pill">Projects</div>
              <h2>Two cards, one path.</h2>
            </div>
            <p>
              The first card is the live project. The second stays short so it supports the claim without turning into a
              detour.
            </p>
          </div>

          <div className="card-grid">
            {caseCards.map(card => (
              <article key={card.title} className={`project-card ${card.primary ? 'primary' : ''}`}>
                <span className="pill">{card.badge}</span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <ul>
                  {card.bullets.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link className="inline-link" href={card.href}>
                  {card.primary ? 'Open the live project ' : 'Open the project map '}
                  {'->'}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="about-card">
            <div className="pill">About</div>
            <h2>Short, direct, human in the loop.</h2>
            <p className="bio">
              I am Omar. I build with AI, but I keep the final judgment human. The claim on this site is not that I use
              tools; it is that I ship things that work and stay useful when the first try fails.
            </p>
            <p className="bio">
              If the reviewer only has time for one thing, it should be the live project. The rest of the site exists to
              make that click feel worth it.
            </p>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}