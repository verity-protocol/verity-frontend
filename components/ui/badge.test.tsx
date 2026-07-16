import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies variant class for verified', () => {
    render(<Badge variant="verified">Verified</Badge>);
    const badge = screen.getByText('Verified');
    expect(badge.className).toContain('bg-verified');
  });

  it('applies variant class for revoked', () => {
    render(<Badge variant="revoked">Revoked</Badge>);
    const badge = screen.getByText('Revoked');
    expect(badge.className).toContain('bg-revoked');
  });

  it('defaults to default variant', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge.className).toContain('bg-surface-200');
  });
});
