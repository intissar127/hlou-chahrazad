"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/actions/order";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart(); // ✅ assure-toi que clearCart existe dans CartContext
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const result = await createOrder({
      customerName: formData.get("name") as string,
      customerPhone: formData.get("phone") as string,
      shippingAddress: formData.get("address") as string,
      city: formData.get("city") as string,
      items: cart,
      totalAmount: totalPrice,
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    clearCart();
    router.push(`/merci?order=${result.orderId}`);
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-stone-400">Votre panier est vide.</p>
      </div>
    );
  }

  return (
    <main className="py-24 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-serif mb-8 text-stone-900">
          Finaliser la commande
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-stone-100"
        >
          <div>
            <label className="text-sm font-medium text-stone-700">
              Nom complet
            </label>
            <input
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700">
              Téléphone
            </label>
            <input
              name="phone"
              type="tel"
              required
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl"
              placeholder="+216 ..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700">
              Adresse de livraison
            </label>
            <input
              name="address"
              required
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl"
              placeholder="Rue, numéro..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700">Ville</label>
            <input
              name="city"
              required
              className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl"
              placeholder="Tunis, Sousse..."
            />
          </div>

          {/* Récapitulatif */}
          <div className="border-t border-stone-100 pt-4 space-y-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm text-stone-600"
              >
                <span>
                  {item.nameFr} × {item.quantity}
                </span>
                <span>
                  {(Number(item.price) * item.quantity).toFixed(3)} DT
                </span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-100">
              <span>Total</span>
              <span>{totalPrice.toFixed(3)} DT</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-600 hover:bg-gold-500 text-white py-4 rounded-full font-bold uppercase text-xs tracking-widest transition-all disabled:opacity-50"
          >
            {loading
              ? "Traitement..."
              : "Confirmer la commande (Paiement à la livraison)"}
          </button>
        </form>
      </div>
    </main>
  );
}
