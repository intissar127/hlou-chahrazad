"use client";

import { useFavorites } from "@/context/FavoritesContext"; // Assure-toi d'avoir un contexte similaire
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Heart } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="text-stone-300 animate-pulse">
          <Heart size={48} className="fill-stone-100" />
        </div>
        <h2 className="text-3xl font-serif text-stone-800">
          Votre liste de favoris est vide
        </h2>
        <Link
          href="/"
          className="text-amber-600 border-b border-amber-600 pb-1 font-bold uppercase text-xs tracking-widest hover:text-amber-700 hover:border-amber-700 transition-colors"
        >
          Découvrir nos douceurs
        </Link>
      </div>
    );
  }

  return (
    <main className="py-24 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* COLONNE GAUCHE : LISTE DES FAVORIS */}
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-serif mb-8 text-stone-900 flex items-center gap-3">
              Mes Coups de Cœur
            </h1>

            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6 border border-stone-100 transition-all hover:shadow-md"
              >
                {/* Image du produit */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                  <Image
                    src={item.imageMain || item.image} // S'adapte à ton modèle de données CSV ou Cart
                    alt={item.nameFr || item.nameAr}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Détails du produit */}
                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-widest text-amber-600 font-medium">
                    {item.category?.nameFr || "Pâtisserie"}
                  </span>
                  <h3 className="font-bold text-stone-900 text-lg mt-0.5">
                    {item.nameFr || item.nameAr}
                  </h3>
                  <p className="text-stone-500 font-serif mt-1 font-medium">
                    {Number(item.price).toFixed(3)} DT
                  </p>
                </div>

                {/* Actions à droite */}
                <div className="text-right flex flex-col justify-between h-24">
                  {/* Bouton Supprimer des favoris */}
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="text-stone-300 hover:text-red-500 transition-colors self-end p-1 hover:bg-stone-50 rounded-full"
                    title="Retirer des favoris"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Bouton Ajouter au panier direct */}
                  <button
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                  >
                    <ShoppingBag size={14} />
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* COLONNE DROITE : CARD DE CONVERSION LUXE */}
          <aside className="w-full lg:w-[380px]">
            <div className="bg-stone-900 text-white p-8 rounded-3xl sticky top-32">
              <h2 className="text-xl font-serif mb-4 text-amber-400">
                Une occasion spéciale ?
              </h2>
              <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                Transformez vos coups de cœur en un coffret personnalisé ou
                planifiez votre commande à l avance pour vos réceptions.
              </p>

              <div className="h-[1px] bg-stone-800 my-6"></div>

              <div className="space-y-3 text-xs text-stone-400 uppercase tracking-wide">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  <span>Fabrication artisanale sur commande</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  <span>Livraison sécurisée dans toute la Tunisie</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/"
                  className="block w-full text-center bg-transparent border border-stone-700 hover:border-amber-500 hover:text-amber-400 text-stone-300 py-4 rounded-full font-bold uppercase text-xs tracking-widest transition-all"
                >
                  Continuer mes achats
                </Link>
              </div>

              <p className="text-[9px] text-stone-500 text-center mt-6 uppercase tracking-widest">
                Hlou Shahrazed — L &apos art de la haute pâtisserie
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
