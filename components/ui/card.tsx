'use client';

import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type CardProps = HTMLAttributes<HTMLDivElement>;

/**
 * Card container — use with CardHeader, CardBody, CardFooter.
 *
 * Provides a white background with subtle border and rounded corners.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-surface-300 bg-white shadow-sm',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

/** Card header — top section with title or actions. */
const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('border-b border-surface-300 px-6 py-4', className)}
      {...props}
    />
  ),
);
CardHeader.displayName = 'CardHeader';

/** Card body — main content area. */
const CardBody = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-5', className)} {...props} />
  ),
);
CardBody.displayName = 'CardBody';

/** Card footer — bottom section with actions. */
const CardFooter = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'border-t border-surface-300 px-6 py-4',
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardBody, CardFooter };
