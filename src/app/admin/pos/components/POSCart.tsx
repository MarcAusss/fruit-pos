"use client";
import { CartItem } from "./data";

interface POSCartProps {
  cart: CartItem[];
}

export default function POSCart({ cart }: POSCartProps) {
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-md h-fit sticky top-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">🛒 Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 italic text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ₱{item.price} × {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-green-700">
                ₱{item.price * item.quantity}
              </p>
            </div>
          ))}

          <hr className="my-3" />

          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span className="text-green-700">₱{totalAmount}</span>
          </div>

          <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
