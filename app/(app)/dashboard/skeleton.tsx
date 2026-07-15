/**
 * Reusable skeleton placeholder for loading states.
 *
 * Animated pulse effect via Tailwind.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-surface-300 ${className || ''}`}
    />
  );
}
