"use client";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Location } from "@/lib/quote/types";
import { Switch } from "@/components/ui/switch";


export default function EmbroideryFields({ loc, onPatch }: { loc: Location; onPatch: (p: Partial<Location>) => void }) {
return (
<>
<div>
<Label>Stitch Count (in thousands)</Label>
<Slider defaultValue={[loc.stitchCount || 5]} min={3} max={25} step={1} onValueChange={(v) => onPatch({ stitchCount: v[0] })} />
<div className="text-sm text-neutral-400 mt-1">{loc.stitchCount}k stitches</div>
</div>
<div className="flex items-center gap-3 pt-6">
<Switch checked={!!loc.digitizing} onCheckedChange={(v) => onPatch({ digitizing: v })} />
<Label>Digitizing Required</Label>
<Switch checked={!!loc.puffThread} onCheckedChange={(v) => onPatch({ puffThread: v })} className="ml-6" />
<Label>Puff/3D Thread</Label>
</div>
</>
);
}