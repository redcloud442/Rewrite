"use client";

import Faq from "@/components/LandingPage/Faq";
import Feature from "@/components/LandingPage/Feature";
import HeroBanner from "@/components/LandingPage/HeroBanner";
import MetricsSection from "@/components/LandingPage/MetricsSection";
import MissionVision from "@/components/LandingPage/MissionVision";
import Pricing from "@/components/LandingPage/Pricing";
import Footer from "@/components/LandingPage/footer";
export default function LandingPage() {
  return (
    <main className="space-y-32py-16 bg-background text-foreground">
      {/* Hero Section */}
      <HeroBanner />
      <MetricsSection />
      <Feature />
      <Pricing />
      <MissionVision />
      <Faq />
      <Footer />
    </main>
  );
}
