"use client";
import { useState } from "react";
import { X, Mail, Phone, MapPin } from "lucide-react"; // Importe les icônes de contact
import HeroSection from "@/components/layout/home/ui/HeroSection";
import FeaturesBar from "@/components/layout/home/ui/FeaturesBar";
import BestSellers from "@/components/layout/home/ui/BestSellers";
import CategorySidebar from "@/components/layout/home/ui/CategorySidebar";
import PromoSection from "@/components/layout/home/ui/PromoSection";
import Reviews from "@/components/layout/home/ui/Reviews";
import WhatsAppButton from "@/components/layout/home/ui/WhatsAppButton";
import Footer from "@/components/layout/home/ui/Footer";
import SidebarTrigger from "@/components/layout/home/ui/SidebarTrigger"; // Importe ton nouveau bouton

export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white relative">
      {/* 1. ZONE NAVBAR D'INTÉGRATION */}
      {/* NOTE : Intègre <SidebarTrigger /> DANS ton composant Navbar existant. */}
      {/* Pour le test, je le place ici en overlay subtil en haut à gauche. */}
      <div className="fixed top-28 left-6 md:left-12 z-[55] bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-sm border border-stone-100">
        <SidebarTrigger onClick={() => setIsDrawerOpen(true)} />
      </div>

      {/* 2. LE DRAWER ÉLÉGANT (L'ancienne sidebar transformée) */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-[100] w-full sm:w-[320px] bg-white h-screen flex flex-col 
        transform transition-transform duration-500 ease-[cubic-bezier(0.23, 1, 0.32, 1)] 
        border-r border-stone-100 shadow-2xl
        ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* En-tête du Drawer avec Logo et bouton Fermer */}
        <div className="flex items-center justify-between p-8 border-b border-stone-100 mb-6">
          <h2 className="text-xl font-serif text-stone-900">
            Hlou <span className="text-gold-600">Chahrazad</span>
          </h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-stone-400 hover:text-gold-600 transition-colors p-2"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Le contenu existant de ta sidebar */}
        <div className="flex-1 px-8 space-y-12">
          <CategorySidebar />
        </div>

        {/* Un petit footer de contact en bas du Drawer */}
        <div className="p-8 border-t border-stone-100 text-stone-500 space-y-4">
          <h4 className="text-[10px] uppercase font-bold tracking-widest text-gold-600">
            Nous Contacter
          </h4>
          <div className="flex items-center gap-3 text-sm">
            <MapPin size={16} className="shrink-0 text-stone-400" />
            <span>Moknine, Tunisie</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="shrink-0 text-stone-400" />
            <span>contact@hlou.tn</span>
          </div>
        </div>
      </aside>

      {/* 3. L'OVERLAY DE FOND (Grisé et flouté au survol) */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[95] transition-opacity duration-300"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* 4. ZONE DE CONTENU PRINCIPALE (Aérée et fluide) */}
      <main className="flex flex-col min-w-0">
        <HeroSection />
        <FeaturesBar />

        {/* Plus de colonnes Flex, juste un container simple */}
        <div className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <BestSellers />
          </div>
        </div>

        <PromoSection />
        <Reviews />
        <Footer />
        <WhatsAppButton />
      </main>
    </div>
  );
}
