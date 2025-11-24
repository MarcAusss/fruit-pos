export type Item = {
  id: number;
  name: string;
  brand: string;
  size: number;
  img: string;
  price: number;
  quantity: number;
};

export type CartItem = Item & { quantity: number };

export const items: Item[] = [
  { id: 1, name: "Apple", brand: "Apple", img: "/fruits/red-apple.png", price: 25, size: 20, quantity: 20 },
  { id: 2, name: "Banana", brand: "Banana", img: "/fruits/banana.png", price: 1522, size: 20, quantity: 20 },
  { id: 3, name: "Orange", brand: "Orange", img: "/fruits/orange.webp", price: 10, size: 20, quantity: 20 },
  { id: 4, name: "Mango", brand: "Mango", img: "/fruits/mango.png", price: 30, size: 20, quantity: 20 },
  { id: 5, name: "Strawberry", brand: "Berry", img: "/fruits/strewberry.png", price: 20, size: 20, quantity: 20 },
];
