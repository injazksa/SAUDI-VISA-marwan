import { Reveal } from "@/components/Reveal";
import { TRUST } from "@/lib/content";

export default function Trust() {
  return (
    <section
      id="trust"
      className="py-20 md:py-32 lg:py-40 bg-white"
      data-testid="trust-section"
    >
      <div className="container-x">
        <Reveal className="max-w-3xl mb-16 md:mb-20">
          <p className="overline mb-4">لماذا نحن</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-brand-ink leading-tight">
            موثوقية تُبنى على
            <br />
            <span className="text-brand">الدقّة والالتزام</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-s border-black/10">
          {TRUST.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal
                key={t.title}
                delay={i * 0.06}
                className="group relative border-b border-e border-black/10 bg-paper hover:bg-brand-ink transition-colors duration-500 p-8 md:p-10 min-h-[240px] flex flex-col justify-between"
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
