/**
 * About page — placeholder for Verity's mission, team, and open source story.
 *
 * TODO: Implement full page with:
 * - Mission statement about self-sovereign identity
 * - Team section (founders, contributors)
 * - Open source philosophy
 * - Timeline / roadmap
 * - Partners and ecosystem
 */
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl py-16">
      <h1 className="text-3xl font-bold text-navy">About Verity</h1>
      <p className="mt-4 text-navy-300">
        Verity is a self-sovereign identity protocol built on Stellar. We believe
        your identity should be yours — not locked inside any single app, company,
        or wallet.
      </p>

      {/* TODO: Add mission section */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">Our Mission</h2>
        <p className="mt-3 text-navy-300">
          TODO — Write the mission statement here. Explain why self-sovereign
          identity matters and how Verity makes it possible on Stellar.
        </p>
      </section>

      {/* TODO: Add team section */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">Team</h2>
        <p className="mt-3 text-navy-300">
          TODO — Add team member cards with names, roles, and links.
        </p>
      </section>

      {/* TODO: Add open source section */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">Open Source</h2>
        <p className="mt-3 text-navy-300">
          TODO — Explain the open source approach, contributor campaign, and how
          to get involved.
        </p>
      </section>
    </div>
  );
}
