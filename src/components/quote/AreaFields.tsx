"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Location } from "@/lib/quote/types";


export default function AreaFields({ loc, onPatch, label = "Design Area (sq in)" }: { loc: Location; onPatch: (p: Partial<Location>) => void; label?: string }) {
return (
<div>
<Label>{label}</Label>
<Input type="number" min={1} className="bg-neutral-900 border-neutral-700 mt-1" value={loc.areaSqIn} onChange={(e) => onPatch({ areaSqIn: Number(e.target.value) })} />
</div>
);
}