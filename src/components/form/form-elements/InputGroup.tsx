"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";
import Input from "../input/InputField";

export default function InputGroup() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <ComponentCard title="Add new products">
      <form>
        <div className="space-y-6">
          <div className="lg:flex-row items-center gap-5 flex flex-col">
            <div className="relative w-full">
              <Label>Fruit Type</Label>
              <Input placeholder="info@gmail.com" type="text" />
              {/* use select at form components */}
            </div>
            <div className="relative w-full">
              <Label>Brand</Label>
              <Input placeholder="info@gmail.com" type="email" />
            </div>
          </div>
          <div className="lg:flex-row items-center gap-5 flex flex-col">
            <div className="relative w-full">
              <Label>Size</Label>
              <Input placeholder="info@gmail.com" type="number" />
            </div>
            <div className="relative w-full">
              <Label>Price</Label>
              <Input placeholder="info@gmail.com" type="number" />
            </div>
            <div className="relative w-full">
              <Label>Quantity</Label>
              <Input placeholder="info@gmail.com" type="number" />
            </div>
          </div>
          <div>
            <Label>
              Tray Color <i>(Optional)</i>
            </Label>
            <Input placeholder="info@gmail.com" type="email" />
          </div>
          <div>
            <Label>Upload file</Label>
            <FileInput onChange={handleFileChange} className="custom-class" />
          </div>
        </div>
      </form>
    </ComponentCard>
  );
}
