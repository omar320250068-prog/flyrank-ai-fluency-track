import type { Metadata } from 'next';
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

type AppRoute = '/' | '/projects' | '/about' | '/chat';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display'
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Omar | I ship AI-assisted things',
  description: 'A portfolio built to prove the claim with a live project, two case studies, and a clear retry path.'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const
};

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/chat', label: 'Live project' }
] as const satisfies ReadonlyArray<{ href: AppRoute; label: string }>;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <header className="topbar">
          <div className="site-shell topbar-inner">
            <Link className="brand" href="/">
              <span className="brand-mark" aria-hidden="true" />
              <span>Omar / portfolio build</span>
            </Link>
            <nav className="nav" aria-label="Primary">
              {navItems.map(item => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}