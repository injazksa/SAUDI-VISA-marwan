import { Reveal } from "@/components/Reveal";
import { PROCESS, DOCS } from "@/lib/content";
import { FileText, CheckCircle2 } from "lucide-react";

export default function Process() {
  return (
    <section
      id="process"
      className="py-20 md:py-32 lg:py-40 bg-brand-ink text-white relative overflow-hidden"
      data-testid="process-section"
    >
      <div className="noise-overlay opacity-[0.04]" />
      <div className="container-x relative z-10">
        <Reveal className="max-w-3xl mb-16 md:mb-24">
          <p className="text-brand-gold text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4">
            كيف نعمل
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
            مسار واضح من الاستشارة
            <br />
            حتى التسليم
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {PROCESS.map((p, i) => (
            <Reveal
              key={p.label}
              delay={i * 0.1}
              className="relative pt-8 border-t border-white/15"
              data-testid={`process-step-${i}`}
            >
              <div className="text-brand-gold text-sm font-bold tracking-wide mb-3">
                {p.label}
              </div>
              <h3 className="font-heading text-2xl font-medium mb-3">
                {p.title}
              </h3>
              <p className="text-white/60 leading-relaxed font-light">
                {p.desc}
              </p>
            </Reveal>
          ))}
        </div>

        {/* الأوراق المطلوبة */}
        <Reveal
          delay={0.15}
          className="mt-20 md:mt-28 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center border-t border-white/15 pt-16"
          data-testid="docs-block"
        >
          <div>
            <div className="w-14 h-14 flex items-center justify-center border border-brand-gold/40 text-brand-gold mb-6">
              <FileText size={26} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-3xl md:text-4xl font-light leading-tight">
              الأوراق المطلوبة عادةً
            </h3>
            <p className="mt-4 text-white/60 font-light leading-relaxed">
              تختلف المستندات حسب نوع المعاملة، ونرشدكم للمطلوب بدقّة عند مراجعة
              ملفكم لتفادي أي تأخير.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8">
            {DOCS.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-3 py-4 border-b border-white/10 text-white/80"
              >
                <CheckCircle2
                  size={20}
                  className="text-brand-gold mt-0.5 shrink-0"
                />
                <span className="font-light">{d}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
