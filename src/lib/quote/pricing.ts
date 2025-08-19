import { Finishing, Location, RushKey, ServiceKey } from "./types";
import { round2, safeUUID } from "./utils";
export const pricingRules = {
base: {
screen: 2.0,
embroideryPerThousand: 0.9,
dtg: 6.0,
dtf: 5.0,
vinylPerSqIn: 0.15,
digitalPerSqIn: 0.2,
stickerPerSqIn: 0.12,
},
qtyMultipliers: [
{ min: 1, factor: 1.0 },
{ min: 25, factor: 0.95 },
{ min: 50, factor: 0.9 },
{ min: 100, factor: 0.85 },
{ min: 250, factor: 0.8 },
{ min: 500, factor: 0.75 },
],
garmentColorUpcharge: { white: 0, color: 0.25 },
inkColorsUpcharge: (n: number) => Math.max(0, n - 1) * 0.35,
specialty: {
metallicInk: 0.25,
jumboPrint: 0.4,
puffThread: 0.35,
},
finishing: {
fold: 0.15,
polybag: 0.25,
hangTag: 0.2,
stickerApply: 0.1,
},
rush: { none: 0, d4: 0.05, d3: 0.1, d2: 0.2, d1: 0.35 } as Record<RushKey, number>,
setup: { screenPerColor: 15, embroideryDigitizing: 30 },
};
export function qtyFactor(qty: number) {
let f = 1.0;
for (const t of pricingRules.qtyMultipliers) if (qty >= t.min) f = t.factor;
return f;
}


export function defaultFinishing(): Finishing {
return { fold: false, polybag: false, hangTag: false, stickerApply: false };
}


export function newLocation(seed = "Front"): Location {
return {
id: safeUUID(),
name: seed,
quantity: 24,
inkColors: 1,
garmentColor: "white",
metallicInk: false,
jumbo: false,
stitchCount: 5,
digitizing: false,
puffThread: false,
areaSqIn: 12,
finishing: defaultFinishing(),
};
}

export function priceLocation(service: ServiceKey, loc: Location) {
const q = Math.max(0, loc.quantity || 0);
const qFactor = qtyFactor(q);
let perItem = 0;
let setupFees = 0;

switch (service) {
case "screen": {
const colors = Math.max(1, loc.inkColors || 1);
perItem = pricingRules.base.screen;
perItem += pricingRules.garmentColorUpcharge[loc.garmentColor || "white"];
perItem += pricingRules.inkColorsUpcharge(colors);
if (loc.metallicInk) perItem += pricingRules.specialty.metallicInk;
if (loc.jumbo) perItem += pricingRules.specialty.jumboPrint;
setupFees += colors * pricingRules.setup.screenPerColor;
break;
}
case "embroidery": {
const stitches = Math.max(1, loc.stitchCount || 5);
perItem = stitches * pricingRules.base.embroideryPerThousand;
if (loc.puffThread) perItem += pricingRules.specialty.puffThread;
if (loc.digitizing) setupFees += pricingRules.setup.embroideryDigitizing;
break;
}
case "dtg": {
perItem = pricingRules.base.dtg;
if (loc.jumbo) perItem += pricingRules.specialty.jumboPrint;
break;
}
case "dtf": {
perItem = pricingRules.base.dtf;
if (loc.jumbo) perItem += pricingRules.specialty.jumboPrint;
break;
}
case "vinyl": {
const area = Math.max(1, loc.areaSqIn || 12);
perItem = area * pricingRules.base.vinylPerSqIn;
break;
}
case "digital": {
const area = Math.max(1, loc.areaSqIn || 12);
perItem = area * pricingRules.base.digitalPerSqIn;
break;
}
case "stickers": {
const area = Math.max(1, loc.areaSqIn || 12);
perItem = area * pricingRules.base.stickerPerSqIn;
break;
}
}


// finishing adds per item
if (loc.finishing.fold) perItem += pricingRules.finishing.fold;
if (loc.finishing.polybag) perItem += pricingRules.finishing.polybag;
if (loc.finishing.hangTag) perItem += pricingRules.finishing.hangTag;
if (loc.finishing.stickerApply) perItem += pricingRules.finishing.stickerApply;


const subtotal = perItem * q * qFactor;
const total = subtotal + setupFees;


return {
perItem: round2(perItem * qFactor),
setupFees: round2(setupFees),
quantity: q,
lineTotal: round2(total),
};
}