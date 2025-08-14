import MockupCard from "./MockupCard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(16,163,127,0.35),transparent_70%)]" />
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="flex flex-col justify-center">
          <h1 className="text-pretty text-4xl font-semibold tracking-tight md:text-5xl">
            Design & print custom tees in minutes
          </h1>
          <p className="mt-4 max-w-prose text-neutral-300">
            Upload artwork or create from scratch. Real-time previews, transparent pricing, and
            print-ready outputs — from a single, blazing-fast web app.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/designer"
              className="rounded-2xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-neutral-950 hover:bg-emerald-400"
            >
              Open Designer
            </a>
            <a
              href="/catalog"
              className="rounded-2xl border border-neutral-800 px-4 py-2.5 text-sm text-neutral-200 hover:border-neutral-700 hover:text-white"
            >
              Browse Catalog
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xs text-neutral-400">
            <span>SVG/PNG uploads</span>
            <span>·</span>
            <span>CMYK/PDF export</span>
            <span>·</span>
            <span>Stripe checkout</span>
          </div>
        </div>
        <MockupCard />
      </div>
    </section>
  );
}
