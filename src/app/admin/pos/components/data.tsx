export type Item = {
  id: number;
  name: string;
  brand: string;
  img: string;
  price: number;
};

export type CartItem = Item & { quantity: number };

export const items: Item[] = [
  { id: 1, name: "Apple", brand: "Apple", img: "/fruits/red-apple.png", price: 25 },
  { id: 2, name: "Banana", brand: "Banana", img: "/fruits/banana.png", price: 15 },
  { id: 3, name: "Orange", brand: "Orange", img: "/fruits/orange.webp", price: 10 },
  { id: 4, name: "Mango", brand: "Mango", img: "/fruits/mango.png", price: 30 },
  { id: 5, name: "Strawberry", brand: "Berry", img: "/fruits/strewberry.png", price: 20 },
];
