// src/app/layout.tsx
import { CartProvider } from "@/context/CartContext";
import "./globals.css"; // Assure-toi d'importer tes styles ici
import { FavoritesProvider } from "@/context/FavoritesContext";

export const metadata = {
  title: "Hlou Chahrazad",
  description: "Pâtisserie fine tunisienne",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
