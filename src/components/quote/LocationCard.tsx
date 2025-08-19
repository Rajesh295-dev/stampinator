"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { Location, ServiceKey } from "@/lib/quote/types";
import ScreenFields from "./ScreenFields";
import EmbroideryFields from "./EmbroideryFields";
import AreaFields from "./AreaFields";
import FinishingOptions from "./FinishingOptions";
import LinePreview from "./LinePreview";


export default function LocationCard({ service, loc, onPatch, onDuplicate, onRemove }: {
service: ServiceKey;
loc: Location;
onPatch: (p: Partial<Location>) => void;
onDuplicate: () => void;
onRemove: () => void;
}) {
return (
<Card className="bg-emerald-700 border-neutral-700">
<CardHeader>
<div className="flex items-center justify-between">
<CardTitle className="text-lg ">{loc.name}</CardTitle>
<div className="flex gap-2">
<Button variant="outline" className="border-neutral-600" onClick={onDuplicate}>Duplicate</Button>
<Button variant="destructive" onClick={onRemove} className="gap-2"><Trash2 className="h-4 w-4" /> Remove</Button>
</div>
</div>
</CardHeader>
<CardContent className="space-y-4">
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
<div>
<Label>Location Name</Label>
<Input className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200" value={loc.name} onChange={(e) => onPatch({ name: e.target.value })} />
</div>
<div>
<Label>Quantity</Label>
<Input type="number" min={1} className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200" value={loc.quantity} onChange={(e) => onPatch({ quantity: Number(e.target.value) })} />
</div>


{service === "screen" && <ScreenFields loc={loc} onPatch={onPatch} />}
{service === "embroidery" && <EmbroideryFields loc={loc} onPatch={onPatch} />}
{(service === "vinyl" || service === "digital" || service === "stickers") && (
<AreaFields loc={loc} onPatch={onPatch} />
)}
</div>


<FinishingOptions value={loc.finishing} onChange={(v) => onPatch({ finishing: v })} />
<LinePreview service={service} loc={loc} />
</CardContent>
</Card>
);
}