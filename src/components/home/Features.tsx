export default function Features() {
  const features = [
    { title: "Live preview", desc: "Accurate on-shirt mockups as you design." },
    { title: "Print-ready files", desc: "Export CMYK PDFs with bleed & crop marks." },
    { title: "Secure checkout", desc: "Stripe-powered payments and webhooks." },
    { title: "Fast fulfillment", desc: "Integrate with Printful/Printify or in-house." },
  ];

  return (
    <section className="border-t border-neutral-900 bg-neutral-950/60">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-neutral-900 bg-neutral-900/40 p-5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500" />
            <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-neutral-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
