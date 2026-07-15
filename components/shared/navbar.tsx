'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletButton } from './wallet-button';
import { APP_NAME, ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: ROUTES.home, label: 'Home' },
  { href: ROUTES.howItWorks, label: 'How It Works' },
  { href: ROUTES.developers, label: 'Developers' },
];

/**
 * Top navigation bar — visible on marketing pages.
 *
 * Shows the Verity logo/name on the left, navigation links in the center,
 * and the WalletButton on the right.
 *
 * TODO: Add mobile hamburger menu for small screens
 */
export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-surface-300 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={ROUTES.home} className="flex items-center gap-2">
          <span className="text-xl font-bold text-navy">{APP_NAME}</span>
        </Link>

        {/* Nav links — hidden on small screens */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent',
                pathname === link.href ? 'text-accent' : 'text-navy-300',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Wallet button */}
        <WalletButton />
      </div>
    </header>
  );
}
