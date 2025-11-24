"use client";

import { useSearchParams } from "next/navigation";

export default function TransactionDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Transaction Details</h1>
      <p className="mt-3">Transaction ID: {id}</p>
    </div>
  );
}
