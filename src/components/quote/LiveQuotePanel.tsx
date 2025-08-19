"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Download, Eye, Share2 } from "lucide-react";
import { Location } from "@/lib/quote/types";
import { priceLocation } from "@/lib/quote/pricing";


export default function LiveQuotePanel({ lines, itemsTotal, rushPct, rushFee, grand, onExport, onPrint }: {
lines: { l: Location; p: ReturnType<typeof priceLocation> }[];
itemsTotal: number;
rushPct: number;
rushFee: number;
grand: number;
onExport: () => void;
onPrint: () => void;
}) {
return (
<Card className="bg-emerald-800 border-neutral-700">
<CardHeader>
<CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5" /> Live Quote</CardTitle>
</CardHeader>
<CardContent className="space-y-3">
<div className="space-y-2">
{lines.map(({ l, p }, idx) => (
<div key={l.id} className="rounded-xl bg-neutral-900 border border-neutral-700 p-3">
<div className="flex items-center justify-between">
<div className="font-medium text-gray-200">{idx + 1}. {l.name}</div>
<div className="text-sm text-neutral-400">Qty {p.quantity}</div>
</div>
<div className="text-sm text-neutral-300 flex flex-wrap gap-x-6 gap-y-1 mt-1">
<span>Per item: ${p.perItem.toFixed(2)}</span>
<span>Setup: ${p.setupFees.toFixed(2)}</span>
<span>Line total: ${p.lineTotal.toFixed(2)}</span>
</div>
</div>
))}
</div>


<div className="border-t border-neutral-700 pt-3 space-y-1 text-sm">
<div className="flex justify-between"><span>Items Subtotal</span><span>${itemsTotal.toFixed(2)}</span></div>
<div className="flex justify-between"><span>Rush ({Math.round(rushPct * 100)}%)</span><span>${rushFee.toFixed(2)}</span></div>
<div className="flex justify-between font-semibold text-base"><span>Grand Total</span><span>${grand.toFixed(2)}</span></div>
</div>


<div className="grid grid-cols-2 gap-2 pt-2">
<Button onClick={onExport} className="gap-2"><Download className="h-4 w-4" /> Export JSON</Button>
<Button variant="outline" onClick={onPrint} className="gap-2 border-neutral-600"><Eye className="h-4 w-4" /> Print/Save PDF</Button>
<Button variant="outline" className="gap-2 border-neutral-600 col-span-2"><Share2 className="h-4 w-4" /> Share Quote Link (stub)</Button>
</div>
</CardContent>
</Card>
);
}