import { OnboardingSidebar } from "@/components/Layout/OnboardingLayout/OnboardingLayout";
import { PageTransition } from "@/components/Layout/PageTransition/PageTransition";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Onboarding | Rewrite AI",
  description: "Onboarding",
};

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if ((await auth()).sessionClaims?.metadata.onboardingComplete === true) {
    redirect("/app");
  }

  return (
    <PageTransition>
      {" "}
      <header
        className={`block top-0 inset-x-0 z-50 bg-background/80 backdrop-blur border-b border-border`}
      >
        <div className=" mx-auto flex items-center justify-between px-6 md:px-12 h-16">
          {/* Left: Logo / Brand */}
          <Link
            href="/"
            className="font-extrabold text-2xl tracking-tight text-red-600"
          >
            Rewrite
          </Link>

          {/* Right: Auth Buttons */}
          <UserButton />
        </div>
      </header>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "250px",
          } as React.CSSProperties
        }
      >
        <OnboardingSidebar />

        <section className="relative p-4 w-full">{children}</section>
      </SidebarProvider>
    </PageTransition>
  );
}
