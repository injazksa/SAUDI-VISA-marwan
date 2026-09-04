import { Reveal, MaskedLines } from "@/components/Reveal";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ABOUT, CONTACT } from "@/lib/content";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-32 lg:py-40 bg-white relative overflow-hidden"
      data-testid="about-section"
    >
      {/* رقم ضخم في الخلفية */}
      <span className="absolute -top-10 start-0 font-heading text-[28vw] font-black text-brand/[0.03] leading-none pointer-events-none select-none">
        من نحن
      </span>

      <div className="container-x relative z-10 grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">
        <div>
          <Reveal>
            <p className="overline mb-4">{ABOUT.overline}</p>
          </Reveal>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-brand-ink leading-tight">
            <MaskedLines
              lines={["مكتب المتخصصون", "لإنجاز معاملات", "السفارة السعودية"]}
              lineClassName=""
            />
          </h2>

          <Reveal delay={0.2} className="mt-10 space-y-4">
            {ABOUT.bullets.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="text-brand mt-0.5 shrink-0"
                />
                <span className="text-gray-700 leading-relaxed">{b}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <div>
          {ABOUT.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p
                className={`leading-loose ${
                  i === 0
                    ? "text-xl md:text-2xl text-brand-ink font-light mb-6"
                    : "text-gray-600 font-light mb-6"
                }`}
              >
                {p}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="mt-4 border-t border-black/10 pt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="overline mb-2">الموقع</div>
                <p className="text-brand-ink font-medium leading-relaxed">
                  {CONTACT.address}
                </p>
              </div>
              <div>
                <div className="overline mb-2">ساعات العمل</div>
                <p className="text-brand-ink font-medium">{CONTACT.hours}</p>
                <p className="text-gray-500 text-sm mt-1">{CONTACT.hoursOff}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
