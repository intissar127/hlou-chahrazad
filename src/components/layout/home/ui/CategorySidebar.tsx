"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Category } from "@/types/Category";
export default function CategorySidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();

        console.log("📊 Données reçues de l'API :", data); // 👈 Ajoute ce log !

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("❌ L'API n'a pas renvoyé un tableau :", data);
          setCategories([]); // On force un tableau vide pour éviter le crash
        }
      } catch (err) {
        console.error("❌ Erreur fetch :", err);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <aside className="w-full lg:w-64 flex-shrink-0">Chargement...</aside>
    );
  }

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-8">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-6 pb-2 border-b border-stone-100">
            Catégories
          </h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              // eslint-disable-next-line react/jsx-key
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="group block"
              >
                <div className="flex items-center justify-between w-full py-2 text-sm text-stone-500 hover:text-gold-600 transition-colors">
                  <span className="flex items-center gap-2">
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"
                    />
                    {cat.nameFr}
                  </span>
                </div>
              </Link>
            ))}
          </ul>
        </div>

        {/* Petit encart promotionnel dans la sidebar */}
        <div className="bg-stone-900 p-6 rounded-2xl text-white relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-widest text-gold-500 mb-2">
              Sur Mesure
            </p>
            <h4 className="text-lg font-serif mb-4 italic">
              Un événement particulier ?
            </h4>
            <button className="text-[10px] font-bold uppercase tracking-widest border-b border-gold-500 pb-1 hover:text-gold-500">
              Demander un devis
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              fill="currentColor"
              className="w-32 h-32 text-gold-500"
            >
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
}
