import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/content";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 md:py-32 lg:py-40 bg-white"
      data-testid="testimonials-section"
    >
      <div className="container-x">
        <Reveal className="max-w-3xl mb-16 md:mb-20">
          <p className="overline mb-4">آراء العملاء</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-brand-ink leading-tight">
            ثقة عملائنا
            <br />
            <span className="text-brand">هي إنجازنا الحقيقي</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={i}
              delay={i * 0.08}
              className="border border-black/10 bg-paper p-8 flex flex-col hover:border-brand transition-colors duration-500"
              data-testid={`testimonial-${i}`}
            >
              <Quote size={30} className="text-brand-gold mb-4" />
              <p className="text-gray-700 leading-relaxed flex-1 font-light">
                {t.text}
              </p>
              <div className="flex items-center gap-1 mt-6 mb-3">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={16} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <div className="border-t border-black/10 pt-3">
                <div className="font-heading font-medium text-brand-ink">{t.name}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
