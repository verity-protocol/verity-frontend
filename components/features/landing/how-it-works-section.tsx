const steps = [
  {
    number: '1',
    title: 'Connect your wallet',
    description:
      'Link your Stellar wallet to Verity. This is the only time your wallet address is used — and it stays completely private.',
  },
  {
    number: '2',
    title: 'Verify once',
    description:
      'Submit your ID document for one-time verification by a trusted provider. Your document is deleted immediately after.',
  },
  {
    number: '3',
    title: 'Prove forever',
    description:
      'Use your verified identity across any connected app. No re-verification needed. No documents shared. Just proof.',
  },
];

/**
 * How it works — 3-step visual flow.
 *
 * Flat, authoritative design. Numbered steps in a horizontal row.
 * No gradients, no decorative animations — just clear information.
 */
export function HowItWorksSection() {
  return (
    <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
          How it works
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-navy-300">
          Three steps to a portable, private, verified identity on Stellar.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              {/* Step number */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                {step.number}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy">{step.title}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-navy-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
