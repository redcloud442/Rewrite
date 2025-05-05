"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;    
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 space-y-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>

      <Button
        onClick={() => reset()}
        className="px-4 py-2 rounded-md bg-primary text-white"
      >
        Try again
      </Button>
    </div>
  );
}
