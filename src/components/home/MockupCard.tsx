export default function MockupCard() {
  return (
    <div className="mx-auto w-full max-w-xl self-center rounded-3xl border border-neutral-800 bg-neutral-900/40 p-5 shadow-2xl">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[78%] w-[78%] rounded-[28px] bg-neutral-800/70" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-emerald-500/50 bg-neutral-950/70 px-6 py-4">
          <div className="text-center text-sm text-neutral-200">Your Design Here</div>
          <div className="mt-2 h-16 w-56 rounded-md bg-gradient-to-r from-emerald-400/40 to-teal-500/40" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-neutral-300">Premium Cotton Tee</div>
        <button className="rounded-xl bg-emerald-500 px-3 py-1.5 text-sm font-medium text-neutral-950 hover:bg-emerald-400">
          Preview
        </button>
      </div>
    </div>
  );
}
