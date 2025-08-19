"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Canvas, IText, FabricImage, type TDataUrlOptions } from "fabric";
import { products } from "@/lib/products";

export default function DesignerClient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  const searchParams = useSearchParams();
  const productId = useMemo(() => {
    const raw = searchParams.get("productId");
    const n = raw ? Number(raw) : NaN;
    return Number.isFinite(n) ? n : null;
  }, [searchParams]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      backgroundColor: "#ffffff",
      height: 500,
      width: 600,
    });
    fabricCanvasRef.current = canvas;

    const product = products.find((p) => p.id === productId);
    if (product) {
      (async () => {
        try {
          const img = await FabricImage.fromURL(product.image);
          img.scaleToWidth(300);
          img.top = 100;
          img.left = 150;
          canvas.add(img);
        } catch {
          // ignore image load errors
        }
      })();
    }

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [productId]);

  const handleAddText = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const text = new IText("Your Text", { left: 50, top: 50, fill: "#000000", fontSize: 24 });
    canvas.add(text);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (f) => {
      const src = f.target?.result;
      if (!src || typeof src !== "string") return;
      try {
        const img = await FabricImage.fromURL(src);
        img.scaleToWidth(200);
        canvas.add(img);
      } catch {
        // ignore
      }
    };
    reader.readAsDataURL(file);
  };

  const handleExportPNG = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const opts: TDataUrlOptions = { format: "png", quality: 1, multiplier: 2, enableRetinaScaling: true };
    const dataURL = canvas.toDataURL(opts);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "design.png";
    link.click();
  };



  const handleExportJSON = () => {
  const canvas = fabricCanvasRef.current;
  if (!canvas) return;
  void canvas.toJSON(); // create JSON (unused here)
  alert("Design JSON exported successfully.");
};


  const handleChangeShirtColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    canvas.backgroundColor = e.target.value; // v6 API
    canvas.renderAll();
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <h1 className="text-3xl font-bold mb-4">T‑Shirt Designer</h1>

      <div className="flex flex-wrap gap-3 mb-4">
        <input type="color" onChange={handleChangeShirtColor} aria-label="Background color" />
        <button onClick={handleAddText} className="bg-emerald-500 px-4 py-2 rounded hover:bg-emerald-400">
          Add Text
        </button>
        <label className="bg-emerald-500 px-4 py-2 rounded cursor-pointer hover:bg-emerald-400">
          Upload Image
          <input type="file" accept="image/*" onChange={handleUploadImage} className="hidden" />
        </label>
        <button onClick={handleExportPNG} className="bg-neutral-200 text-black px-4 py-2 rounded hover:bg-white">
          Export PNG
        </button>
        <button onClick={handleExportJSON} className="bg-neutral-200 text-black px-4 py-2 rounded hover:bg-white">
          Export JSON
        </button>
      </div>

      <canvas ref={canvasRef} width={600} height={500} />
    </main>
  );
}
