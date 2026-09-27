import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';

type AppRoute = '/chat' | '/about';

const projects = [
  {
    title: 'Live project',
    badge: 'Pinned first',
    copy: 'The stream demo with error handling, empty state, retry, and route-level failures.',
    href: '/chat',
    bullets: ['Empty first run with suggested prompts.', 'Retry resumes the failed message, not the whole chat.']
  },
  {
    title: 'Case study 2',
    badge: 'Short proof',
    copy: 'A second card that keeps the portfolio honest without trying to become a blog.',
    href: '/about',
    bullets: ['Six lines max.', 'Links back to the live project.']
  }
] as const satisfies ReadonlyArray<{
  title: string;
  badge: string;
  copy: string;
  href: AppRoute;
  bullets: readonly string[];
}>;

export default function ProjectsPage() {
  return (
    <main>
      <div className="site-shell">
        <section className="section" style={{ paddingTop: 32 }}>
          <div className="section-heading">
            <div>
              <div className="pill">Projects</div>
              <h1 className="display" style={{ marginTop: 14 }}>
                Proof that points back to the live project.
              </h1>
            </div>
            <p>
              The review path stays short. The live project comes first, the second card stays small, and everything on
              the page exists to make the click obvious.
            </p>
          </div>

          <div className="card-grid">
            {projects.map(project => (
              <article key={project.title} className="project-card primary">
                <span className="pill">{project.badge}</span>
                <h3>{project.title}</h3>
                <p>{project.copy}</p>
                <ul>
                  {project.bullets.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link className="inline-link" href={project.href}>
                  {project.title === 'Live project' ? 'Open the live project ' : 'Read the short about '}
                  {'->'}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}