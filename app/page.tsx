export default function HomePage() {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center">
      <div className="text-center space-y-3">
        <p
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: 'var(--color-accent-cyan)' }}
        >
          Delightrics
        </p>
        <h1
          className="text-4xl font-semibold tracking-tight"
          style={{ color: 'var(--color-content)' }}
        >
          Total Experience Intelligence Platform
        </h1>
        <p style={{ color: 'var(--color-content-muted)' }} className="text-sm">
          Step 1 complete — base structure ready.
        </p>
      </div>
    </main>
  );
}
