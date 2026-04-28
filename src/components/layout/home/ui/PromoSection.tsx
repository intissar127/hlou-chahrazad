import Image from "next/image";
import Link from "next/link";

export default function PromoSection() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row items-center">
          {/* Texte de l'offre */}
          <div className="flex-1 p-12 lg:p-20">
            <span className="text-gold-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
              Offre Spéciale Aïd
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">
              Le Coffret <span className="italic text-gold-500">Majestic</span>{" "}
              <br /> à -15%
            </h2>
            <p className="text-stone-500 mb-10 max-w-md leading-relaxed">
              Profitez d&apos;une sélection de nos meilleures créations
              artisanales dans un écrin de luxe. Une offre limitée pour célébrer
              vos moments précieux.
            </p>
            <Link
              href="/coffrets"
              className="inline-block bg-stone-900 text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-gold-600 transition-colors"
            >
              En profiter maintenant
            </Link>
          </div>

          {/* Image de l'offre */}
          <div className="flex-1 relative w-full h-[400px] md:h-[600px]">
            <Image
              src="/images/promo-gateau.jpg" // Utilise une photo de coffret ouvert ici
              alt="Promotion Coffret Majestic"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
