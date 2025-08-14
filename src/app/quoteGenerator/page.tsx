
"use client"
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Download, Mail, Share2, Calculator, Settings2, Eye } from "lucide-react";

/***************************************
 * Advanced Quote Generator (Modularized)
 * - Split into small, focused components
 * - Clear types & pricing utils
 * - Easy to swap UI kit or pricing rules later
 ***************************************/

/*****************
 * Types & Models
 *****************/

type ServiceKey =
  | "screen"
  | "embroidery"
  | "dtg"
  | "dtf"
  | "vinyl"
  | "digital"
  | "stickers";

type RushKey = "none" | "d4" | "d3" | "d2" | "d1";

type Finishing = {
  fold: boolean;
  polybag: boolean;
  hangTag: boolean;
  stickerApply: boolean;
};

type Location = {
  id: string;
  name: string; // Front, Back, Sleeve
  quantity: number;
  // screen
  inkColors?: number;
  garmentColor?: "white" | "color";
  metallicInk?: boolean;
  jumbo?: boolean;
  // embroidery
  stitchCount?: number; // thousands
  digitizing?: boolean;
  puffThread?: boolean;
  // area-based services
  areaSqIn?: number;
  // finishing
  finishing: Finishing;
};

/*****************
 * Pricing Rules
 *****************/

const pricingRules = {
  base: {
    screen: 2.0,
    embroideryPerThousand: 0.9,
    dtg: 6.0,
    dtf: 5.0,
    vinylPerSqIn: 0.15,
    digitalPerSqIn: 0.2,
    stickerPerSqIn: 0.12,
  },
  qtyMultipliers: [
    { min: 1, factor: 1.0 },
    { min: 25, factor: 0.95 },
    { min: 50, factor: 0.9 },
    { min: 100, factor: 0.85 },
    { min: 250, factor: 0.8 },
    { min: 500, factor: 0.75 },
  ],
  garmentColorUpcharge: { white: 0, color: 0.25 },
  inkColorsUpcharge: (n: number) => Math.max(0, n - 1) * 0.35,
  specialty: {
    metallicInk: 0.25,
    jumboPrint: 0.4,
    puffThread: 0.35,
  },
  finishing: {
    fold: 0.15,
    polybag: 0.25,
    hangTag: 0.2,
    stickerApply: 0.1,
  },
  rush: { none: 0, d4: 0.05, d3: 0.1, d2: 0.2, d1: 0.35 },
  setup: { screenPerColor: 15, embroideryDigitizing: 30 },
};

/*****************
 * Utils (pure)
 *****************/

function round2(n: number) { return Math.round(n * 100) / 100; }
function qtyFactor(qty: number) {
  let f = 1.0;
  for (const t of pricingRules.qtyMultipliers) if (qty >= t.min) f = t.factor;
  return f;
}

function defaultFinishing(): Finishing { return { fold: false, polybag: false, hangTag: false, stickerApply: false }; }
function newLocation(seed = "Front"): Location { return { id: crypto.randomUUID(), name: seed, quantity: 24, inkColors: 1, garmentColor: "white", metallicInk: false, jumbo: false, stitchCount: 5, digitizing: false, puffThread: false, areaSqIn: 12, finishing: defaultFinishing() }; }

/*****************
 * Pricing Engine
 *****************/

