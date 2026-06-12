"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  // Fonction pour diminuer la quantité (Logique spécifique)
  // Si qté > 1 on réduit, sinon on supprime
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-serif text-stone-800">
          Votre panier est vide
        </h2>
        <Link
          href="/"
          className="text-gold-600 border-b border-gold-600 pb-1 font-bold uppercase text-xs tracking-widest"
        >
          Retourner à la boutique
        </Link>
      </div>
    );
  }

  return (
    <main className="py-24 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* COLONNE GAUCHE : LISTE DES PRODUITS */}
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-serif mb-8 text-stone-900">
              Mon Panier
            </h1>

            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6 border border-stone-100"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.nameFr}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-stone-900">{item.nameFr}</h3>
                  <p className="text-stone-400 text-sm mb-4">
                    Prix unitaire : {Number(item.price).toFixed(3)} DT
                  </p>

                  {/* Contrôleur de quantité */}
                  <div className="flex items-center gap-4 bg-stone-50 w-fit rounded-full p-1 border border-stone-100">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:text-gold-600 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      className="p-2 hover:text-gold-600 transition-colors"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-between h-24">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-stone-300 hover:text-red-500 transition-colors self-end"
                  >
                    <Trash2 size={20} />
                  </button>
                  <p className="font-serif font-bold text-lg">
                    {Number(item.price * item.quantity).toFixed(3)} DT
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* COLONNE DROITE : RÉSUMÉ DE LA COMMANDE */}
          <aside className="w-full lg:w-[380px]">
            <div className="bg-stone-900 text-white p-8 rounded-3xl sticky top-32">
              <h2 className="text-xl font-serif mb-8">Résumé</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-stone-400 text-sm">
                  <span>Sous-total</span>
                  <span>{totalPrice.toFixed(3)} DT</span>
                </div>
                <div className="flex justify-between text-stone-400 text-sm">
                  <span>Livraison</span>
                  <span className="text-green-400 font-bold uppercase text-[10px]">
                    Gratuite
                  </span>
                </div>
                <div className="h-[1px] bg-stone-800 my-4"></div>
                <div className="flex justify-between items-end">
                  <span className="text-stone-400">Total TTC</span>
                  <span className="text-3xl font-serif text-gold-400">
                    {Number(totalPrice).toFixed(3)} DT
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block text-center w-full bg-gold-600 hover:bg-gold-500 text-white py-4 rounded-full font-bold uppercase text-xs tracking-widest transition-all shadow-lg shadow-gold-900/20"
              >
                Commander maintenant
              </Link>

              <p className="text-[10px] text-stone-500 text-center mt-6 uppercase tracking-tighter">
                Paiement sécurisé à la livraison en Tunisie
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
