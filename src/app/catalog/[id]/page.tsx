"use client"
import { products } from "@/lib/products";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.id === Number(params.id));
  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={500}
          className="rounded-lg object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-neutral-400 mt-2">${product.price}</p>
          <p className="mt-4">{product.description}</p>

          <div className="flex gap-2 mt-4">
            {product.colors.map((color) => (
              <div
                key={color}
                className="w-8 h-8 rounded-full border"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>

          <button
            onClick={() => window.location.href = `/designer?productId=${product.id}`}
            className="mt-6 rounded bg-emerald-500 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-emerald-400"
          >
            Start Designing
          </button>
        </div>
      </div>
    </main>
  );
}
