'use client';

import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Input component with label, error state, and helper text.
 *
 * Displays a label above the input, an error message below on validation failure,
 * and optional helper text for guidance.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-navy',
            'placeholder:text-navy-200',
            'transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-1',
            error
              ? 'border-revoked focus:ring-revoked/30'
              : 'border-surface-300 hover:border-navy-100',
            className,
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-revoked">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-navy-200">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input, type InputProps };
