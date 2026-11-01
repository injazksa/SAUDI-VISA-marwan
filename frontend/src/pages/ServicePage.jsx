import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
  FileText,
  Phone,
  AlertTriangle,
  Info,
  ChevronLeft,
  Zap,
  Lock,
  Headset,
  BookOpen,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Reveal } from "@/components/Reveal";
import FaqList from "@/components/FaqList";
import { SERVICES, CONTACT, BRAND } from "@/lib/content";
import { SERVICE_DETAILS } from "@/lib/services";

const BASE = typeof window !== "undefined" ? window.location.origin : "";

const FEATURE_ICONS = [Zap, Lock, Headset];

/* ---------- بلوكات المحتوى ---------- */

const NoteBlock = ({ block }) => (
  <div className="container-x pt-14 md:pt-20">
    <Reveal>
      <div
        className="flex items-start gap-4 border border-[#FDE047] bg-[#FEFCE8] p-6 md:p-8"
        data-testid="service-note"
      >
        <AlertTriangle size={22} className="text-[#854D0E] mt-0.5 shrink-0" />
        <p className="text-[#854D0E] font-medium leading-relaxed">{block.text}</p>
      </div>
    </Reveal>
  </div>
);

const LeadBlock = ({ block }) => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container-x max-w-4xl">
      <Reveal>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-ink leading-tight border-s-4 border-brand-gold ps-5">
          {block.title}
        </h2>
        {block.p.map((p, i) => (
          <p key={i} className="mt-6 text-lg text-gray-700 font-light leading-loose">
            {p}
          </p>
        ))}
      </Reveal>
    </div>
  </section>
);

