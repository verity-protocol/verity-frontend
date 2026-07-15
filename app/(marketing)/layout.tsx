import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

/**
 * Marketing layout — wraps all public pages with Navbar and Footer.
 *
 * Used by route group (marketing)/ for: /about, /how-it-works, /developers
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
