"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/actions/product";

interface EditProductFormProps {
  product: {
    id: number;
    nameFr: string;
    descriptionFr: string;
    price: number;
    imageMain: string | null;
    categoryId: number;
  };
  categories: { id: number; nameFr: string }[];
}

export default function EditProductForm({
  product,
  categories,
}: EditProductFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    // Appel de ton action serveur avec l'ID lié
    const result = await updateProduct(product.id, formData);

    if (result && "error" in result) {
      setError(result.error ?? "Une erreur est survenue.");
      setLoading(false);
    } else {
      // Redirection et rafraîchissement des données du dashboard global
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* Nom du produit */}
        <div>
          <label className="text-xs font-bold uppercase text-stone-700 tracking-wider">
            Nom de la pâtisserie (Fr)
          </label>
          <input
            name="nameFr"
            type="text"
            required
            defaultValue={product.nameFr}
            className="mt-2 block w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 focus:outline-none focus:border-stone-900 text-sm transition-colors"
          />
        </div>

        {/* Prix Kilo */}
        <div>
          <label className="text-xs font-bold uppercase text-stone-700 tracking-wider">
            Prix au Kilo (DT)
          </label>
          <input
            name="price"
            type="number"
            step="0.001"
            required
            defaultValue={product.price}
            className="mt-2 block w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 focus:outline-none focus:border-stone-900 text-sm transition-colors"
          />
        </div>

        {/* URL de l'image */}
        <div>
          <label className="text-xs font-bold uppercase text-stone-700 tracking-wider">
            URL de l&apos image principale
          </label>
          <input
            name="imageMain"
            type="text"
            defaultValue={product.imageMain || ""}
            placeholder="/images/gateaux/mon-gateau.jpg"
            className="mt-2 block w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 focus:outline-none focus:border-stone-900 text-sm transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-bold uppercase text-stone-700 tracking-wider">
            Description (Ingrédients, saveurs...)
          </label>
          <textarea
            name="descriptionFr"
            rows={4}
            defaultValue={product.descriptionFr}
            className="mt-2 block w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 focus:outline-none focus:border-stone-900 text-sm transition-colors resize-none"
          />
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end gap-4 pt-4 border-t border-stone-100">
        <button
          type="button"
          onClick={() => router.push("/admin/dashboard")}
          className="px-5 py-3 text-xs font-bold uppercase text-stone-500 hover:text-stone-800 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-colors shadow-md"
        >
          {loading ? "Enregistrement..." : "Sauvegarder les modifications"}
        </button>
      </div>
    </form>
  );
}
