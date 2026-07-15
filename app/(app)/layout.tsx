'use client';

import { Sidebar } from '@/components/shared/sidebar';

/**
 * App layout — wraps all authenticated pages with Sidebar.
 *
 * TODO: Add auth guard — redirect to /create if not authenticated
 * TODO: Add mobile sidebar toggle
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-surface p-8">{children}</main>
    </div>
  );
}
