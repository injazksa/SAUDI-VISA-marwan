import { Reveal } from "@/components/Reveal";
import { ShieldCheck } from "lucide-react";
import { ACCREDITATION } from "@/lib/content";

export default function Trust() {
  return (
    <section
      id="accreditation"
      className="py-20 md:py-32 lg:py-40 bg-white relative overflow-hidden"
      data-testid="accreditation-section"
    >
      <div className="container-x">
        {/* بطاقة الاعتماد الرسمي */}
        <Reveal
          className="relative max-w-4xl mx-auto text-center bg-paper border-2 border-brand-gold/30 p-10 md:p-16"
          data-testid="accreditation-card"
        >
          <div className="absolute inset-3 border border-brand-gold/20 pointer-events-none" />
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto flex items-center justify-center border border-brand-gold/50 text-brand-gold mb-8">
              <ShieldCheck size={30} strokeWidth={1.5} />
            </div>
            <p className="overline mb-4">{ACCREDITATION.overline}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-brand-ink leading-tight">
              {ACCREDITATION.title}
            </h2>
            <p className="mt-8 text-lg md:text-xl text-gray-700 font-light leading-loose max-w-3xl mx-auto">
              {ACCREDITATION.statement}
            </p>
            <p className="mt-8 pt-6 border-t border-black/10 text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
              {ACCREDITATION.note}
            </p>
          </div>
        </Reveal>

        {/* نقاط الثقة */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-s border-black/10 mt-16 md:mt-24">
          {ACCREDITATION.points.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal
                key={t.title}
                delay={i * 0.06}
                className="group relative border-b border-e border-black/10 bg-white hover:bg-brand-ink transition-colors duration-500 p-8 md:p-10 min-h-[220px] flex flex-col justify-between"
                data-testid={`trust-item-${i}`}
              >
                <div className="w-14 h-14 flex items-center justify-center border border-brand/30 text-brand group-hover:text-brand-gold group-hover:border-brand-gold/50 transition-colors duration-500">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <div className="mt-8">
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-brand-ink group-hover:text-white transition-colors duration-500 mb-2">
                    {t.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/70 text-sm leading-relaxed font-light transition-colors duration-500">
                    {t.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
