"use client";
import Link from "next/link";
import { Search, Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function Navbar() {
  const { totalPrice, cart } = useCart();
  const { favorites } = useFavorites();
  const favCount = favorites.length;

  // Calcul du nombre total d'articles
  const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Image
              src="/logo.png"
              alt="Logo Hlou Chahrazad"
              width={180}
              height={150}
              priority
            />
          </div>
        </Link>

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

        <div className="flex items-center gap-5 text-stone-800">
          <Link
            href="/register"
            className="p-2 hover:bg-stone-100 rounded-full relative group"
          >
            <p className="text-sm font-medium text-stone-600 group-hover:text-stone-800 transition-colors">
              S&apos;inscrire/Se connecter
            </p>
          </Link>
          <button className="p-2 hover:bg-stone-100 rounded-full">
            <Search size={22} />
          </button>

          <Link
            href="/favoris"
            className="p-2 hover:bg-stone-100 rounded-full relative group"
          >
            <Heart
              size={22}
              className={`transition-colors ${favCount > 0 ? "fill-red-500 text-red-500" : "text-stone-600"}`}
            />

            {/* On n'affiche le badge que s'il y a au moins 1 favori */}
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white text-white font-bold animate-in zoom-in">
                {favCount}
              </span>
            )}
          </Link>
          {/* AJOUT DU TOTAL ET FIX DU BADGE ICI */}
          <Link
            href="/panier"
            className="group relative flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-full hover:bg-stone-800 transition-all"
          >
            <ShoppingBag size={20} className="text-gold-400" />

            {/* Affichage du prix total - On s'assure qu'il n'est pas nul */}
            <span className="font-bold text-sm">
              {totalPrice > 0 ? `${totalPrice.toFixed(3)} DT` : "0.000 DT"}
            </span>

            {/* Badge du nombre d'articles */}
            {itemsCount > 0 && (
              <span className="absolute -top-2 -right-1 bg-gold-600 text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white text-white font-bold animate-in zoom-in">
                {itemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
