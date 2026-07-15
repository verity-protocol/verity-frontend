'use client';

import { type ReactNode, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Optional title displayed in the modal header. */
  title?: string;
  /** Additional className for the modal content panel. */
  className?: string;
}

/**
 * Modal component with backdrop, portal rendering, and escape key support.
 *
 * Renders via createPortal to document.body.
 * Closes on backdrop click or Escape key.
 */
export function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen || typeof window === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/50 transition-opacity"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={cn(
          'relative z-10 mx-4 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl',
          className,
        )}
      >
        {title && (
          <h2 className="mb-4 text-lg font-semibold text-navy">{title}</h2>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
