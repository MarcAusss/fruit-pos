"use client";
import { useState } from "react";
import POSItemList from "./components/POSItemList";
import POSCart from "./components/POSCart";
import { items, Item, CartItem } from "./components/data";

const brands = ["All", "Apple", "Orange", "Banana", "Mango", "Berry"];

export default function POSPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Item) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item: Item) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((cartItem) => cartItem.id !== item.id);
      }
      return prev.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Brand Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {brands.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedBrand(cat)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              selectedBrand === cat
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Items */}
        <div className="lg:col-span-2">
          <POSItemList
            items={items}
            selectedBrand={selectedBrand}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </div>

        {/* Right: Cart */}
        <POSCart cart={cart} />
      </div>
    </div>
  );
}
