import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Package, ShoppingBag } from "lucide-react";

const statusConfig = {
  PENDING: {
    label: "En attente",
    style: "bg-amber-50 text-amber-700 border-amber-100",
  },
  CONFIRMED: {
    label: "Confirmée",
    style: "bg-blue-50 text-blue-700 border-blue-100",
  },
  SHIPPED: {
    label: "Expédiée",
    style: "bg-indigo-50 text-indigo-700 border-indigo-100",
  },
  DELIVERED: {
    label: "Livrée",
    style: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  CANCELLED: {
    label: "Annulée",
    style: "bg-red-50 text-red-700 border-red-100",
  },
};

export default async function OrdersHistoryPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="py-24 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-stone-400 hover:text-amber-600 transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-6 mb-10">
          <div>
            <h1 className="text-3xl font-serif text-stone-900 mb-2">
              Mon Historique de Commandes
            </h1>
            <p className="text-stone-500 text-sm">
              Suivez l&apos;évolution de vos douceurs artisanales commandées
              chez Hlou Chahrazad.
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-sm w-fit">
            {orders.length} {orders.length > 1 ? "Commandes" : "Commande"}
          </div>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = statusConfig[order.status];

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
                >
                  {/* En-tête : référence, date, statut */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-stone-50 p-2.5 rounded-xl text-stone-700">
                        <Package size={18} />
                      </div>
                      <div>
                        <span className="text-xs text-stone-400 block font-medium uppercase tracking-wider">
                          Référence
                        </span>
                        <span className="text-sm font-bold text-stone-900">
                          #HC-{order.id}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-stone-500">
                        <Calendar size={16} />
                        <span className="text-sm">
                          {new Date(order.createdAt).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${status.style}`}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Liste des articles de la commande */}
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="relative w-16 h-16 bg-stone-50 rounded-xl overflow-hidden border border-stone-100 flex-shrink-0">
                          {item.product?.imageMain ? (
                            <Image
                              src={item.product.imageMain}
                              alt={item.product.nameFr}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-300">
                              🍰
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-base text-stone-900">
                            {item.product?.nameFr || "Produit"}
                          </h3>
                          <p className="text-xs text-stone-500">
                            Quantité :{" "}
                            <span className="font-bold text-stone-800">
                              {item.quantity}
                            </span>
                          </p>
                        </div>
                        <span className="text-sm font-bold text-stone-900">
                          {(Number(item.unitPrice) * item.quantity).toFixed(3)}{" "}
                          DT
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex justify-end mt-6 pt-4 border-t border-stone-50">
                    <div className="text-right">
                      <span className="text-xs text-stone-400 font-medium uppercase tracking-wider block">
                        Total payé
                      </span>
                      <span className="text-xl font-black text-stone-950 tracking-tight">
                        {Number(order.totalAmount).toFixed(3)}{" "}
                        <span className="text-sm font-normal text-stone-500">
                          DT
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8">
            <div className="w-16 h-16 bg-stone-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <ShoppingBag size={24} />
            </div>
            <h3 className="font-serif text-xl text-stone-900 mb-2">
              Aucune commande pour le moment
            </h3>
            <p className="text-stone-400 text-sm max-w-sm mx-auto mb-6">
              Vous n&apos;avez pas encore passé de commande. Nos plateaux
              gourmands n&apos;attendent que vous !
            </p>
            <Link
              href="/"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-colors shadow-md"
            >
              Découvrir le catalogue
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
