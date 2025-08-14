export default function HowItWorks() {
  const steps = [
    { step: "1", title: "Create", desc: "Upload art or design with text, shapes, and SVGs." },
    { step: "2", title: "Preview", desc: "See instant mockups on different colors & sizes." },
    { step: "3", title: "Order", desc: "Checkout securely — we generate print-ready files." },
  ];

  return (
    <section className="border-t border-neutral-900">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="rounded-2xl border border-neutral-900 bg-neutral-900/40 p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 font-semibold text-neutral-950">
                {s.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-neutral-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
