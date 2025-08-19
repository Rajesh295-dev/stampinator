"use client";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


export default function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
return (
<div className="flex items-center gap-3">
<Switch checked={checked} onCheckedChange={onChange} />
<Label>{label}</Label>
</div>
);
}