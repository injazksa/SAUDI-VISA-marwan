import { Reveal } from "@/components/Reveal";
import FaqList from "@/components/FaqList";
import { FAQ } from "@/lib/content";

export default function Faq() {
  return (
    <section
      id="faq"
      className="py-20 md:py-32 lg:py-40 bg-paper"
      data-testid="faq-section"
    >
      <div className="container-x grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        <Reveal>
          <p className="overline mb-4">الأسئلة الشائعة</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light tracking-tight text-brand-ink leading-tight">
            كل ما تودّون
            <br />
            معرفته
          </h2>
          <p className="mt-6 text-gray-600 font-light leading-relaxed">
            لم تجدوا إجابتكم؟ تواصلوا معنا مباشرةً وسنجيب على كل استفساراتكم.
          </p>
        </Reveal>

        <FaqList items={FAQ} idPrefix="faq" />
      </div>
    </section>
  );
}
