"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter(); // ✅ Hook inside component

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-bg animate-gradient bg-[length:200%_200%]">
      <div className="text-center animate-fade-in">
        <h1 className="mb-6 text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Welcome
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          Experience modern authentication with beautiful animations
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => router.push("/auth/login")} // ✅ use router.push
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Sign In
          </Button>
          <Button
            onClick={() => router.push("/auth/register")} // ✅ use router.push
            variant="outline"
            className="backdrop-blur-sm bg-background/50"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
