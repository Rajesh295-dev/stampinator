export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="group inline-flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow" />
          <span className="text-lg font-semibold tracking-tight">STAMPINATOR</span>
        </a>

        <nav className="hidden items-center gap-6 sm:flex">
          <a href="/designer" className="text-sm text-neutral-300 hover:text-white">Designer</a>
          <a href="/catalog" className="text-sm text-neutral-300 hover:text-white">Catalog</a>
          <a href="/pricing" className="text-sm text-neutral-300 hover:text-white">Pricing</a>
          <a href="/quoteGenerator" className="text-sm text-neutral-300 hover:text-white">QuoteGenerator</a>
          <a href="/orders" className="text-sm text-neutral-300 hover:text-white">Orders</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/auth/signin"
            className="rounded-xl border border-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:border-neutral-700 hover:text-white"
          >
            Sign in
          </a>
          <a
            href="/designer"
            className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-neutral-950 hover:bg-emerald-400"
          >
            Start designing
          </a>
        </div>
      </div>
    </header>
  );
}
