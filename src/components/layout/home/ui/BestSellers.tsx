"use client";
import Image from "next/image";
import Link from "next/link";

import { ShoppingBag, Star, Heart } from "lucide-react"; // 2. Ajout de Heart
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";

export default function BestSellers() {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  // 3. Logique des favoris (on stocke les IDs aimés)
  // const [favorites, setFavorites] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/products?best=true")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  if (loading) {
    return <section className="py-24 bg-white"> Chargement...</section>;
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-gold-600 font-medium tracking-[0.2em] uppercase text-xs mb-3 block">
            Sélection Exclusive
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
            Nos Meilleures <span className="italic">Ventes</span>
          </h2>
          <div className="w-20 h-[1px] bg-gold-500 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => {
            // const isFavorite = favorites.includes(product.id);

            return (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 rounded-sm mb-6">
                  <Image
                    src={product.imageMain}
                    alt={product.nameFr}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* 4. LE COEUR (Bouton Favoris) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product); // On envoie l'objet produit complet
                    }}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm"
                  >
                    <Heart
                      size={18}
                      className={
                        isFavorite(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-stone-400"
                      }
                    />
                  </button>

                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm z-10">
                    <div className="flex items-center gap-1">
                      <Star size={10} className="fill-gold-500 text-gold-500" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-stone-800">
                        Best Seller
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => addToCart({ ...product, quantity: 1 })}
                      className="bg-white text-stone-900 px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl font-bold text-xs uppercase tracking-wider"
                    >
                      <ShoppingBag size={16} /> Ajouter
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-serif text-stone-800 mb-2 group-hover:text-gold-600 transition-colors">
                    {product.nameFr}
                  </h3>
                  <p className="text-gold-600 font-bold tracking-wider italic text-sm">
                    {Number(product.price).toFixed(3)} DT
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
