"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ Correction de l'import (Next.js 13+)
import { Product } from "@/types/product";
import { ArrowRight, ShoppingBag } from "lucide-react"; // Pour enrichir le design visuel



export default function ProductCard({ product }) {
  const router = useRouter();

  const handleOrderRedirect = () => {
    router.push(`/checkout?productId=${product.id}`);
  };

  return (
    <div 
      onClick={handleOrderRedirect} // ✅ La carte entière devient cliquable pour une meilleure ergonomie
      className="bg-white rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden flex flex-col h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
    >
      {/* Zone Image avec Conteneur Interactif */}
      <div className="relative h-72 w-full bg-stone-50 overflow-hidden m-2 rounded-[1.6rem] w-[calc(100%-1rem)]">
        {product.imageMain ? (
          <Image
            src={product.imageMain}
            alt={product.nameFr}
            fill
            sizes="(max-width: 1068px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400 font-serif italic bg-stone-50">
            Hlou Chahrazad 🍰
          </div>
        )}

        {/* Badge Moderne "Artisanal" discret sur l'image */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-stone-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
          Premium
        </div>
      </div>

      {/* Contenu Texte & Informations */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Titre du Produit */}
        <h3 className="font-serif text-2xl text-stone-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">
          {product.nameFr}
        </h3>
        
        {/* Description avec hauteur fluide */}
        <p className="text-stone-500 text-sm font-light leading-relaxed line-clamp-2 mb-6">
          {product.descriptionFr || "Une création artisanale d'exception, préparée selon nos traditions familiales."}
        </p>

        {/* Barre d'Action Basse Intelligente */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
          {/* Section Prix stylisée */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">Prix estimé</span>
            <span className="text-stone-1050 font-black text-xl tracking-tight">
              {Number(product.price).toFixed(3)} <span className="text-sm font-normal text-stone-500">DT</span>
            </span>
          </div>

          {/* Bouton Ultra-Interactif */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Évite le double déclenchement du clic sur la carte
              handleOrderRedirect();
            }}
            className="relative overflow-hidden flex items-center gap-2 bg-stone-900 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-widest pl-5 pr-4 py-3.5 rounded-2xl transition-all duration-300 shadow-md group/btn"
          >
            <span>Commander</span>
            {/* L'icône se décale de manière dynamique au survol du bouton */}
            <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}