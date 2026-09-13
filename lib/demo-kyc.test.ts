import { afterEach, describe, expect, it, vi } from 'vitest';
import { isDemoKycEnabled, runDemoVerification } from '@/lib/demo-kyc';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('isDemoKycEnabled', () => {
  it('is disabled when the flag is unset', () => {
    vi.stubEnv('NEXT_PUBLIC_ENABLE_DEMO_KYC', '');
    vi.stubEnv('NODE_ENV', 'development');
    expect(isDemoKycEnabled()).toBe(false);
  });

  it('is disabled when the flag is not "1"', () => {
    vi.stubEnv('NEXT_PUBLIC_ENABLE_DEMO_KYC', 'true');
    vi.stubEnv('NODE_ENV', 'development');
    expect(isDemoKycEnabled()).toBe(false);
  });

  it('is enabled only when the flag is "1" and not a production build', () => {
    vi.stubEnv('NEXT_PUBLIC_ENABLE_DEMO_KYC', '1');
    vi.stubEnv('NODE_ENV', 'development');
    expect(isDemoKycEnabled()).toBe(true);
  });

  it('is structurally impossible in a production build', () => {
    vi.stubEnv('NEXT_PUBLIC_ENABLE_DEMO_KYC', '1');
    vi.stubEnv('NODE_ENV', 'production');
    expect(isDemoKycEnabled()).toBe(false);
  });
});

describe('runDemoVerification', () => {
  it('performs zero network I/O and resolves', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await expect(runDemoVerification()).resolves.toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});