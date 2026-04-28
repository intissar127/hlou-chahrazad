"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Coffret Royal",
    price: "85.000 DT",
    category: "Assortiment",
    image: "/images/products/coffret-1.jpg",
  },
  {
    id: 2,
    name: "Mignardises Pistache",
    price: "45.000 DT",
    category: "Spécialités",
    image: "/images/products/coffret-2.jpg",
  },
  {
    id: 3,
    name: "Kaak Warka d'Or",
    price: "60.000 DT",
    category: "Tradition",
    image: "/images/products/coffret-3.jpg",
  },
  {
    id: 4,
    name: "Coffret Prestige Mixte",
    price: "120.000 DT",
    category: "Édition Limitée",
    image: "/images/products/coffret-4.jpg",
  },
];

export default function BestSellers() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <span className="text-gold-600 font-medium tracking-[0.2em] uppercase text-xs mb-3 block">
            Sélection Exclusive
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
            Nos Meilleures <span className="italic">Ventes</span>
          </h2>
          <div className="w-20 h-[1px] bg-gold-500 mx-auto mt-6"></div>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image avec Overlay au hover */}
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 rounded-sm mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badge Best Seller */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm z-10">
                  <div className="flex items-center gap-1">
                    <Star size={10} className="fill-gold-500 text-gold-500" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-stone-800">
                      Best Seller
                    </span>
                  </div>
                </div>

                {/* Bouton rapide au survol */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-stone-900 px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl font-bold text-xs uppercase tracking-wider">
                    <ShoppingBag size={16} />
                    Ajouter
                  </button>
                </div>
              </div>

              {/* Infos Produit */}
              <div className="text-center">
                <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">
                  {product.category}
                </p>
                <h3 className="text-lg font-serif text-stone-800 mb-2 group-hover:text-gold-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gold-600 font-bold tracking-wider italic text-sm">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton Voir Tout */}
        <div className="mt-20 text-center">
          <Link
            href="/coffrets"
            className="inline-block border-b-2 border-stone-900 pb-1 text-sm font-bold uppercase tracking-widest hover:text-gold-600 hover:border-gold-600 transition-all"
          >
            Découvrir toute la collection
          </Link>
        </div>
      </div>
    </section>
  );
}
