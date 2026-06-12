import { getCurrentUser } from "@/lib/session";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import EditProductForm from "@/components/layout/home/ui/EditProductForm"; // Le sous-composant client pour le formulaire

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  // 1. Autorisation stricte au niveau du serveur
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  // 2. Résolution asynchrone des paramètres (Spécificité Next.js 15)
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  // 3. Récupération du produit existant et des catégories disponibles
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: productId } }),
    prisma.category.findMany({ select: { id: true, nameFr: true } }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main className="p-12 bg-stone-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Fil d'Ariane pour la navigation */}
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
            Modifier la douceur
          </h1>
          <p className="text-stone-500 text-sm">
            Mettez à jour les caractéristiques, le prix ou le visuel de :{" "}
            <span className="font-semibold text-stone-800">
              {product.nameFr}
            </span>
          </p>
        </div>

        {/* Formulaire Interactif (Composant Client) */}
        <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8">
          {/* On passe le produit brut converti pour éviter les soucis de type Decimal de Prisma */}
          <EditProductForm
            product={{
              ...product,
              price: Number(product.price),
              descriptionFr: product.descriptionFr || "",
            }}
            categories={categories}
          />
        </div>
      </div>
    </main>
  );
}
