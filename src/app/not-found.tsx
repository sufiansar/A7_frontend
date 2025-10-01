"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#363636] px-4 text-white">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-8xl md:text-[10rem] font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold">Page Not Found</h2>
        <p className="text-gray-300">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been removed or the URL is incorrect.
        </p>

        <div className="mt-6">
          <Button
            asChild
            className="bg-primary text-white hover:bg-primary/90 transform hover:scale-105 transition-transform"
          >
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
