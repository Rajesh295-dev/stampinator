"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";


export default function SendQuoteCard({ name, email, onChange }: { name: string; email: string; onChange: (p: { name?: string; email?: string }) => void }) {
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