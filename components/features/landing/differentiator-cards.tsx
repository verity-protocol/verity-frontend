import { Card, CardBody } from '@/components/ui/card';

const differentiators = [
  {
    icon: '🗑',
    title: 'Documents deleted immediately',
    description:
      'Your ID document is verified by the provider and instantly discarded. Verity never sees, stores, or transmits your documents.',
  },
  {
    icon: '🔒',
    title: 'Your wallet stays private',
    description:
      'Third-party apps verify your identity status without ever seeing your wallet address. Your financial activity stays yours.',
  },
  {
    icon: '♻',
    title: 'Identity survives wallet changes',
    description:
      'Lost your wallet? Upgrading? Link a new one and your identity follows. Your Verity identity is yours — not tied to any single key.',
  },
];

/**
 * Three differentiator cards — the core value proposition.
 *
 * White background, flat design, no gradients.
 * Each card has an icon, title, and description.
 */
export function DifferentiatorCards() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
          Identity, designed for trust
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-navy-300">
          Three principles that make {process.env.NEXT_PUBLIC_APP_NAME || 'Verity'} different
          from every other identity system.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {differentiators.map((item) => (
            <Card key={item.title}>
              <CardBody className="flex flex-col items-start gap-3">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="text-sm leading-relaxed text-navy-300">
                  {item.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
