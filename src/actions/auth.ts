"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { error: "Cet email est déjà utilisé par un autre compte." };
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hashage

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur registerUser:", error);
    return { error: "Erreur lors de la création du compte." };
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { error: "Identifiants incorrects." };
    }

    const isValid = await bcrypt.compare(password, user.password); // ✅ comparaison hashée

    if (!isValid) {
      return { error: "Identifiants incorrects." };
    }

    //  Crée une session cookie (httpOnly, sécurisée)
    const cookieStore = await cookies();
    cookieStore.set("user_session_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur loginUser:", error);
    return { error: "Erreur lors de la tentative de connexion." };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("user_session_id");
}
export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    //  Étape 1 : L'utilisateur existe-t-il ?
    if (!user) {
      return { error: "Identifiants incorrects." };
    }

    //  Étape 2 : Le mot de passe correspond-il (comparaison hashée) ?
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { error: "Identifiants incorrects." };
    }

    //  Étape 3 (AUTORISATION) : Est-il vraiment Admin dans ta base de données ?
    // Vérifie que ta colonne ou ton enum s'appelle bien "ADMIN" (en majuscules ou selon ton schéma Prisma)
    if (user.role !== "ADMIN") {
      return { error: "Accès refusé. Vous n'avez pas les droits d'administration." };
    }

    //  Crée la session cookie admin sécurisée si tout est OK
    const cookieStore = await cookies();
    cookieStore.set("user_session_id", String(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // Déconnexion automatique après 8h d'inactivité (plus sécurisé pour l'admin)
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur loginAdmin:", error);
    return { error: "Erreur lors de la tentative de connexion admin." };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("user_session_id");
}