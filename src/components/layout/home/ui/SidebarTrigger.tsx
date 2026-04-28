"use client";
import { ListFilter } from "lucide-react"; // Une icône de filtre/liste raffinée

interface SidebarTriggerProps {
  onClick: () => void;
}

export default function SidebarTrigger({ onClick }: SidebarTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 text-gold-700 hover:text-gold-950 transition-colors group p-2 rounded-lg"
    >
      <ListFilter size={20} className="shrink-0" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] pt-0.5 hidden sm:inline">
        Voir nos catégories de produits
      </span>
      {/* Sur mobile, on peut cacher le texte pour ne garder que l'icône */}
      <span className="text-xs font-bold uppercase tracking-widest sm:hidden">
        Menu
      </span>
    </button>
  );
}
