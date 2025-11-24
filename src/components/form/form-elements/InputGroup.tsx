"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";
import Input from "../input/InputField";
import { db, storage } from "@/lib/firebaseClient";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface ProductFormData {
  fruitType: string;
  brand: string;
  size: string;
  price: string;
  quantity: string;
  trayColor: string;
  file: File | null;
}

export default function InputGroup() {
  const [products, setProducts] = useState<ProductFormData[]>([
    { fruitType: "", brand: "", size: "", price: "", quantity: "", trayColor: "", file: null },
  ]);
  const [loading, setLoading] = useState(false);

  // Update a field for a specific product
  const handleChange = <K extends keyof ProductFormData>(
    index: number,
    field: K,
    value: ProductFormData[K]
  ) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  // Add new product form container
  const addProductForm = () => {
    setProducts([
      ...products,
      { fruitType: "", brand: "", size: "", price: "", quantity: "", trayColor: "", file: null },
    ]);
  };

  // Remove a product form container
  const removeProductForm = (index: number) => {
    if (products.length === 1) return; // prevent removing last
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  // Save all products to Firebase
  const handleSaveAll = async () => {
    setLoading(true);
    try {
      for (const product of products) {
        let fileURL = "";
        if (product.file) {
          const storageRef = ref(storage, `products/${Date.now()}-${product.file.name}`);
          await uploadBytes(storageRef, product.file);
          fileURL = await getDownloadURL(storageRef);
        }

        await addDoc(collection(db, "products"), {
          fruitType: product.fruitType,
          brand: product.brand,
          size: product.size,
          price: Number(product.price),
          quantity: Number(product.quantity),
          trayColor: product.trayColor || null,
          imageURL: fileURL || null,
          createdAt: new Date(),
        });
      }

      alert("All products saved successfully!");
      // Reset the form
      setProducts([
        { fruitType: "", brand: "", size: "", price: "", quantity: "", trayColor: "", file: null },
      ]);
    } catch (error) {
      console.error("Error saving products:", error);
      alert("Failed to save products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard title="Add new products">
      <div className="space-y-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="border p-5 rounded-xl bg-gray-50 dark:bg-white/[0.03] relative"
          >
            {products.length > 1 && (
              <button
                onClick={() => removeProductForm(index)}
                type="button"
                className="absolute top-3 right-3 text-red-600 font-bold hover:text-red-800"
              >
                ✕
              </button>
            )}

            <h3 className="font-semibold mb-4">Product {index + 1}</h3>

            <div className="space-y-6">
              <div className="lg:flex-row items-center gap-5 flex flex-col">
                <div className="relative w-full">
                  <Label>Fruit Type</Label>
                  <Input
                    placeholder="e.g. Apple"
                    type="text"
                    value={product.fruitType}
                    onChange={(e) => handleChange(index, "fruitType", e.target.value)}
                  />
                </div>

                <div className="relative w-full">
                  <Label>Brand</Label>
                  <Input
                    placeholder="Brand name"
                    type="text"
                    value={product.brand}
                    onChange={(e) => handleChange(index, "brand", e.target.value)}
                  />
                </div>
              </div>

              <div className="lg:flex-row items-center gap-5 flex flex-col">
                <div className="relative w-full">
                  <Label>Size</Label>
                  <Input
                    placeholder="Size"
                    type="text"
                    value={product.size}
                    onChange={(e) => handleChange(index, "size", e.target.value)}
                  />
                </div>

                <div className="relative w-full">
                  <Label>Price</Label>
                  <Input
                    placeholder="Price"
                    type="number"
                    value={product.price}
                    onChange={(e) => handleChange(index, "price", e.target.value)}
                  />
                </div>

                <div className="relative w-full">
                  <Label>Quantity</Label>
                  <Input
                    placeholder="Quantity"
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleChange(index, "quantity", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>
                  Tray Color <i>(Optional)</i>
                </Label>
                <Input
                  placeholder="Tray color"
                  type="text"
                  value={product.trayColor}
                  onChange={(e) => handleChange(index, "trayColor", e.target.value)}
                />
              </div>

              <div>
                <Label>Upload File</Label>
                <FileInput
                  onChange={(e) => handleChange(index, "file", e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addProductForm}
          type="button"
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold"
        >
          + Add Another Product
        </button>

        <button
          onClick={handleSaveAll}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold mt-4"
        >
          {loading ? "Saving..." : "Save All Products"}
        </button>
      </div>
    </ComponentCard>
  );
}
