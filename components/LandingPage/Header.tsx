"use client";

import { Button } from "@/components/ui/button";
import { SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../SetTheme/SetTheme";

const Header = () => {
  const { user } = useUser();

  return (
    <>
      <SignedOut>
        <header
          className={`top-0 inset-x-0 z-50 bg-background/80 backdrop-blur border-b border-border ${
            user ? "block" : "fixed"
          }`}
        >
          <div className=" mx-auto flex items-center justify-between px-6 md:px-12 h-16">
            {/* Left: Logo / Brand */}
            <Link
              href="/"
              className="font-extrabold text-2xl tracking-tight text-red-600"
            >
              SummarizeAI
            </Link>

            {/* Right: Auth Buttons */}
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
              <ModeToggle />
            </div>
          </div>
        </header>
      </SignedOut>
    </>
  );
};

export default Header;
