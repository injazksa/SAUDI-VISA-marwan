import { Reveal } from "@/components/Reveal";
import { TRUST, TRUST_IMAGES } from "@/lib/content";

export default function Trust() {
  return (
    <section
      id="trust"
      className="py-20 md:py-32 lg:py-40 bg-paper"
      data-testid="trust-section"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
          {/* النص */}
          <div>
            <Reveal>
              <p className="overline mb-4">لماذا نحن</p>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-brand-ink leading-tight">
                موثوقية تُبنى على
                <br />
                <span className="text-brand">الدقّة والالتزام</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid sm:grid-cols-2 gap-x-8">
              {TRUST.map((t, i) => {
                const Icon = t.icon;
                return (
                  <Reveal
                    key={t.title}
                    delay={i * 0.08}
                    className="py-6 border-t border-black/10"
                    data-testid={`trust-item-${i}`}
                  >
                    <Icon size={26} className="text-brand mb-4" strokeWidth={1.5} />
                    <h3 className="font-heading text-xl font-medium text-brand-ink mb-2">
                      {t.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-light">
                      {t.desc}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* صور spotlight مقصوصة */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <Reveal className="col-span-2 overflow-hidden">
              <div className="overflow-hidden">
                <img
                  src={TRUST_IMAGES[0].url}
                  alt={TRUST_IMAGES[0].alt}
                  className="w-full h-[280px] md:h-[340px] object-cover hover:scale-105 transition-transform duration-[900ms] ease-out"
                  data-testid="trust-image-0"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="overflow-hidden">
              <div className="overflow-hidden bg-brand-ink h-[180px] md:h-[220px] flex flex-col justify-center p-6">
                <div className="font-heading text-4xl md:text-5xl font-black text-brand-gold">
                  100%
                </div>
                <p className="text-white/70 text-sm mt-2 font-light">
                  التزام وشفافية في كل معاملة
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="overflow-hidden">
              <div className="overflow-hidden h-[180px] md:h-[220px]">
                <img
                  src={TRUST_IMAGES[1].url}
                  alt={TRUST_IMAGES[1].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[900ms] ease-out"
                  data-testid="trust-image-1"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
