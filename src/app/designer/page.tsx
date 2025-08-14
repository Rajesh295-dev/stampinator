"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Canvas, IText, FabricImage } from "fabric";
import { products } from "@/lib/products"; // mock data for now

export default function DesignerPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const searchParams = useSearchParams();
  const productId = Number(searchParams.get("productId"));

  // Keep a reference to the canvas instance
  const fabricCanvasRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      backgroundColor: "#ffffff",
      height: 500,
      width: 600,
    });
    fabricCanvasRef.current = canvas;

    // Preload product image if exists
    const product = products.find((p) => p.id === productId);
    if (product) {
      (async () => {
        const img = await FabricImage.fromURL(product.image);
        img.scaleToWidth(300);
        img.top = 100;
        img.left = 150;
        canvas.add(img);
      })();
    }

    return () => {
      canvas.dispose(); // ✅ sync cleanup
    };
  }, [productId]);

  const handleAddText = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const text = new IText("Your Text", {
      left: 50,
      top: 50,
      fill: "#000000",
      fontSize: 24,
    });
    canvas.add(text);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !e.target.files?.length) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (f) => {
      if (!f.target?.result) return;
      const img = await FabricImage.fromURL(f.target.result as string);
      img.scaleToWidth(200);
      canvas.add(img);
    };
    reader.readAsDataURL(file);
  };

  const handleExportPNG = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const dataURL = canvas.toDataURL({ format: "png", quality: 1 });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "design.png";
    link.click();
  };

  const handleExportJSON = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const json = canvas.toJSON();
    console.log("Design JSON:", json);
    alert("Design JSON logged to console.");
  };

  const handleChangeShirtColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    canvas.setBackgroundColor(e.target.value, () => canvas.renderAll());
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <h1 className="text-3xl font-bold mb-4">T-Shirt Designer</h1>

      <div className="flex flex-wrap gap-3 mb-4">
        <input type="color" onChange={handleChangeShirtColor} />
        <button
          onClick={handleAddText}
          className="bg-emerald-500 px-4 py-2 rounded hover:bg-emerald-400"
        >
          Add Text
        </button>
        <label className="bg-emerald-500 px-4 py-2 rounded cursor-pointer hover:bg-emerald-400">
          Upload Image
          <input type="file" accept="image/*" onChange={handleUploadImage} className="hidden" />
        </label>
        <button
          onClick={handleExportPNG}
          className="bg-neutral-200 text-black px-4 py-2 rounded hover:bg-white"
        >
          Export PNG
        </button>
        <button
          onClick={handleExportJSON}
          className="bg-neutral-200 text-black px-4 py-2 rounded hover:bg-white"
        >
          Export JSON
        </button>
      </div>

      <canvas ref={canvasRef} />
    </main>
  );
}
