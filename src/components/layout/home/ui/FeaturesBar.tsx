import { Truck, Award, ShieldCheck, Clock } from "lucide-react";

export default function FeaturesBar() {
  const features = [
    {
      icon: <Truck className="text-gold-500" size={22} />,
      title: "Livraison Rapide",
      desc: "Sur toute la Tunisie",
    },
    {
      icon: <Award className="text-gold-500" size={22} />,
      title: "Qualité Premium",
      desc: "100% Artisanal",
    },
    {
      icon: <Clock className="text-gold-500" size={22} />,
      title: "Fraîcheur",
      desc: "Préparé à la commande",
    },
    {
      icon: <ShieldCheck className="text-gold-500" size={22} />,
      title: "Paiement",
      desc: "Sécurisé",
    },
  ];

  return (
    <section className="relative z-30 w-full px-4">
      {/* On utilise mt-[-50px] pour faire remonter la barre sur le Hero */}
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl py-8 px-6 -mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center gap-3 px-4 ${
                index !== features.length - 1
                  ? "lg:border-r border-stone-200"
                  : ""
              }`}
            >
              <div className="p-3 bg-stone-50 rounded-full">{feature.icon}</div>
              <div>
                <h3 className="text-[12px] font-bold text-stone-900 uppercase tracking-widest">
                  {feature.title}
                </h3>
                <p className="text-[11px] text-stone-500 mt-1 font-medium italic">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
