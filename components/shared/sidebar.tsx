'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APP_NAME, ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: ROUTES.dashboard, label: 'Dashboard', icon: '□' },
  { href: ROUTES.identity, label: 'Identity', icon: '◎' },
  { href: ROUTES.credentials, label: 'Credentials', icon: '◈' },
  { href: ROUTES.dashboardWallets, label: 'Wallets', icon: '◇' },
  { href: ROUTES.dashboardApps, label: 'Connected Apps', icon: '⬡' },
  { href: ROUTES.settings, label: 'Settings', icon: '⚙' },
];

/**
 * App sidebar — visible on authenticated app pages.
 *
 * Shows the Verity brand, navigation links with icons,
 * and highlights the active route.
 *
 * TODO: Add icons (replace emoji placeholders with SVG icons)
 * TODO: Collapse to icon-only mode on small screens
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-surface-300 bg-white">
      {/* Brand */}
      <div className="flex h-16 items-center px-6">
        <Link href={ROUTES.dashboard} className="text-lg font-bold text-navy">
          {APP_NAME}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-navy-300 hover:bg-surface-200 hover:text-navy',
              )}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer note */}
      <div className="border-t border-surface-300 px-6 py-4 text-xs text-navy-200">
        Verity Identity
      </div>
    </aside>
  );
}
