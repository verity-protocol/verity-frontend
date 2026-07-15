import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'verified' | 'pending' | 'revoked' | 'default';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  verified: 'bg-verified/10 text-verified border-verified/20',
  pending: 'bg-pending/10 text-pending border-pending/20',
  revoked: 'bg-revoked/10 text-revoked border-revoked/20',
  default: 'bg-surface-200 text-navy-300 border-surface-300',
};

/**
 * Badge component for status display.
 *
 * Variants: verified (green), pending (amber), revoked (red), default (grey).
 * Server-compatible — no 'use client' needed.
 */
export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { type BadgeProps, type BadgeVariant };
