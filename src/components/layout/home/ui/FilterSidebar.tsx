"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

interface FilterSidebarProps {
  slugs: { type: string; count: number }[];
  minPriceBounds: number;
  maxPriceBounds: number;
}

export default function FilterSidebar({
  slugs,
  minPriceBounds,
  maxPriceBounds,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // États locaux synchronisés avec l'URL ou les bornes par défaut
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(maxPriceBounds);
  const [selectedType, setSelectedType] = useState<string | null>(
    searchParams.get("slug"),
  );

  // Mettre à jour l'URL lorsque les filtres changent
  const applyFilters = (
    type: string | null = selectedType,
    price: number = priceRange,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type) params.set("slug", type);
    else params.delete("slug");

    params.set("maxPrice", price.toString());
    params.set("minPrice", minPriceBounds.toString()); // Borne inférieure fixe ou dynamique

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Filtrer la liste des types affichés selon la saisie utilisateur
  const filteredSlugs = slugs.filter((t) =>
    t.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 bg-white p-6 rounded-2xl border border-stone-100 shadow-sm h-fit">
      {/* SECTION 1 : FILTRER PAR TYPE */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-4">
          Filtrer par type de pâtisserie
        </h3>

        {/* Barre de recherche interne */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="trouver Type de pâtisserie"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm pl-3 pr-10 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600 transition-colors"
          />
          <Search
            size={16}
            className="absolute right-3 top-2.5 text-stone-400"
          />
        </div>

        {/* Liste des sous-types */}
        <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
          {filteredSlugs.map((st) => {
            const isSelected = selectedType === st.type;
            return (
              <button
                key={st.type}
                onClick={() => {
                  const nextType = isSelected ? null : st.type;
                  setSelectedType(nextType);
                  applyFilters(nextType, priceRange);
                }}
                className={`flex items-center justify-between w-full px-2 py-1.5 rounded-md text-sm transition-colors text-left ${
                  isSelected
                    ? "bg-stone-900 text-white font-medium"
                    : "text-stone-600 hover:bg-stone-50"
                }`}
              >
                <span>{st.type}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${isSelected ? "bg-stone-800 text-stone-300" : "bg-stone-50 text-stone-400"}`}
                >
                  {st.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-stone-100" />

      {/* SECTION 2 : FILTRER PAR PRIX */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-4">
          Filtrer par prix
        </h3>

        {/* Slider Input */}
        <input
          type="range"
          min={minPriceBounds}
          max={maxPriceBounds}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-emerald-600 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-stone-600">
            Prix :{" "}
            <span className="font-medium text-stone-900">
              {minPriceBounds} د.ت
            </span>{" "}
            —{" "}
            <span className="font-medium text-stone-900">{priceRange} د.ت</span>
          </div>

          <button
            onClick={() => applyFilters(selectedType, priceRange)}
            className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors"
          >
            Filtrer
          </button>
        </div>
      </div>
    </aside>
  );
}
