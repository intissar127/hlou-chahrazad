import { prisma } from "@/lib/prisma"; // ✅ Utilisation du singleton global
import ProductCard from "@/components/layout/home/ui/ProductCart";
import FilterSidebar from "@/components/layout/home/ui/FilterSidebar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Product } from "@/types/product"; // ✅ Import du type client attendu par ProductCard

interface CategoryPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    slug?: string; // Utilisé pour filtrer par nom de produit
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  // 1. Résolution asynchrone des paramètres (Next.js 15+)
  const { id } = await params;
  const { slug, minPrice, maxPrice } = await searchParams;

  const categoryId = parseInt(id, 10);
  if (isNaN(categoryId)) {
    notFound();
  }

  // 2. Préparation des variables de filtrage de prix
  const parsedMinPrice = minPrice ? parseFloat(minPrice) : 0;
  const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : Number.MAX_VALUE;

  // 3. Récupération de la catégorie et filtrage SQL relationnel natif via Prisma
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      products: {
        where: {
          price: {
            gte: parsedMinPrice,
            lte: parsedMaxPrice,
          },
          ...(slug ? { nameFr: slug } : {}), // Filtrage par nom si le tag est sélectionné
        },
        orderBy: {
          price: "asc",
        },
      },
    },
  });

  if (!category) {
    notFound();
  }

  // 4. Agrégation statistique pour la Sidebar (Indépendante des filtres actifs)
  const allCategoryProducts = await prisma.product.findMany({
    where: { categoryId: categoryId },
    select: { nameFr: true, price: true },
  });

  // Calcul dynamique des occurrences basé sur le nom français pour simuler les sous-types
  const typeCounts = allCategoryProducts.reduce(
    (acc: { [key: string]: number }, prod) => {
      if (prod.nameFr) {
        acc[prod.nameFr] = (acc[prod.nameFr] || 0) + 1;
      }
      return acc;
    },
    {},
  );

  const formattedSlugs = Object.entries(typeCounts).map(([type, count]) => ({
    type,
    count,
  }));

  // 5. Conversion explicite du type Decimal de Prisma en number standard JavaScript
  const prices = allCategoryProducts.map((p) => Number(p.price));
  const minPriceBounds = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPriceBounds = prices.length > 0 ? Math.max(...prices) : 200;

  const filteredProductCount = category.products?.length ?? 0;

  return (
    <main className="py-24 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Fil d'Ariane */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-stone-400 hover:text-amber-600 transition-colors"
          >
            ← Retour à la boutique
          </Link>
        </div>

        {/* En-tête de la gamme */}
        <div className="border-b border-stone-200 pb-8 mb-12">
          <h1 className="text-4xl font-serif text-stone-900 mb-2">
            {category.nameFr}
          </h1>
          <p className="text-stone-500 text-sm italic">
            Découvrez notre sélection exclusive de la gamme {category.nameFr}.
          </p>
          <span className="inline-block mt-4 text-xs bg-stone-900 text-white px-3 py-1 rounded-full font-medium">
            {filteredProductCount}{" "}
            {filteredProductCount > 1
              ? "produits correspondants"
              : "produit correspondant"}
          </span>
        </div>

        {/* Layout Principal bi-colonne : Sidebar + Grille */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Barre de Filtres Latérale */}
          <FilterSidebar
            slugs={formattedSlugs}
            minPriceBounds={minPriceBounds}
            maxPriceBounds={maxPriceBounds}
          />

          {/* Grille d'affichage des pâtisseries */}
          <div className="flex-1">
            {filteredProductCount > 0 ? (
              /* 💡 Modification ici : La grille s'adapte de manière fluide. 
                Si tu imposes une largeur fixe ou un max-w sur tes cartes directement, 
                'justify-items-center' s'assurera qu'elles restent parfaitement centrées dans leur colonne.
              */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
                {category.products.map((product) => {
                  // ✅ Évite le 'as any' : cast explicite et respectueux d'ESLint
                  const cleanProduct = {
                    ...product,
                    price: Number(product.price),
                    image: product.imageMain,
                    oldPrice: product.oldPrice
                      ? Number(product.oldPrice)
                      : null,
                  } as Product;

                  return (
                    <ProductCard key={product.id} product={cleanProduct} />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm">
                <p className="text-stone-400 font-serif text-lg">
                  Aucun produit ne correspond à vos critères de filtrage.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
