import { MapPin, Phone, Mail, Globe } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-20 border-t border-stone-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Identité */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-white font-serif text-2xl mb-6">
              Hlou <span className="text-gold-500">Chahrazad</span>
            </h2>
            <p className="text-sm leading-relaxed mb-6">
              L&apos;art de la pâtisserie fine tunisienne depuis des
              générations. Authenticité, luxe et passion dans chaque bouchée.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-gold-500 transition-colors">
                {/* <Instagram size={20} /> */}
              </Link>
              <Link href="#" className="hover:text-gold-500 transition-colors">
                <Globe size={20} />
              </Link>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-6">
              Navigation
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/coffrets"
                  className="hover:text-white transition-colors"
                >
                  Nos Coffrets
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="hover:text-white transition-colors"
                >
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-6">
              Contact & Boutique
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="text-gold-500 shrink-0" size={18} />
                <span>
                  Moknine, Monastir <br /> Tunisie
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-gold-500 shrink-0" size={18} />
                <span>+216 20 000 000</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-gold-500 shrink-0" size={18} />
                <span>contact@hlouchahrazad.tn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-stone-800 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest">
          <p>© 2024 Hlou Chahrazad. Tous droits réservés.</p>
          <p>
            Design & Tech par{" "}
            <span className="text-white">Intissar Massaoud</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
