import Link from 'next/link';
import { APP_NAME, ROUTES } from '@/lib/constants';

/**
 * Site footer — visible on marketing pages.
 *
 * Server-compatible — no 'use client' needed.
 * Contains copyright, navigation links, and a "Built on Stellar" note.
 */
export function Footer() {
  return (
    <footer className="border-t border-surface-300 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="text-lg font-bold text-navy">{APP_NAME}</span>
            <p className="mt-2 text-sm text-navy-300">
              Self-sovereign identity on Stellar.
              <br />
              Prove who you are, reveal nothing.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-navy">Navigation</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: ROUTES.about, label: 'About' },
                { href: ROUTES.howItWorks, label: 'How It Works' },
                { href: ROUTES.developers, label: 'Developers' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-300 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Built on Stellar */}
          <div>
            <h3 className="text-sm font-semibold text-navy">Ecosystem</h3>
            <p className="mt-3 text-sm text-navy-300">
              Built on{' '}
              <a
                href="https://stellar.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Stellar
              </a>{' '}
              with{' '}
              <a
                href="https://soroban.stellar.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Soroban
              </a>{' '}
              smart contracts.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-surface-300 pt-6 text-center text-xs text-navy-200">
          &copy; {new Date().getFullYear()} {APP_NAME}. Open source under MIT License.
        </div>
      </div>
    </footer>
  );
}
