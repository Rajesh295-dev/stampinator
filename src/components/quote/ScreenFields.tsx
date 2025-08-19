"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Location } from "@/lib/quote/types";
import { Switch } from "@/components/ui/switch";


export default function ScreenFields({ loc, onPatch }: { loc: Location; onPatch: (p: Partial<Location>) => void }) {
return (
<>
<div>
<Label>Ink Colors</Label>
<Input type="number" min={1} className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200" value={loc.inkColors} onChange={(e) => onPatch({ inkColors: Number(e.target.value) })} />
</div>
<div>
<Label>Garment Color</Label>
<Select value={loc.garmentColor} onValueChange={(v) => onPatch({ garmentColor: v as any })}>
<SelectTrigger className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200"><SelectValue /></SelectTrigger>
<SelectContent>
<SelectItem value="white">White</SelectItem>
<SelectItem value="color">Color</SelectItem>
</SelectContent>
</Select>
</div>
<div className="col-span-1 md:col-span-2 flex items-center gap-3 pt-6">
<Switch checked={!!loc.metallicInk} onCheckedChange={(v) => onPatch({ metallicInk: v })} />
<Label>Metallic/Neon Ink</Label>
<Switch checked={!!loc.jumbo} onCheckedChange={(v) => onPatch({ jumbo: v })} className="ml-6" />
<Label>Jumbo Print</Label>
</div>
</>
);
}