function priceLocation(service: ServiceKey, loc: Location) {
  const q = Math.max(0, loc.quantity || 0);
  const qFactor = qtyFactor(q);
  let perItem = 0;
  let setupFees = 0;

  switch (service) {
    case "screen": {
      const colors = Math.max(1, loc.inkColors || 1);
      perItem = pricingRules.base.screen;
      perItem += pricingRules.garmentColorUpcharge[loc.garmentColor || "white"];
      perItem += pricingRules.inkColorsUpcharge(colors);
      if (loc.metallicInk) perItem += pricingRules.specialty.metallicInk;
      if (loc.jumbo) perItem += pricingRules.specialty.jumboPrint;
      setupFees += colors * pricingRules.setup.screenPerColor;
      break;
    }
    case "embroidery": {
      const stitches = Math.max(1, loc.stitchCount || 5);
      perItem = stitches * pricingRules.base.embroideryPerThousand;
      if (loc.puffThread) perItem += pricingRules.specialty.puffThread;
      if (loc.digitizing) setupFees += pricingRules.setup.embroideryDigitizing;
      break;
    }
    case "dtg": {
      perItem = pricingRules.base.dtg;
      if (loc.jumbo) perItem += pricingRules.specialty.jumboPrint;
      break;
    }
    case "dtf": {
      perItem = pricingRules.base.dtf;
      if (loc.jumbo) perItem += pricingRules.specialty.jumboPrint;
      break;
    }
    case "vinyl": {
      const area = Math.max(1, loc.areaSqIn || 12);
      perItem = area * pricingRules.base.vinylPerSqIn;
      break;
    }
    case "digital": {
      const area = Math.max(1, loc.areaSqIn || 12);
      perItem = area * pricingRules.base.digitalPerSqIn;
      break;
    }
    case "stickers": {
      const area = Math.max(1, loc.areaSqIn || 12);
      perItem = area * pricingRules.base.stickerPerSqIn;
      break;
    }
  }

  // finishing adds per item
  if (loc.finishing.fold) perItem += pricingRules.finishing.fold;
  if (loc.finishing.polybag) perItem += pricingRules.finishing.polybag;
  if (loc.finishing.hangTag) perItem += pricingRules.finishing.hangTag;
  if (loc.finishing.stickerApply) perItem += pricingRules.finishing.stickerApply;

  const subtotal = perItem * q * qFactor;
  const total = subtotal + setupFees;

  return { perItem: round2(perItem * qFactor), setupFees: round2(setupFees), quantity: q, lineTotal: round2(total) };
}

/*****************
 * UI Components
 *****************/

