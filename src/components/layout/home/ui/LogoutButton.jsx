"use client";

import { logoutUser } from "@/actions/auth"; // 👈 Ajuste le chemin vers ton fichier "use server" d'authentification
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { clearCart } = useCart();
  const { clearFavorites } = useFavorites();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1. On vide les états globaux du panier et des favoris
      if (clearCart) clearCart();
      if (clearFavorites) clearFavorites();
      
      // 2. On nettoie explicitement le LocalStorage
      localStorage.removeItem("hlou_cart");
      localStorage.removeItem("hlou_favorites");

      // 3. On appelle TA Server Action pour supprimer le cookie de session
      await logoutUser();

      // 4. On redirige proprement côté client et on rafraîchit les données de la page
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 border border-stone-200 hover:border-red-200 hover:bg-red-50 text-stone-600 hover:text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200"
    >
      <LogOut size={14} />
      Déconnexion
    </button>
  );
}