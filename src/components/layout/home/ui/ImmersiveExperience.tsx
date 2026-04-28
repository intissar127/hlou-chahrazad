import Image from "next/image";

export default function ImmersiveExperience() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Côté Gauche : La composition "Réalité" */}
          <div className="relative w-full lg:w-1/2 h-[500px] md:h-[600px]">
            {/* Image principale : Un coffret ouvert sur une table avec un café ou un thé */}
            <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden shadow-2xl transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/images/lifestyle-1.jpg"
                alt="Dégustation Hlou Chahrazad"
                fill
                className="object-cover"
              />
            </div>

            {/* Image secondaire en incrustation : Focus sur la texture d'un gâteau mordu ou coupé */}
            <div className="absolute -bottom-10 -right-6 z-20 w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-white overflow-hidden shadow-2xl hidden md:block animate-pulse-slow">
              <Image
                src="/images/macro-texture.png"
                alt="Texture pâtisserie"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Côté Droit : Texte narratif */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-block border-l-2 border-gold-500 pl-4">
              <span className="text-gold-600 font-bold tracking-[0.3em] uppercase text-xs">
                L&apos;Instant Chahrazad
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-[1.2]">
              Plus qu&apos;un coffret, <br />
              <span className="italic text-gold-500">une émotion.</span>
            </h2>

            <p className="text-lg text-stone-600 leading-relaxed font-light">
              Imaginez l&apos;ouverture délicate d&apos;un écrin, l&apos;odeur
              envoûtante de l&apos;eau de rose et du miel pur... Chaque pièce
              est une architecture de saveurs conçue pour fondre délicatement,
              libérant le croquant des pistaches sélectionnées une à une.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <p className="text-2xl font-serif text-stone-900">100%</p>
                <p className="text-xs uppercase tracking-widest text-stone-400 mt-1">
                  Naturel & Pur
                </p>
              </div>
              <div>
                <p className="text-2xl font-serif text-stone-900">Artisanal</p>
                <p className="text-xs uppercase tracking-widest text-stone-400 mt-1">
                  Fait à la main
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
