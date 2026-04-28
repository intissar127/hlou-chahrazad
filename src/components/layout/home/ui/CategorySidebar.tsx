"use client";
import { ChevronRight } from "lucide-react";

const CATEGORIES = [
  { name: "Hlou Arbi", count: 12 },
  { name: "Madeleine", count: 8 },
  { name: "Lolly Pops", count: 6 },
  { name: "Mignardises", count: 15 },
  { name: "Gâteau Mariage", count: 4 },
  { name: "Coffrets Cadeaux", count: 9 },
];

export default function CategorySidebar() {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-8">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-6 pb-2 border-b border-stone-100">
            Catégories
          </h3>
          <ul className="space-y-2">
            {CATEGORIES.map((cat) => (
              <li key={cat.name} className="group">
                <button className="flex items-center justify-between w-full py-2 text-sm text-stone-500 hover:text-gold-600 transition-colors">
                  <span className="flex items-center gap-2">
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"
                    />
                    {cat.name}
                  </span>
                  <span className="text-[10px] bg-stone-50 px-2 py-1 rounded-full text-stone-400 group-hover:bg-gold-50 group-hover:text-gold-600 transition-colors">
                    {cat.count}
                  </span>
                </button>
              </li>
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
            {/* Tu peux mettre une petite icône de gâteau ici */}
          </div>
        </div>
      </div>
    </aside>
  );
}
