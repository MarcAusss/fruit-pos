"use client";

import InteractiveFruitsCanvas from "@/components/InteractiveFruitsCanvas";
import { useRouter } from "next/navigation"; // ✅ import the hook
import { Button } from "@/components/ui/button"; // make sure Button is imported
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <InteractiveFruitsCanvas />
      <div className="absolute z-10 text-center">
        <Image width={231} height={48} src="/images/logo/main.png" alt="Logo" className="w-96 h-52 mb-10"/>
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
