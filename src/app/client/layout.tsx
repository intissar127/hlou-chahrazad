// src/app/(client)/layout.tsx
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

// import Footer from "@/components/layout/home/ui/Footer";
import Navbar from "@/components/layout/home/ui/Navbar";

// import { CartProvider } from "@/context/CartContext";

// src/app/(client)/layout.tsx

// import Footer from "@/components/layout/Footer";

// src/app/(client)/layout.tsx
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      {/* C'est ici que s'affichera ta page panier, UNE SEULE FOIS */}
    </>
  );
}
