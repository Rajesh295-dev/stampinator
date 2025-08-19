"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { products } from "@/lib/products";

type SortBy = "price-asc" | "price-desc";
const isSortBy = (v: string): v is SortBy => v === "price-asc" || v === "price-desc";

export default function CatalogPage() {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy | null>(null);

  const filteredProducts = useMemo(() => {
    const base = selectedColor
      ? products.filter((p) => p.colors.includes(selectedColor))
      : products.slice();

    if (sortBy === "price-asc") return base.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return base.sort((a, b) => b.price - a.price);
    return base;
  }, [selectedColor, sortBy]);

  const allColors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors))),
    []
  );

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedColor ?? ""}
          onChange={(e) => setSelectedColor(e.target.value || null)}
          className="rounded bg-neutral-900 border border-neutral-700 p-2"
        >
          <option value="">All Colors</option>
          {allColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>

        <select
          value={sortBy ?? ""}
          onChange={(e) => setSortBy(isSortBy(e.target.value) ? e.target.value : null)}
          className="rounded bg-neutral-900 border border-neutral-700 p-2"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-neutral-800 bg-neutral-900 p-4"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="rounded-lg object-cover"
              priority={false} // set to true if this image is above-the-fold
            />
            <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-neutral-400">${product.price}</p>

            {/* Color swatches */}
            <div className="flex gap-2 mt-2">
              {product.colors.map((color) => (
                <button
                  type="button"
                  key={color}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Filter by ${color}`}
                  title={`Filter by ${color}`}
                />
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => router.push(`/designer?productId=${product.id}`)}
                className="flex-1 rounded bg-emerald-500 px-3 py-2 text-sm font-medium text-neutral-950 hover:bg-emerald-400"
              >
                Start Designing
              </button>
              <button
                onClick={() => router.push(`/catalog/${product.id}`)}
                className="flex-1 rounded border border-neutral-700 px-3 py-2 text-sm hover:border-neutral-500"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
