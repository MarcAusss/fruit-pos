"use client";

import InteractiveFruitsCanvas from "@/components/InteractiveFruitsCanvas";
import { useRouter } from "next/navigation"; // ✅ import the hook
import { Button } from "@/components/ui/button"; // make sure Button is imported

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <InteractiveFruitsCanvas />
      <div className="absolute z-10 text-center">
        <h1 className="mb-6 text-6xl font-bold text-white">
          Mayeth&lsquo;s Fruit Stand
        </h1>
        <p className="text-xl text-white mb-8 max-w-md mx-auto">
          Fruits whole sale
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => router.push("/auth/login")}
            className="bg-gradient-primary hover:opacity-90 transition-opacity px-5 py-3"
          >
            Sign In
          </Button>
          <Button
            onClick={() => router.push("/auth/register")}
            variant="outline"
            className="backdrop-blur-sm bg-background/50 px-5 py-3"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
