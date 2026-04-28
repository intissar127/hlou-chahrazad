// src/app/layout.tsx
import "./globals.css"; // Assure-toi d'importer tes styles ici

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
        {/* C'est ici que Next.js injectera tes pages et sous-layouts */}
        {children}
      </body>
    </html>
  );
}
