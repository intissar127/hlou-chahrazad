import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CreateProductForm from "@/components/layout/home/ui/CreateProductForm";

export default async function NewProductPage() {
  // 1. Barrière de sécurité d'autorisation admin
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  // 2. Récupération des catégories pour le sélecteur du formulaire
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      nameFr: true,
    },
    orderBy: {
      nameFr: "asc",
    },
  });

  return (
    <main className="p-12 bg-stone-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Fil d'Ariane */}
        <div className="mb-6">
          <Link
            href="/admin/dashboard"
            className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
          >
            ← Retour au tableau de bord
          </Link>
        </div>

        {/* En-tête */}
        <div className="border-b border-stone-200 pb-6 mb-10">
          <h1 className="text-3xl font-serif text-stone-900 mb-2">
            Ajouter une nouvelle douceur
          </h1>
          <p className="text-stone-500 text-sm">
            Créez une nouvelle fiche produit pour garnir la vitrine digitale de
            Hlou Chahrazad.
          </p>
        </div>

        {/* Conteneur du Formulaire */}
        <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8">
          <CreateProductForm categories={categories} />
        </div>
      </div>
    </main>
  );
}
