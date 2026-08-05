import { ArrowLeft, ArrowUpLeft, FileText } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SERVICES, CONTACT } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 lg:py-40 bg-paper" data-testid="services-section">
      <div className="container-x">
        <Reveal className="max-w-3xl mb-16 md:mb-24">
          <p className="overline mb-4">خدماتنا</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-brand-ink leading-tight">
            خبرة متخصصة في إنجاز
            <br />
            <span className="text-brand">معاملات السفارة السعودية</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 font-light leading-relaxed">
            من تأشيرات العمل والتفويض الإلكتروني إلى تصديق الشهادات والوكالات — نديرها
            بدقّة وسرعة، من الاستشارة الأولى حتى تسليم وثائقكم مصدّقة وجاهزة.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 border-t border-s border-black/10">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                key={s.id}
                delay={i * 0.08}
                className="group relative border-b border-e border-black/10 bg-white p-8 md:p-12 hover:bg-brand-ink transition-colors duration-500 flex flex-col"
                data-testid={`service-card-${s.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 flex items-center justify-center border border-brand/30 text-brand group-hover:text-brand-gold group-hover:border-brand-gold/50 transition-colors duration-500">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <ArrowUpLeft
                    size={26}
                    className="text-black/15 group-hover:text-brand-gold group-hover:-translate-y-1 transition-all duration-500"
                  />
                </div>

                <h3 className="mt-8 font-heading text-2xl md:text-3xl font-medium text-brand-ink group-hover:text-white transition-colors duration-500">
                  {s.title}
                </h3>
                <p className="mt-4 text-gray-600 group-hover:text-white/75 leading-relaxed transition-colors duration-500">
                  {s.desc}
                </p>

                <div className="mt-5 flex items-start gap-2 text-sm">
                  <span className="text-brand group-hover:text-brand-gold font-bold shrink-0 transition-colors duration-500">
                    كيف نعمل:
                  </span>
                  <span className="text-gray-500 group-hover:text-white/60 transition-colors duration-500">
                    {s.how}
                  </span>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="text-xs border border-black/10 group-hover:border-white/20 text-gray-500 group-hover:text-white/70 px-3 py-1.5 transition-colors duration-500"
                    >
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-black/10 group-hover:border-white/15 flex items-start gap-2 transition-colors duration-500">
                  <FileText size={16} className="text-brand-gold mt-0.5 shrink-0" />
                  <span className="text-xs text-gray-500 group-hover:text-white/60 transition-colors duration-500">
                    {s.note}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <a
            href={CONTACT.whatsappMsg}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group"
            data-testid="services-cta-btn"
          >
            استفسر عن خدمتك الآن
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
