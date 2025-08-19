export function round2(n: number) { return Math.round(n * 100) / 100; }


export function safeUUID() {
try {
// Works in the browser client.
if (typeof crypto !== "undefined" && (crypto as any).randomUUID) {
return (crypto as any).randomUUID();
}
} catch {}
return Math.random().toString(36).slice(2);
}