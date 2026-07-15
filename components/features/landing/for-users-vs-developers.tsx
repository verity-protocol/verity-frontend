import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

const userFeatures = [
  'One-time verification for lifetime access',
  'Your wallet address is never shared',
  'Revoke app access anytime',
  'Link and unlink wallets freely',
];

const devFeatures = [
  'Simple REST API for verification checks',
  'OAuth-like popup authorization flow',
  'Webhook support for real-time status',
  'Full DID resolution endpoint',
];

/**
 * Split section: "For users" vs "For developers".
 *
 * Two-column layout with feature lists and a CTA for each audience.
 * Clean, flat design on white background.
 */
export function ForUsersVsDevelopers() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
          Built for everyone
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* For Users */}
          <div className="rounded-xl border border-surface-300 p-8">
            <h3 className="mb-2 text-xl font-semibold text-navy">For users</h3>
            <p className="mb-6 text-sm text-navy-300">
              Your identity, your control. No middlemen, no data harvesting.
            </p>
            <ul className="mb-8 space-y-3">
              {userFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-navy">
                  <span className="mt-0.5 text-verified">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link href={ROUTES.create}>
              <Button variant="primary" size="md">
                Create your identity
              </Button>
            </Link>
          </div>

          {/* For Developers */}
          <div className="rounded-xl border border-surface-300 p-8">
            <h3 className="mb-2 text-xl font-semibold text-navy">For developers</h3>
            <p className="mb-6 text-sm text-navy-300">
              Integrate identity verification in minutes, not months.
            </p>
            <ul className="mb-8 space-y-3">
              {devFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-navy">
                  <span className="mt-0.5 text-accent">→</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link href={ROUTES.developers}>
              <Button variant="outline" size="md">
                Read the docs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