const StepsBlock = ({ block }) => (
  <section className="py-16 md:py-24 bg-brand-ink text-white relative overflow-hidden">
    <div className="noise-overlay opacity-[0.05]" />
    <div className="container-x relative z-10">
      <Reveal className="max-w-3xl mb-14">
        <p className="text-brand-gold text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4">
          {block.overline}
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight">
          {block.title}
        </h2>
        {block.intro && (
          <p className="mt-5 text-white/70 font-light leading-relaxed">{block.intro}</p>
        )}
      </Reveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {block.items.map((st, i) => (
          <Reveal
            key={i}
            delay={i * 0.06}
            className="pt-8 border-t border-white/15"
            data-testid={`service-step-${i}`}
          >
            <div className="text-brand-gold text-sm font-bold mb-3">{st.label}</div>
            <h3 className="font-heading text-xl md:text-2xl font-medium mb-3">{st.h}</h3>
            <p className="text-white/60 leading-relaxed font-light">{st.p}</p>
            {st.link && (
              <Link
                to={st.link.href}
                className="mt-4 inline-flex items-center gap-2 text-brand-gold text-sm font-medium hover:text-white transition-colors"
                data-testid={`service-step-link-${i}`}
              >
                {st.link.label}
                <ArrowLeft size={16} />
              </Link>
            )}
          </Reveal>
        ))}
      </div>
      {block.note && (
        <Reveal delay={0.1} className="mt-14">
          <div
            className="border border-brand-gold/30 bg-brand-gold/5 p-6 md:p-8 flex items-start gap-4"
            data-testid="steps-note"
          >
            <Info size={22} className="text-brand-gold mt-1 shrink-0" />
            <div>
              <h4 className="font-heading text-lg font-bold text-brand-gold mb-2">
                {block.note.title}
              </h4>
              <p className="text-white/75 leading-relaxed font-light">{block.note.text}</p>
              {block.note.link && (
                <Link
                  to={block.note.link.href}
                  className="mt-4 inline-flex items-center gap-2 text-brand-gold text-sm font-medium hover:text-white transition-colors"
                  data-testid="steps-note-link"
                >
                  {block.note.link.label}
                  <ArrowLeft size={16} />
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  </section>
);

const ChecklistBlock = ({ block }) => (
  <section className="py-16 md:py-24 bg-paper">
    <div className="container-x grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
      <Reveal>
        <p className="overline mb-4">{block.overline}</p>
        <h2 className="font-heading text-3xl md:text-4xl font-light text-brand-ink leading-tight">
          {block.title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <ul className="space-y-4">
          {block.items.map((w, i) => (
            <li key={i} className="flex items-start gap-3 pb-4 border-b border-black/10">
              <CheckCircle2 size={20} className="text-brand mt-0.5 shrink-0" />
              <span className="text-gray-700 leading-relaxed">{w}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

const DocsBlock = ({ block }) => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container-x grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
      <Reveal>
        <div className="w-14 h-14 flex items-center justify-center border border-brand/30 text-brand mb-6">
          <FileText size={26} strokeWidth={1.5} />
        </div>
        <p className="overline mb-4">{block.overline}</p>
        <h2 className="font-heading text-3xl md:text-4xl font-light text-brand-ink leading-tight">
          {block.title}
        </h2>
        {block.intro && (
          <p className="mt-4 text-gray-600 font-light leading-relaxed">{block.intro}</p>
        )}
      </Reveal>
      <Reveal delay={0.1}>
        <ul className="grid sm:grid-cols-2 gap-x-8">
          {block.items.map((d, i) => (
            <li
              key={i}
              className="flex items-start gap-3 py-4 border-b border-black/10 text-gray-700"
              data-testid={`service-doc-${i}`}
            >
              <CheckCircle2 size={18} className="text-brand-gold mt-1 shrink-0" />
              <span className="font-light leading-relaxed">{d}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

const DocGroupsBlock = ({ block }) => (
  <section className="py-16 md:py-24 bg-paper">
    <div className="container-x">
      <Reveal className="max-w-3xl mb-14">
        <p className="overline mb-4">{block.overline}</p>
        <h2 className="font-heading text-3xl md:text-4xl font-light text-brand-ink leading-tight">
          {block.title}
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-6">
        {block.groups.map((g, i) => (
          <Reveal
            key={i}
            delay={i * 0.06}
            className="bg-white border border-black/10 hover:border-brand/40 transition-colors duration-300 p-8"
            data-testid={`doc-group-${i}`}
          >
            <h3 className="font-heading text-xl font-bold text-brand-ink mb-6 flex items-center gap-4">
              <span className="w-11 h-11 flex items-center justify-center border border-brand/30 text-brand shrink-0">
                <FileText size={20} strokeWidth={1.5} />
              </span>
              {g.h}
            </h3>
            <ul className="space-y-3">
              {g.items.map((it, j) => (
                <li key={j} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 size={18} className="text-brand mt-1 shrink-0" />
                  <span className="font-light leading-relaxed">{it}</span>
                </li>
              ))}
            </ul>
            {g.note && (
              <p className="mt-6 pt-4 border-t border-black/10 text-sm text-gray-500 flex items-start gap-2">
                <AlertTriangle size={16} className="text-brand-gold mt-0.5 shrink-0" />
                {g.note}
              </p>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const CompareBlock = ({ block }) => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container-x">
      <Reveal className="max-w-3xl mb-14">
        <p className="overline mb-4">{block.overline}</p>
        <h2 className="font-heading text-3xl md:text-4xl font-light text-brand-ink leading-tight">
          {block.title}
        </h2>
      </Reveal>
      <div className="grid lg:grid-cols-2 gap-6">
        {block.cards.map((c, i) => (
          <Reveal
            key={i}
            delay={i * 0.1}
            className="border-2 border-brand/15 bg-paper p-8 md:p-10 hover:border-brand-gold/60 transition-colors duration-300"
            data-testid={`compare-card-${i}`}
          >
            <span className="inline-block bg-brand text-white text-xs font-bold px-4 py-1.5 mb-6">
              {c.tag}
            </span>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-brand-ink">
              {c.title}
            </h3>
            <p className="text-brand font-medium mt-1 mb-8">{c.audience}</p>
            <div className="space-y-7">
              <div>
                <div className="overline mb-2">المؤهلات المطلوبة</div>
                <p className="text-gray-700 font-light leading-relaxed">{c.requirements}</p>
              </div>
              <div>
                <div className="overline mb-3">{c.examplesTitle}</div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {c.examples.map((e, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-gray-700 text-sm">
                      <CheckCircle2 size={16} className="text-brand-gold mt-0.5 shrink-0" />
                      <span className="font-light">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-black/10 pt-6">
                <div className="overline mb-2">{c.methodTitle}</div>
                <p className="text-gray-700 font-light leading-relaxed">{c.method}</p>
                {c.extra && (
                  <p className="mt-4 inline-block bg-brand/10 text-brand text-sm font-bold px-4 py-2">
                    {c.extra}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const FeaturesBlock = ({ block }) => (
  <section className="py-14 md:py-20 bg-paper border-y border-black/10">
    <div className="container-x grid sm:grid-cols-3 gap-10">
      {block.items.map((f, i) => {
        const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
        return (
          <Reveal
            key={i}
            delay={i * 0.08}
            className="flex items-start gap-4"
            data-testid={`feature-${i}`}
          >
            <span className="w-12 h-12 flex items-center justify-center border border-brand/30 text-brand shrink-0">
              <Icon size={22} strokeWidth={1.5} />
            </span>
            <div>
              <h3 className="font-heading text-lg font-bold text-brand-ink mb-1.5">{f.h}</h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">{f.p}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  </section>
);

const CtaBlock = ({ block }) => (
  <section className="py-14 md:py-20 bg-brand relative overflow-hidden">
    <div className="noise-overlay opacity-[0.06]" />
    <div className="container-x relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
      <Reveal className="max-w-2xl">
        <h3 className="font-heading text-2xl md:text-4xl font-light text-white leading-tight">
          {block.title}
        </h3>
        <p className="text-white/80 mt-4 font-light leading-relaxed">{block.text}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <a
          href={CONTACT.whatsappMsg}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-brand-gold text-brand-ink px-8 py-4 text-sm font-bold tracking-wide hover:bg-white transition-colors duration-300 shrink-0"
          data-testid="block-cta-whatsapp"
        >
          <MessageCircle size={18} />
          تحدث معنا الآن
        </a>
      </Reveal>
    </div>
  </section>
);

const ArticleBlock = ({ block }) => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container-x max-w-4xl">
      <Reveal>
        <p className="overline mb-4">{block.overline}</p>
        <h2 className="font-heading text-3xl md:text-4xl font-light text-brand-ink leading-tight">
          {block.title}
        </h2>
        {block.intro.map((p, i) => (
          <p key={i} className="mt-6 text-lg text-gray-700 font-light leading-loose">
            {p}
          </p>
        ))}
      </Reveal>

      {block.summary && (
        <Reveal className="mt-10">
          <div
            className="bg-[#F0FDF4] border border-[#86EFAC] p-6 md:p-8"
            data-testid="article-summary"
          >
            <div className="flex items-center gap-3 text-[#166534] font-heading font-bold text-lg mb-4">
              <BookOpen size={20} />
              {block.summary.title}
            </div>
            <div className="space-y-2">
              {block.summary.points.map((pt, i) => (
                <p key={i} className="text-[#166534] leading-relaxed font-light">
                  {pt}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      <div className="mt-16 space-y-16">
        {block.sections.map((s, i) => (
          <Reveal key={i} data-testid={`article-section-${i}`}>
            <h3 className="font-heading text-2xl font-bold text-brand-ink mb-6 border-s-4 border-brand-gold ps-4 leading-snug">
              {s.h}
            </h3>
            {s.p &&
              s.p.map((p, j) => (
                <p key={j} className="text-gray-700 font-light leading-loose mb-4">
                  {p}
                </p>
              ))}
            {s.steps && (
              <div className="mt-6 space-y-8">
                {s.steps.map((st, j) => (
                  <div key={j} className="border-s-2 border-brand/25 ps-6">
                    <h4 className="font-heading text-lg font-semibold text-brand">{st.h}</h4>
                    <p className="text-gray-600 font-light leading-relaxed mt-2">{st.p}</p>
                  </div>
                ))}
              </div>
            )}
            {s.groups && (
              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                {s.groups.map((g, j) => (
                  <div key={j} className="border border-black/10 bg-paper p-6">
                    <h4 className="font-heading text-lg font-bold text-brand-ink mb-2">
                      {g.h}
                    </h4>
                    <p className="text-gray-600 text-sm font-light leading-relaxed">{g.p}</p>
                  </div>
                ))}
              </div>
            )}
            {s.list && (
              <ul
                className={`mt-6 space-y-3 ${
                  s.variant === "mistakes"
                    ? "bg-[#FEFCE8] border border-[#FDE047] p-6"
                    : ""
                }`}
              >
                {s.list.map((li, j) => (
                  <li
                    key={j}
                    className={`flex items-start gap-3 ${
                      s.variant === "mistakes" ? "text-[#854D0E]" : "text-gray-700"
                    }`}
                  >
                    {s.variant === "mistakes" ? (
                      <AlertTriangle size={18} className="mt-1 shrink-0" />
                    ) : (
                      <CheckCircle2 size={18} className="text-brand mt-1 shrink-0" />
                    )}
                    <span className="font-light leading-relaxed">{li}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.note && (
              <div className="mt-6 bg-[#F0FDF4] border border-[#86EFAC] p-5 flex items-start gap-3">
                <Info size={18} className="text-[#166534] mt-1 shrink-0" />
                <p className="text-[#166534] font-light leading-relaxed">{s.note}</p>
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const FaqBlock = ({ block }) => (
  <section className="py-16 md:py-24 bg-paper">
    <div className="container-x max-w-4xl">
      <Reveal className="mb-10">
        <p className="overline mb-3">{block.overline}</p>
        <h2 className="font-heading text-3xl md:text-4xl font-light text-brand-ink leading-tight">
          {block.title}
        </h2>
      </Reveal>
      <FaqList items={block.items} idPrefix="service-faq" defaultOpen={-1} />
    </div>
  </section>
);

const BLOCKS = {
  note: NoteBlock,
  lead: LeadBlock,
  steps: StepsBlock,
  checklist: ChecklistBlock,
  docs: DocsBlock,
  docGroups: DocGroupsBlock,
  compare: CompareBlock,
  features: FeaturesBlock,
  cta: CtaBlock,
  article: ArticleBlock,
  faq: FaqBlock,
};

export default function ServicePage() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);
  const details = SERVICE_DETAILS[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (details) {
      document.title = `${details.seoTitle} | ${BRAND.name}`;
      const md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute("content", details.seoDescription);
      const mk = document.querySelector('meta[name="keywords"]');
      if (mk) mk.setAttribute("content", details.keywords);
    }
    // Schema.org Service JSON-LD
    const script = document.createElement("script");
    script.type = "application/ld+json";
    if (service && details) {
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: details.heading,
        description: details.seoDescription,
        provider: {
          "@type": "LocalBusiness",
          name: BRAND.fullName,
          telephone: "+962792622210",
          address: {
            "@type": "PostalAddress",
            streetAddress: "الدوّار الأول - جبل عمّان",
            addressLocality: "عمّان",
            addressCountry: "JO",
          },
        },
        areaServed: { "@type": "Country", name: "الأردن" },
        serviceType: details.heading,
        url: `${BASE}/services/${slug}`,
      });
      document.head.appendChild(script);
      // BreadcrumbList
      const bc = document.createElement("script");
      bc.type = "application/ld+json";
      bc.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: "الخدمات", item: `${BASE}/#services` },
          { "@type": "ListItem", position: 3, name: details.heading, item: `${BASE}/services/${slug}` },
        ],
      });
      document.head.appendChild(bc);
      return () => {
        script.remove();
        bc.remove();
        document.title = "مكتب المتخصصون لإنجاز معاملات السفارة السعودية | متخصّص في الأردن";
      };
    }
  }, [slug, service, details]);

  if (!service || !details) {
    return (
      <div className="bg-paper min-h-screen">
        <Header isHome={false} />
        <div className="container-x pt-40 pb-32 text-center">
          <h1 className="font-heading text-3xl text-brand-ink mb-4">الخدمة غير موجودة</h1>
          <Link to="/#services" className="btn-primary inline-flex">استعرض جميع الخدمات</Link>
        </div>
        <Footer isHome={false} />
      </div>
    );
  }

  const Icon = service.icon;
  const other = SERVICES.filter((s) => s.slug !== slug);

  return (
    <div className="bg-paper min-h-screen" data-testid={`service-page-${slug}`}>
      <Header isHome={false} />
      <main className="pt-[76px]">
        {/* رأس الصفحة */}
        <section className="relative bg-brand-ink text-white overflow-hidden">
          <div className="noise-overlay opacity-[0.05]" />
          <div className="absolute -top-16 -end-16 pointer-events-none">
            <Icon size={340} strokeWidth={0.8} className="text-brand-gold/10" />
          </div>
          <div className="container-x relative z-10 py-16 md:py-24 max-w-4xl">
            {/* مسار التنقل */}
            <nav
              aria-label="مسار التنقل"
              className="flex flex-wrap items-center gap-2 text-sm text-white/60 mb-8"
              data-testid="breadcrumbs"
            >
              <Link to="/" className="hover:text-white transition-colors">
                الرئيسية
              </Link>
              <ChevronLeft size={14} />
              <Link to="/#services" className="hover:text-white transition-colors">
                الخدمات
              </Link>
              <ChevronLeft size={14} />
              <span className="text-brand-gold">{details.heading}</span>
            </nav>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                <Icon size={26} strokeWidth={1.5} />
              </div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl md:text-6xl font-light tracking-tight leading-tight"
            >
              {details.heading}
            </motion.h1>
            {details.tagline && (
              <p className="mt-5 text-brand-gold text-lg md:text-xl font-medium leading-relaxed">
                {details.tagline}
              </p>
            )}
            <p className="mt-5 text-white/75 text-lg leading-relaxed font-light max-w-3xl">
              {details.intro}
            </p>

            {details.highlights && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {details.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-xs border border-white/20 text-white/70 px-3 py-1.5"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* بلوكات المحتوى الغني */}
        {details.blocks.map((b, i) => {
          const Cmp = BLOCKS[b.type];
          return Cmp ? <Cmp key={i} block={b} /> : null;
        })}

        {/* CTA */}
        <section className="py-16 md:py-24 bg-paper">
          <div className="container-x">
            <div className="bg-brand-ink text-white p-10 md:p-14 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
              <div>
                <h3 className="font-heading text-3xl md:text-4xl font-light leading-tight">
                  جاهزون لبدء إنجاز معاملتك
                </h3>
                <p className="text-white/70 mt-4 font-light leading-relaxed">
                  تواصل معنا الآن، ونبدأ بمراجعة ملفّك وتحديد الأوراق المطلوبة بدقّة.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={CONTACT.whatsappMsg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-brand-gold text-brand-ink px-8 py-4 font-bold hover:bg-white transition-colors"
                  data-testid="service-cta-whatsapp"
                >
                  <MessageCircle size={18} /> واتساب مباشر
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center justify-center gap-3 border border-white/40 px-8 py-4 font-medium hover:bg-white/10 transition-colors"
                  data-testid="service-cta-phone"
                >
                  <Phone size={18} /> اتصل بنا
                </a>
              </div>
            </div>

            {/* خدمات أخرى */}
            <div className="mt-16">
              <p className="overline mb-6">خدمات أخرى</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {other.map((o) => (
                  <Link
                    key={o.slug}
                    to={`/services/${o.slug}`}
                    className="group border border-black/10 hover:border-brand p-6 transition-colors duration-300 bg-white"
                    data-testid={`other-service-${o.slug}`}
                  >
                    <h4 className="font-heading text-lg font-medium text-brand-ink group-hover:text-brand transition-colors">
                      {o.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2 font-light line-clamp-3">
                      {o.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer isHome={false} />
      <FloatingContact />
    </div>
  );
}
