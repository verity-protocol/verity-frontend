import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME, ROUTES } from '@/lib/constants';

/**
 * Landing page hero section — fully implemented.
 *
 * Deep navy (#0F1B2D) background with large, confident heading.
 * Uses Inter font at heavy weight. No gradients — flat and authoritative.
 */
export function HeroSection() {
  return (
    <section className="relative bg-navy px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Built on Stellar
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Prove who you are,
          <br />
          <span className="text-accent">reveal nothing.</span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
          Create your {APP_NAME} identity once. Verify with a trusted provider.
          Then prove you&apos;re verified to any app — without sharing your wallet,
          your documents, or any more than necessary.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={ROUTES.create}>
            <Button variant="primary" size="lg">
              Create your identity — it&apos;s free
            </Button>
          </Link>
          <Link href={ROUTES.howItWorks}>
            <Button variant="outline" size="lg" className="border-navy-400 text-white hover:bg-navy-400">
              Learn how it works
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-navy-300">
          <span className="flex items-center gap-1.5">
            <span className="text-verified">✓</span>
            No documents stored
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-verified">✓</span>
            Wallet stays private
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-verified">✓</span>
            Free to create
          </span>
        </div>
      </div>
    </section>
  );
}
