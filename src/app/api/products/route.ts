import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const onlyBests = searchParams.get("best") === "true";

    const products = await prisma.product.findMany({
      where: onlyBests ? { isBestSeller: true } : {},
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Erreur Prisma détaillée :", error); // 👈 Ajoute ce log pour voir le vrai problème dans ton terminal
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}