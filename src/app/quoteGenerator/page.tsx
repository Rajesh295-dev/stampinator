"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings2, Plus } from "lucide-react";

import { ServiceTabs, RushSelector, LocationCard, LiveQuotePanel, SendQuoteCard } from "@/components/quote";
import { Location, RushKey, ServiceKey } from "@/lib/quote/types";
import { newLocation, priceLocation, pricingRules } from "@/lib/quote/pricing";
import { safeUUID } from "@/lib/quote/utils"; // ⬅️ add this

export default function QuoteGeneratorPage() {
  const [service, setService] = useState<ServiceKey>("screen");
  const [locations, setLocations] = useState<Location[]>([newLocation("Front")]);
  const [rush, setRush] = useState<RushKey>("none");
  const [meta, setMeta] = useState({ name: "", email: "", reference: "" });

  const priced = useMemo(() => {
    const lines = locations.map((l) => ({ l, p: priceLocation(service, l) }));
    const itemsTotal = lines.reduce((acc, x) => acc + x.p.lineTotal, 0);
    const rushPct = pricingRules.rush[rush] || 0;
    const rushFee = Math.round(itemsTotal * rushPct * 100) / 100;
    const grand = Math.round((itemsTotal + rushFee) * 100) / 100;
    return { lines, itemsTotal: Math.round(itemsTotal * 100) / 100, rushPct, rushFee, grand };
  }, [locations, service, rush]);

  const addLocation = () => setLocations((prev) => [...prev, newLocation("Back")]);
  const removeLocation = (id: string) => setLocations((prev) => prev.filter((l) => l.id !== id));

  const updateLoc = (id: string, patch: Partial<Location>) =>
    setLocations((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  const duplicateLoc = (id: string) =>
    setLocations((prev) => {
      const t = prev.find((l) => l.id === id);
      if (!t) return prev;
      const copy: Location = { ...t, id: safeUUID(), name: `${t.name} (copy)` }; // ⬅️ no any
      return [...prev, copy];
    });

  const exportJSON = () => {
    const payload = { service, rush, meta, locations, totals: priced, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quote-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 md:p-10">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.h1 layout className="text-3xl md:text-4xl font-semibold tracking-tight">
            Quote Generator
          </motion.h1>
          <p className="text-neutral-300">
            Advanced, modular builder for apparel decoration quotes. Swap pricing rules easily; wire Email/Share later.
          </p>

          <Card className="bg-emerald-800 border-neutral-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings2 className="h-5 w-5" /> Service & Rush Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ServiceTabs service={service} onChange={setService} />
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <RushSelector value={rush} onChange={setRush} />
                <div>
                  <Label>Project Name</Label>
                  <Input
                    className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200"
                    placeholder="e.g., Summer Promo Tees"
                    value={meta.reference}
                    onChange={(e) => setMeta({ ...meta, reference: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Client Email (optional)</Label>
                  <Input
                    type="email"
                    className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200"
                    placeholder="name@company.com"
                    value={meta.email}
                    onChange={(e) => setMeta({ ...meta, email: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Locations</h2>
            <Button onClick={addLocation} className="gap-2">
              <Plus className="h-4 w-4" /> Add Location
            </Button>
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

          <SendQuoteCard name={meta.name} email={meta.email} onChange={(p) => setMeta({ ...meta, ...p })} />
        </div>
      </div>
    </div>
  );
}
