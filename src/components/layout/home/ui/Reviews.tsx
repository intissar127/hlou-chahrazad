import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    author: "Meryem B.",
    text: "Le coffret Prestige était simplement sublime. La finesse de la pâte d'amande et le dosage du sucre sont parfaits.",
    rating: 5,
  },
  {
    id: 2,
    author: "Sami R.",
    text: "Une expérience authentique. On sent que chaque pièce est faite à la main avec amour. Livraison ponctuelle à Tunis.",
    rating: 5,
  },
  {
    id: 3,
    author: "Leila T.",
    text: "Les mignardises ont fait sensation lors de mon mariage. Merci à l'équipe pour leur professionnalisme.",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Quote className="mx-auto text-gold-500 mb-6 opacity-30" size={40} />
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
            Ce que nos <span className="italic">clients</span> disent
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-gold-500 text-gold-500"
                    />
                  ))}
                </div>
                <p className="text-stone-600 leading-relaxed italic mb-8">
                  &quot;{review.text}&quot;
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center text-gold-700 font-bold text-xs">
                  {review.author[0]}
                </div>
                <span className="font-bold text-sm text-stone-900">
                  {review.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
