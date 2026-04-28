// components/layout/Navbar.tsx
"use client"; // Obligatoire car on va gérer le scroll et le menu mobile
import Link from "next/link";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center">
            {/* <span className="text-gold-500 font-serif text-xl">C</span> 
          </div> */}
          <div className="hidden sm:block">
            <Image
              src="/logo.png"
              alt="Logo Hlou Chahrazad"
              width={180}
              height={150}
              // Empêche le logo d'être écrasé
              priority // Indique à Next.js de charger le logo immédiatement (LCP)
            />
          </div>
        </Link>

        {/* MENU CENTRAL (Lisible et espacé) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600 uppercase tracking-wide">
          <Link
            href="/"
            className="text-gold-600 border-b-2 border-gold-600 pb-1"
          >
            Accueil
          </Link>
          <Link
            href="/coffrets"
            className="hover:text-gold-600 transition-colors"
          >
            Nos Coffrets
          </Link>
          <Link
            href="/a-propos"
            className="hover:text-gold-600 transition-colors"
          >
            À Propos
          </Link>
          <Link
            href="/contact"
            className="hover:text-gold-600 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* ACTIONS (Icones larges pour l'accessibilité) */}
        <div className="flex items-center gap-5 text-stone-800">
          <button className="p-2 hover:bg-stone-100 rounded-full">
            <Search size={22} />
          </button>
          <Link
            href="/favoris"
            className="p-2 hover:bg-stone-100 rounded-full relative"
          >
            <Heart size={22} />
          </Link>
          <Link
            href="/panier"
            className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-full hover:bg-stone-800 transition-all"
          >
            <ShoppingBag size={20} className="text-gold-400" />
            <span className="font-bold text-sm">0.000 DT</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
