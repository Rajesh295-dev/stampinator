export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function safeUUID(): string {
  try {
    // Works in browsers that support crypto.randomUUID
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return (crypto as Crypto & { randomUUID: () => string }).randomUUID();
    }
  } catch {
    // ignore
  }
  // Fallback: pseudo-random string
  return Math.random().toString(36).slice(2);
}
