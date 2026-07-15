'use client';

/**
 * Root error boundary — catches unhandled errors in the root layout.
 *
 * TODO: Add error reporting (Sentry, etc.)
 * TODO: Add "Try again" button that resets the error boundary
 */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold text-navy">Something went wrong</h1>
        <p className="mt-3 text-sm text-navy-300">
          An unexpected error occurred. Please try again.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-navy-200">
            Error: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
