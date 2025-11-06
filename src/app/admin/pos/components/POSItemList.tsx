"use client";
import Image from "next/image";
import { Item, CartItem } from "./data";

interface POSItemListProps {
  items: Item[];
  selectedBrand: string;
  cart: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
}

export default function POSItemList({
  items,
  selectedBrand,
  cart,
  addToCart,
  removeFromCart,
}: POSItemListProps) {
  const filteredItems =
    selectedBrand === "All"
      ? items
      : items.filter((item) => item.brand === selectedBrand);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {filteredItems.map((item) => {
        const cartItem = cart.find((c) => c.id === item.id);
        const quantity = cartItem ? cartItem.quantity : 0;

        return (
          <div
            key={item.id}
            className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-32 mb-2">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <h3 className="text-gray-800 font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
            <p className="text-green-700 font-medium mb-3">₱{item.price}</p>

            {/* Add / Remove Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => removeFromCart(item)}
                className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-200"
              >
                −
              </button>
              <span className="text-gray-800 font-semibold">{quantity}</span>
              <button
                onClick={() => addToCart(item)}
                className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-200"
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
