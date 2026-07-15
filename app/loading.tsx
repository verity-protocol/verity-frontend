/**
 * Root loading state — shown while the root layout is loading.
 *
 * Simple full-page spinner for initial app load.
 */
export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="text-sm text-navy-300">Loading...</p>
      </div>
    </div>
  );
}
