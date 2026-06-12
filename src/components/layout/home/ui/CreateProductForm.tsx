"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/actions/product";

interface CategoryOption {
  id: number;
  nameFr: string;
}

interface CreateProductFormProps {
  categories: CategoryOption[];
}

export default function CreateProductForm({
  categories,
}: CreateProductFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    // Appel de l'action serveur native
    const result = await createProduct(formData);

    if (result && "error" in result) {
      setError(result.error);
      setLoading(false);
    } else {
      // Succès : Redirection vers le dashboard et mise à jour des listes
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
            Nom de la pâtisserie (Fr) *
          </label>
          <input
            name="nameFr"
            type="text"
            required
            placeholder="Ex: Kaak Warka aux amandes"
            className="mt-2 block w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 focus:outline-none focus:border-stone-900 text-sm transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-stone-700 tracking-wider">
            Nom de la pâtisserie (Ar) *
          </label>
          <input
            name="nameAr"
            type="text"
            required
            placeholder="Ex: Kaak Warka aux amandes"
            className="mt-2 block w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 focus:outline-none focus:border-stone-900 text-sm transition-colors"
          />
        </div>

        {/* Sélection de la Catégorie relationnelle */}
        <div>
          <label className="text-xs font-bold uppercase text-stone-700 tracking-wider">
            Gamme / Catégorie *
          </label>
          <select
            name="categoryId"
            required
            defaultValue=""
            className="mt-2 block w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 focus:outline-none focus:border-stone-900 text-sm transition-colors"
          >
            <option value="" disabled>
              -- Choisir une gamme --
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nameFr}
              </option>
            ))}
          </select>
        </div>

        {/* Prix Kilo */}
        <div>
          <label className="text-xs font-bold uppercase text-stone-700 tracking-wider">
            Prix au Kilo (DT) *
          </label>
          <input
            name="price"
            type="number"
            step="0.001"
            required
            placeholder="0.000"
            className="mt-2 block w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 focus:outline-none focus:border-stone-900 text-sm transition-colors"
          />
        </div>

        {/* URL de l'image */}
        <div>
          <label className="text-xs font-bold uppercase text-stone-700 tracking-wider">
            Lien (URL) de l&aposimage principale
          </label>
          <input
            name="imageMain"
            type="text"
            placeholder="Ex: /images/gateaux/kaak-warka.jpg"
            className="mt-2 block w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 focus:outline-none focus:border-stone-900 text-sm transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-bold uppercase text-stone-700 tracking-wider">
            Description (Ingrédients, détails...)
          </label>
          <textarea
            name="descriptionFr"
            rows={4}
            placeholder="Décrivez les saveurs de cette création..."
            className="mt-2 block w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-900 focus:outline-none focus:border-stone-900 text-sm transition-colors resize-none"
          />
        </div>
      </div>

      {/* Boutons de validation */}
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
          className="bg-amber-600 hover:bg-amber-700 disabled:bg-stone-400 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-colors shadow-md shadow-amber-600/10"
        >
          {loading ? "Création en cours..." : "Ajouter à la boutique"}
        </button>
      </div>
    </form>
  );
}
