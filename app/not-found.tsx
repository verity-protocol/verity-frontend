import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

/**
 * 404 page — shown when no route matches.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-navy">404</h1>
        <p className="mt-4 text-lg text-navy-300">Page not found</p>
        <p className="mt-2 text-sm text-navy-200">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href={ROUTES.home}
          className="mt-6 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-600"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
