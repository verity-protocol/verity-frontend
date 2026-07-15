import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { HeroSection } from '@/components/features/landing/hero-section';
import { DifferentiatorCards } from '@/components/features/landing/differentiator-cards';
import { HowItWorksSection } from '@/components/features/landing/how-it-works-section';
import { ForUsersVsDevelopers } from '@/components/features/landing/for-users-vs-developers';
import { CtaSection } from '@/components/features/landing/cta-section';

/**
 * Landing page — fully implemented.
 *
 * Sections:
 * 1. Navbar (shared)
 * 2. Hero — tagline, subtext, CTA
 * 3. Differentiator cards — 3 value props
 * 4. How it works — 3-step flow
 * 5. For users vs developers — split section
 * 6. CTA — bottom conversion
 * 7. Footer (shared)
 *
 * This is a server component — no 'use client' needed.
 * All interactive elements (Navbar, WalletButton) are client components
 * imported as needed.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DifferentiatorCards />
        <HowItWorksSection />
        <ForUsersVsDevelopers />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
