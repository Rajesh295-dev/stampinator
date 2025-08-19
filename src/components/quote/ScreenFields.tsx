"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { Location } from "@/lib/quote/types";

// If you haven’t already, define the allowed colors:
const GARMENT_COLORS = ["white", "color"] as const;
type GarmentColor = typeof GARMENT_COLORS[number];

function isGarmentColor(v: string): v is GarmentColor {
  return (GARMENT_COLORS as readonly string[]).includes(v);
}

type Props = {
  loc: Location; // expect garmentColor: GarmentColor
  onPatch: (patch: Partial<Location>) => void;
};

export default function ScreenFields({ loc, onPatch }: Props) {
  return (
    <>
      <div>
        <Label htmlFor="inkColors">Ink Colors</Label>
        <Input
          id="inkColors"
          type="number"
          min={1}
          className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200"
          value={loc.inkColors}
          onChange={(e) => {
            const n = Number(e.target.value);
            onPatch({ inkColors: Number.isFinite(n) ? n : 1 });
          }}
        />
      </div>

      <div>
        <Label htmlFor="garmentColor">Garment Color</Label>
        <Select
          value={loc.garmentColor}
          onValueChange={(v: string) => {
            if (isGarmentColor(v)) onPatch({ garmentColor: v });
          }}
        >
          <SelectTrigger
            id="garmentColor"
            className="bg-neutral-900 border-neutral-700 mt-1 text-gray-200"
          >
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="white">White</SelectItem>
            <SelectItem value="color">Color</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-1 md:col-span-2 flex items-center gap-3 pt-6">
        <Switch
          checked={Boolean(loc.metallicInk)}
          onCheckedChange={(v) => onPatch({ metallicInk: v })}
          id="metallicInk"
        />
        <Label htmlFor="metallicInk">Metallic/Neon Ink</Label>

        <Switch
          checked={Boolean(loc.jumbo)}
          onCheckedChange={(v) => onPatch({ jumbo: v })}
          id="jumboPrint"
          className="ml-6"
        />
        <Label htmlFor="jumboPrint">Jumbo Print</Label>
      </div>
    </>
  );
}
