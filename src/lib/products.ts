export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Cotton Tee",
    price: 19.99,
    image: "/images/organic-crew.jpeg",
    colors: ["White", "Black", "Navy"],
    description: "Soft premium cotton, perfect for all-day comfort.",
  },
  {
    id: 2,
    name: "Organic Crew Neck",
    price: 24.99,
    image: "/images/premium-cotton.jpeg",
    colors: ["White", "Heather Gray"],
    description: "Eco-friendly organic cotton crew neck.",
  },
];
