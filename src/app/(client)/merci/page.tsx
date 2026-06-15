export default async function MerciPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center max-w-md p-8">
        <h1 className="text-3xl font-serif mb-4">
          Merci pour votre commande ! 🍰
        </h1>
        <p className="text-stone-500">
          Votre commande #HC-{order} a été enregistrée. Notre équipe vous
          contactera pour confirmer la livraison.
        </p>
      </div>
    </main>
  );
}
