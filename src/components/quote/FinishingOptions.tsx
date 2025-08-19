"use client";
import ToggleRow from "./ToggleRow";
import { Finishing } from "@/lib/quote/types";


export default function FinishingOptions({ value, onChange }: { value: Finishing; onChange: (v: Finishing) => void }) {
return (
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
<ToggleRow label="Folding" checked={value.fold} onChange={(v) => onChange({ ...value, fold: v })} />
<ToggleRow label="Polybag" checked={value.polybag} onChange={(v) => onChange({ ...value, polybag: v })} />
<ToggleRow label="Hang Tag" checked={value.hangTag} onChange={(v) => onChange({ ...value, hangTag: v })} />
<ToggleRow label="Apply Stickers" checked={value.stickerApply} onChange={(v) => onChange({ ...value, stickerApply: v })} />
</div>
);
}