import { Suspense } from "react";
import DesignerClient from "./DesignerClient";

export default function DesignerPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
          <h1 className="text-3xl font-bold mb-4">T‑Shirt Designer</h1>
          <p className="text-neutral-400">Loading designer…</p>
        </main>
      }
    >
      <DesignerClient />
    </Suspense>
  );
}
