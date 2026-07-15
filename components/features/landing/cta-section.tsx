import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME, ROUTES } from '@/lib/constants';

/**
 * Bottom CTA section — final conversion point on the landing page.
 *
 * Deep navy background, matching the hero section.
 * Single focused CTA with reassurance copy.
 */
export function CtaSection() {
  return (
    <section className="bg-navy px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to own your identity?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-navy-200">
          Creating your {APP_NAME} identity takes less than a minute.
          It&apos;s free, and your documents are deleted the moment they&apos;re verified.
        </p>
        <div className="mt-8">
          <Link href={ROUTES.create}>
            <Button variant="primary" size="lg">
              Create your identity — it&apos;s free
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-sm text-navy-300">
          No credit card required. No documents stored. Powered by Stellar.
        </p>
      </div>
    </section>
  );
}
