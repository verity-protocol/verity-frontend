/**
 * Developers page — technical documentation and integration guide.
 *
 * This page is more data-dense than marketing pages.
 * Dark code blocks on light background. Code snippets with syntax highlighting.
 *
 * TODO: Implement full page with:
 * - REST API overview with endpoint table
 * - Step-by-step integration guide (5 min quickstart)
 * - Code snippets for DID resolution, credential checks
 * - Live API explorer (paste address, see response)
 * - SDK references
 * - Webhook documentation
 */
export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-5xl py-16">
      <h1 className="text-3xl font-bold text-navy">Developer Documentation</h1>
      <p className="mt-4 text-navy-300">
        Integrate Verity identity verification into your app in minutes.
      </p>

      {/* TODO: API Overview */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">API Overview</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-surface-300">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-200">
              <tr>
                <th className="px-4 py-3 font-medium text-navy">Method</th>
                <th className="px-4 py-3 font-medium text-navy">Endpoint</th>
                <th className="px-4 py-3 font-medium text-navy">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-300">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-accent">GET</td>
                <td className="px-4 py-3 font-mono text-xs">/did/:identifier</td>
                <td className="px-4 py-3 text-navy-300">Resolve a DID document</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-accent">GET</td>
                <td className="px-4 py-3 font-mono text-xs">/credentials/:didId</td>
                <td className="px-4 py-3 text-navy-300">List credentials for a DID</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-accent">POST</td>
                <td className="px-4 py-3 font-mono text-xs">/auth/session</td>
                <td className="px-4 py-3 text-navy-300">Create authorization session</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-accent">GET</td>
                <td className="px-4 py-3 font-mono text-xs">/auth/verify/:token</td>
                <td className="px-4 py-3 text-navy-300">Verify authorization token</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* TODO: Quickstart */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">Quickstart</h2>
        <p className="mt-3 text-navy-300">
          TODO — Add a 5-minute integration guide with code snippets.
        </p>
      </section>

      {/* TODO: Code examples */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">Code Examples</h2>
        <div className="mt-4 rounded-lg bg-navy p-6 font-mono text-sm text-navy-200">
          <pre>{`// TODO: Add code examples for DID resolution\n// and credential verification\nconst response = await fetch('/api/v1/did/:identifier');\nconst did = await response.json();`}</pre>
        </div>
      </section>

      {/* TODO: Live API Explorer */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">API Explorer</h2>
        <p className="mt-3 text-navy-300">
          TODO — Add a live query tool where developers can paste a wallet address
          and see the API response in real time.
        </p>
      </section>
    </div>
  );
}
