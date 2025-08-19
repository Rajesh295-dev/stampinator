export type ServiceKey =
| "screen"
| "embroidery"
| "dtg"
| "dtf"
| "vinyl"
| "digital"
| "stickers";


export type RushKey = "none" | "d4" | "d3" | "d2" | "d1";


export type Finishing = {
fold: boolean;
polybag: boolean;
hangTag: boolean;
stickerApply: boolean;
};


export type Location = {
id: string;
name: string; // Front, Back, Sleeve
quantity: number;
// screen
inkColors?: number;
garmentColor?: "white" | "color";
metallicInk?: boolean;
jumbo?: boolean;
// embroidery
stitchCount?: number; // thousands
digitizing?: boolean;
puffThread?: boolean;
// area-based services
areaSqIn?: number;
// finishing
finishing: Finishing;
};