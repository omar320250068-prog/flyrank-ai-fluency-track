import Link from 'next/link';

export function SiteFooter() {
  return (
    <div className="site-shell footer-shell">
      <footer className="footer">
        <span>Built for one reviewer, one action.</span>
        <span>
          Found a flaw? That's the point. <Link href="mailto:omar@example.com">Email me</Link>
        </span>
      </footer>
    </div>
  );
}