import { Skeleton } from './skeleton';

/**
 * Dashboard loading skeleton — shown while data is being fetched.
 *
 * Uses animated placeholder blocks to indicate loading state.
 */
export default function DashboardLoading() {
  return (
    <div>
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-2 h-4 w-72" />

      {/* Verification status skeleton */}
      <div className="mt-8 rounded-xl border border-surface-300 bg-white p-6">
        <Skeleton className="h-4 w-32" />
        <div className="mt-3 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </div>

      {/* Content skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="mt-6 rounded-xl border border-surface-300 bg-white p-6">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-3 h-3 w-full" />
        </div>
      ))}
    </div>
  );
}
