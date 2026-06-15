"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { revalidatePath } from "next/cache";

//  Fonction interne pour valider les droits d'administration
async function checkAdminAuth() {
  const user = await getCurrentUser();
  // On vérifie que la session existe et contient le rôle ADMIN
  if (!user || user.role !== "ADMIN") {
    throw new Error("Action non autorisée. Droits administrateur requis.");
  }
}

// 🟢 CREATE
export async function createProduct(formData: FormData) {
  try {
    await checkAdminAuth(); // Barrière de sécurité

    const nameFr = formData.get("nameFr") as string;
    const nameAr = formData.get("nameAr") as string;
    const descriptionFr = formData.get("descriptionFr") as string;
    const price = parseFloat(formData.get("price") as string);
    const categoryId = parseInt(formData.get("categoryId") as string, 10);
    const imageMain = formData.get("imageMain") as string;

    await prisma.product.create({
      data: { nameFr,nameAr, descriptionFr, price, categoryId, imageMain },
    });

    revalidatePath("/categories");
    return { success: true };
  } catch (error: unknown) {
    // ✅ Utilisation de unknown + vérification d'instance sécurisée
    const message = error instanceof Error ? error.message : "Erreur lors de la création.";
    return { error: message };
  }
}

// 🟡 UPDATE
export async function updateProduct(id: number, formData: FormData) {
  try {
    await checkAdminAuth();

    const nameFr = formData.get("nameFr") as string;
    const descriptionFr = formData.get("descriptionFr") as string;
    const price = parseFloat(formData.get("price") as string);
    const imageMain = formData.get("imageMain") as string;

    await prisma.product.update({
      where: { id },
      data: { nameFr, descriptionFr, price, imageMain },
    });

    revalidatePath("/categories");
    return { success: true };
  } catch (error: unknown) {
    // ✅ Plus besoin de désactiver eslint, le type est désormais propre
    const message = error instanceof Error ? error.message : "Erreur lors de la modification.";
    return { error: message };
  }
}

// 🔴 DELETE
export async function deleteProduct(id: number) {
  try {
    await checkAdminAuth();

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/categories");
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erreur lors de la suppression.";
    return { error: message };
  }
}