"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceKey } from "@/lib/quote/types";


export default function ServiceTabs({ service, onChange }: { service: ServiceKey; onChange: (v: ServiceKey) => void }) {
return (
<Tabs value={service} onValueChange={(v) => onChange(v as ServiceKey)}>
 {/* <TabsList className="grid grid-cols-3 sm:grid-cols-7 md:grid-cols-7 w-full">

{(["screen","embroidery","dtg","dtf","vinyl","digital","stickers"] as ServiceKey[]).map((k) => (
<TabsTrigger key={k} value={k}>{k.charAt(0).toUpperCase()+k.slice(1)}</TabsTrigger>
))} 
</TabsList> */}
{/* <TabsList className="grid h-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 p-1 w-full">
  {(["screen","embroidery","dtg","dtf","vinyl","digital","stickers"] as ServiceKey[]).map((k) => (
    <TabsTrigger
      key={k}
      value={k}
      className="w-full text-xs sm:text-sm"  // fit better on small screens
    >
      {k.charAt(0).toUpperCase() + k.slice(1)}
    </TabsTrigger>
  ))}
</TabsList> */}

<TabsList className="flex flex-wrap gap-2 p-2 h-auto w-full bg-neutral-900 rounded-lg">
  {(
    ["screen","embroidery","dtg","dtf","vinyl","digital","stickers"] as ServiceKey[]
  ).map((k) => (
    <TabsTrigger
      key={k}
      value={k}
      className="flex-1 sm:flex-none text-xs sm:text-sm text-white rounded-md 
                 data-[state=active]:bg-emerald-500 data-[state=active]:text-black"
    >
      {k.charAt(0).toUpperCase() + k.slice(1)}
    </TabsTrigger>
  ))}
</TabsList>


{/* Optional: <TabsContent value={service} /> */}
</Tabs>
);
}