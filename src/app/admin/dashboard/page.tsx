import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit2, Package, Trash2 } from "lucide-react";
import DeleteProductButton from "@/app/admin/DeleteProductButton"; // Petit composant client créé ci-dessous

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  // 🛡️ Blocage au niveau du routage (Authorization)
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  // Chargement des données nécessaires
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();

  // Récupération de la liste des produits avec leur catégorie associée
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: "desc", // Les plus récents en premier
    },
  });

  return (
    <main className="p-12 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* En-tête du Dashboard */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif text-stone-900 mb-2">
              Tableau de bord de gestion
            </h1>
            <p className="text-stone-500 text-sm">Bienvenue, {user.email}.</p>
          </div>

          {/* Bouton [CREATE] : Ajout de produit */}
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-3.5 rounded-xl transition-colors shadow-md shadow-amber-600/10"
          >
            <Plus size={16} />
            Ajouter une douceur
          </Link>
        </div>

        {/* Statistiques simples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-[1.5rem] border border-stone-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Total Produits
              </span>
              <p className="text-3xl font-black text-stone-900 mt-2">
                {productsCount} douceurs
              </p>
            </div>
            <div className="bg-stone-50 p-4 rounded-2xl text-stone-700">
              <Package size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-[1.5rem] border border-stone-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Commandes Reçues
              </span>
              <p className="text-3xl font-black text-amber-600 mt-2">
                {ordersCount} paniers
              </p>
            </div>
            <div className="bg-amber-50/50 p-4 rounded-2xl text-amber-700">
              <Package size={24} />
            </div>
          </div>
        </div>

        {/* Section de gestion des produits [READ / UPDATE / DELETE] */}
        <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-stone-100">
            <h2 className="font-serif text-xl text-stone-900">
              Liste des Pâtisseries
            </h2>
          </div>

          <div className="divide-y divide-stone-100">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-stone-50/50 transition-colors"
                >
                  {/* Visuel & Infos Produit */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-16 h-16 bg-stone-100 rounded-xl overflow-hidden border border-stone-200/60 flex-shrink-0">
                      {product.imageMain ? (
                        <Image
                          src={product.imageMain}
                          alt={product.nameFr}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400 font-serif italic text-xs">
                          🍰
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-stone-900">
                        {product.nameFr}
                      </h3>
                      <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md mt-1">
                        {product.category?.nameFr || "Sans catégorie"}
                      </span>
                    </div>
                  </div>

                  {/* Prix et Actions CRUD */}
                  <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-stone-100">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                        Prix Kilo
                      </span>
                      <span className="font-black text-stone-950">
                        {Number(product.price).toFixed(3)}{" "}
                        <span className="text-xs font-normal text-stone-500">
                          DT
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Bouton [UPDATE] */}
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="p-3 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors"
                        title="Modifier le produit"
                      >
                        <Edit2 size={16} />
                      </Link>

                      {/* Bouton [DELETE] (Appel au composant client sécurisé) */}
                      <DeleteProductButton
                        productId={product.id}
                        productName={product.nameFr}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-stone-400 italic">
                Aucun produit disponible en boutique. Commencez par en ajouter
                un !
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
