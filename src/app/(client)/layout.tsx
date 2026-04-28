// src/app/(client)/layout.tsx
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

import Navbar from "@/components/layout/home/ui/Navbar";
import WhatsAppButton from "@/components/layout/home/ui/WhatsAppButton";

// src/app/(client)/layout.tsx

// import Footer from "@/components/layout/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children} {/* C'est ici que s'affichera ton HomePage */}
      <WhatsAppButton />
      {/* <Footer /> */}
    </>
  );
}
