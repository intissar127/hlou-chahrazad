import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message invalide" }, { status: 400 });
    }

    const products = await prisma.product.findMany({
      select: { nameFr: true, price: true },
    });

    const catalogText = products
      .map((p) => `- ${p.nameFr} : ${Number(p.price).toFixed(3)} DT`)
      .join("\n");

    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `Tu es l'assistant IA exclusif de la prestigieuse pâtisserie tunisienne 'Hlou Chahrazad'.
      Ton but est d'accueillir les clients de manière chaleureuse, polie et gourmande.
      Tu réponds en français ou en arabe tunisien (Darija) selon la langue du client.
      Voici le catalogue disponible actuellement :
      ${catalogText}
      Ne propose JAMAIS de produits hors de cette liste. Reste concis (2-3 phrases max), propose de prendre la commande et utilise des émojis de gâteaux.`,
    });

    // Convertir l'historique au format attendu par Gemini
    const formattedHistory = (history || [])
      .slice(1, -1) // on exclut le dernier message (déjà envoyé séparément)
      .filter((msg: ChatMessage, index: number, arr: ChatMessage[]) => {
    // 👇 NOUVEAU - trouve l'index du premier message "user"
    const firstUserIndex = arr.findIndex((m) => m.role === "user");
    // ignore tout message avant le premier message user (ex: message de bienvenue)
    return index >= firstUserIndex;
  })
  .map((msg: ChatMessage) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("❌ Erreur Chatbot Gemini:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}