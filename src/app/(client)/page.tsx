// import HeroSection from "@/components/home/HeroSection";
// import BestSellers from "@/components/home/BestSellers";
// import WhyUs from "@/components/home/WhyUs";
// import Reviews from "@/components/home/Reviews";
// import FeaturesBar from "@/components/home/FeaturesBar";
// src/app/(client)/page.tsx

import BestSellers from "@/components/layout/home/ui/BestSellers";
import CategorySidebar from "@/components/layout/home/ui/CategorySidebar";
import FeaturesBar from "@/components/layout/home/ui/FeaturesBar";
import Footer from "@/components/layout/home/ui/Footer";
import HeroSection from "@/components/layout/home/ui/HeroSection";
import ImmersiveExperience from "@/components/layout/home/ui/ImmersiveExperience";
import PromoSection from "@/components/layout/home/ui/PromoSection";
import Reviews from "@/components/layout/home/ui/Reviews";
import WhatsAppButton from "@/components/layout/home/ui/WhatsAppButton";

// 1. SUPPRIME l'import de la Navbar ici
// import Navbar from "@/components/layout/home/ui/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section (On l'activera après) */}
      {/* <CategorySidebar /> */}
      <HeroSection />
      <FeaturesBar />
      <BestSellers />
      <WhatsAppButton />
      <PromoSection />
      <ImmersiveExperience />
      <Reviews />
      <Footer />
    </main>
  );
}