function ServiceTabs({ service, onChange }: { service: ServiceKey; onChange: (v: ServiceKey) => void }) {
  return (
    <Tabs value={service} onValueChange={(v) => onChange(v as ServiceKey)}>
      <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full">
        {(["screen","embroidery","dtg","dtf","vinyl","digital","stickers"] as ServiceKey[]).map((k) => (
          <TabsTrigger key={k} value={k}>{k.charAt(0).toUpperCase()+k.slice(1)}</TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

function RushSelector({ value, onChange }: { value: RushKey; onChange: (v: RushKey) => void }) {
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

function FinishingOptions({ value, onChange }: { value: Finishing; onChange: (v: Finishing) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
      <ToggleRow label="Folding" checked={value.fold} onChange={(v) => onChange({ ...value, fold: v })} />
      <ToggleRow label="Polybag" checked={value.polybag} onChange={(v) => onChange({ ...value, polybag: v })} />
      <ToggleRow label="Hang Tag" checked={value.hangTag} onChange={(v) => onChange({ ...value, hangTag: v })} />
      <ToggleRow label="Apply Stickers" checked={value.stickerApply} onChange={(v) => onChange({ ...value, stickerApply: v })} />
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-3">
      <Switch checked={checked} onCheckedChange={onChange} />
      <Label>{label}</Label>
    </div>
  );
}

function ScreenFields({ loc, onPatch }: { loc: Location; onPatch: (p: Partial<Location>) => void }) {
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

function EmbroideryFields({ loc, onPatch }: { loc: Location; onPatch: (p: Partial<Location>) => void }) {
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

function AreaFields({ loc, onPatch, label = "Design Area (sq in)" }: { loc: Location; onPatch: (p: Partial<Location>) => void; label?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input type="number" min={1} className="bg-neutral-900 border-neutral-700 mt-1" value={loc.areaSqIn} onChange={(e) => onPatch({ areaSqIn: Number(e.target.value) })} />
    </div>
  );
}

function LinePreview({ service, loc }: { service: ServiceKey; loc: Location }) {
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

function LocationCard({ service, loc, onPatch, onDuplicate, onRemove }: {
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

function LiveQuotePanel({ lines, itemsTotal, rushPct, rushFee, grand, onExport, onPrint }: {
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

function SendQuoteCard({ name, email, onChange }: { name: string; email: string; onChange: (p: { name?: string; email?: string }) => void }) {
  return (
    <Card className="bg-emerald-800 border-neutral-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Send Quote</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <div>
            <Label>Your Name</Label>
            <Input className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200" value={name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Your name" />
          </div>
          <div>
            <Label>Recipient Email</Label>
            <Input className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200" type="email" value={email} onChange={(e) => onChange({ email: e.target.value })} placeholder="client@company.com" />
          </div>
          <Button className="gap-2"><Mail className="h-4 w-4" /> Email Quote (stub)</Button>
          <p className="text-xs text-neutral-400">Hook this to your backend to email a branded PDF/HTML quote to the client.</p>
        </div>
      </CardContent>
    </Card>
  );
}

/*****************
 * Main Page
 *****************/

export default function QuoteGenerator() {
  const [service, setService] = useState<ServiceKey>("screen");
  const [locations, setLocations] = useState<Location[]>([newLocation("Front")]);
  const [rush, setRush] = useState<RushKey>("none");
  const [meta, setMeta] = useState({ name: "", email: "", reference: "" });

  const priced = useMemo(() => {
    const lines = locations.map((l) => ({ l, p: priceLocation(service, l) }));
    const itemsTotal = lines.reduce((acc, x) => acc + x.p.lineTotal, 0);
    const rushPct = pricingRules.rush[rush] || 0;
    const rushFee = round2(itemsTotal * rushPct);
    const grand = round2(itemsTotal + rushFee);
    return { lines, itemsTotal: round2(itemsTotal), rushPct, rushFee, grand };
  }, [locations, service, rush]);

  const addLocation = () => setLocations((prev) => [...prev, newLocation("Back")]);
  const removeLocation = (id: string) => setLocations((prev) => prev.filter((l) => l.id !== id));
  const updateLoc = (id: string, patch: Partial<Location>) => setLocations((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const duplicateLoc = (id: string) => setLocations((prev) => { const t = prev.find((l) => l.id === id); if (!t) return prev; const copy = { ...t, id: crypto.randomUUID(), name: t.name + " (copy)" }; return [...prev, copy]; });

  const exportJSON = () => {
    const payload = { service, rush, meta, locations, totals: priced, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `quote-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 md:p-10">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.h1 layout className="text-3xl md:text-4xl font-semibold tracking-tight">Quote Generator</motion.h1>
          <p className="text-neutral-300">Advanced, modular builder for apparel decoration quotes. Swap pricing rules easily; wire Email/Share later.</p>

          <Card className="bg-emerald-800 border-neutral-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><Settings2 className="h-5 w-5" /> Service & Rush Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ServiceTabs service={service} onChange={setService} />
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <RushSelector value={rush} onChange={setRush} />
                <div>
                  <Label>Project Name</Label>
                  <Input className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200" placeholder="e.g., Summer Promo Tees" value={meta.reference} onChange={(e) => setMeta({ ...meta, reference: e.target.value })} />
                </div>
                <div>
                  <Label>Client Email (optional)</Label>
                  <Input type="email" className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200" placeholder="name@company.com" value={meta.email} onChange={(e) => setMeta({ ...meta, email: e.target.value })} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Locations</h2>
            <Button onClick={addLocation} className="gap-2"><Plus className="h-4 w-4" /> Add Location</Button>
          </div>

          {locations.map((loc) => (
            <LocationCard
              key={loc.id}
              service={service}
              loc={loc}
              onPatch={(p) => updateLoc(loc.id, p)}
              onDuplicate={() => duplicateLoc(loc.id)}
              onRemove={() => removeLocation(loc.id)}
            />
          ))}
        </div>

        <div className="lg:sticky lg:top-6 h-fit space-y-4">
          <LiveQuotePanel
            lines={priced.lines}
            itemsTotal={priced.itemsTotal}
            rushPct={priced.rushPct}
            rushFee={priced.rushFee}
            grand={priced.grand}
            onExport={exportJSON}
            onPrint={() => window.print()}
          />

          <SendQuoteCard
            name={meta.name}
            email={meta.email}
            onChange={(p) => setMeta({ ...meta, ...p })}
          />
        </div>
      </div>
    </div>
  );
}
