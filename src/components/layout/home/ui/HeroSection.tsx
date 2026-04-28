import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] w-full flex items-center overflow-hidden bg-black">
      {/* 1. Image de fond - On repasse en Cover mais bien positionnée */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Pâtisserie fine tunisienne"
          fill
          className="object-cover object-center md:object-[right_17%]" // Centre sur mobile, décale à droite sur PC
          priority
        />
        {/* Overlay progressif plus profond pour détacher le texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/23 to-transparent z-10" />
      </div>

      {/* 2. Contenu Textuel */}
      <div className="container mx-auto px-6 relative z-20 text-white">
        <div className="max-w-xl">
          <span className="text-gold-500 font-medium tracking-[0.3em] uppercase mb-4 block text-sm">
            L&apos;excellence à la tunisienne
          </span>
          <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-[1.1]">
            Richesse des <br />
            <span className="text-gold-400 italic font-light">Saveurs</span>
          </h1>
          <p className="text-lg text-stone-300 mb-10 max-w-md leading-relaxed font-light">
            Découvrez l&apos;art de la pâtisserie fine où chaque bouchée raconte
            une histoire de tradition et de passion.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              href="/coffrets"
              className="bg-gold-600 hover:bg-gold-500 text-white px-10 py-4 rounded-full transition-all duration-300 font-bold uppercase text-xs tracking-[0.2em] shadow-2xl text-center"
            >
              Commander nos coffrets
            </Link>
            <Link
              href="/a-propos"
              className="border border-white/20 hover:bg-white hover:text-black px-10 py-4 rounded-full transition-all duration-300 uppercase text-xs tracking-[0.2em] backdrop-blur-md text-center"
            >
              Notre histoire
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Décoration : Ligne dorée subtile en bas */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent z-20" />
    </section>
  );
}
