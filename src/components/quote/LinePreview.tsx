"use client";
import { Location, ServiceKey } from "@/lib/quote/types";


export default function LinePreview({ service, loc }: { service: ServiceKey; loc: Location }) {
const tags: string[] = [];
if (service === "screen") {
tags.push(`${loc.inkColors || 1} color`);
tags.push(loc.garmentColor === "color" ? "color garment" : "white garment");
if (loc.metallicInk) tags.push("metallic/neon ink");
if (loc.jumbo) tags.push("jumbo");
}
if (service === "embroidery") {
tags.push(`${loc.stitchCount || 5}k stitches`);
if (loc.digitizing) tags.push("digitizing");
if (loc.puffThread) tags.push("puff/3D");
}
if (["vinyl", "digital", "stickers"].includes(service)) tags.push(`${loc.areaSqIn || 12} sq in`);
const fin = Object.entries(loc.finishing).filter(([, v]) => v).map(([k]) => k);
if (fin.length) tags.push(`finishing: ${fin.join(", ")}`);


return (
<div className="rounded-lg bg-neutral-900/60 border border-neutral-700 p-3 text-sm text-neutral-300">
<div className="font-medium text-white">Summary</div>
<div className="mt-1 flex flex-wrap gap-2">
{tags.map((t) => (
<span key={t} className="px-2 py-0.5 rounded-full bg-neutral-800 border border-neutral-700">{t}</span>
))}
</div>
</div>
);
}