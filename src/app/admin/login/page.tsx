"use client";

import { useState } from "react";
import { loginAdmin } from "@/actions/auth";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await loginAdmin(formData); // Action spécifique admin

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // Redirection directe vers le tableau de bord admin
      window.location.href = "/admin/dashboard";
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-900 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-[2rem] shadow-xl">
        <div>
          <span className="block text-center text-xs font-bold uppercase tracking-widest text-amber-600">
            Espace Sécurisé
          </span>
          <h2 className="mt-2 text-center text-3xl font-serif text-stone-900">
            Administration Hlou Chahrazad
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-stone-700">
                Identifiant Admin (Email)
              </label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:border-stone-900 text-sm"
                placeholder="admin@chahrazad.com"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-stone-700">
                Mot de passe
              </label>
              <input
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:border-stone-900 text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-4 text-xs font-bold uppercase tracking-wider rounded-xl text-white bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 transition-colors"
          >
            {loading ? "Vérification..." : "Accéder au Panneau de Contrôle"}
          </button>
        </form>
      </div>
    </main>
  );
}
