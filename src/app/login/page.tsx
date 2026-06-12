"use client";

import { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await loginUser(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // ✅ Le cookie est déjà posé côté serveur, on redirige simplement
      window.location.href = "/orders/history";
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif text-stone-900">
            Connexion à votre espace
          </h2>
          <p className="mt-2 text-center text-sm text-stone-600">
            Bienvenue chez Hlou Shahrazed
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-stone-700">
                Adresse Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl"
                placeholder="exemple@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700">
                Mot de passe
              </label>
              <input
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-xl"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-amber-600 hover:bg-amber-700 disabled:bg-stone-400"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <div className="text-center">
          <Link
            href="/register"
            className="text-sm text-amber-700 hover:underline font-medium"
          >
            Pas encore de compte ? S&apos;inscrire
          </Link>
        </div>
      </div>
    </main>
  );
}
