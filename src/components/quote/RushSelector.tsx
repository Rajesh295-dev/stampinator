"use client";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RushKey } from "@/lib/quote/types";


export default function RushSelector({ value, onChange }: { value: RushKey; onChange: (v: RushKey) => void }) {
return (
<div>
<Label>Rush</Label>
<Select value={value} onValueChange={(v) => onChange(v as RushKey)}>
<SelectTrigger className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200"><SelectValue placeholder="Production speed" /></SelectTrigger>
<SelectContent>
<SelectItem value="none">Standard (no rush)</SelectItem>
<SelectItem value="d4">Priority 4-day (+5%)</SelectItem>
<SelectItem value="d3">Priority 3-day (+10%)</SelectItem>
<SelectItem value="d2">Priority 2-day (+20%)</SelectItem>
<SelectItem value="d1">Priority 1-day (+35%)</SelectItem>
</SelectContent>
</Select>
</div>
);
}