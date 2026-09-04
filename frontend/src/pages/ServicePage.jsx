import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  FileText,
  Phone,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Reveal } from "@/components/Reveal";
import { SERVICES, CONTACT, BRAND } from "@/lib/content";
import { SERVICE_DETAILS } from "@/lib/services";

const BASE = typeof window !== "undefined" ? window.location.origin : "";

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
        document.title = "مكتب المتخصصون لإنجاز معاملات السفارة السعودية | معتمد ومرخص في الأردن";
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
        {/* رأس أيقوني بدل الصورة */}
        <section className="relative bg-brand-ink text-white overflow-hidden">
          <div className="noise-overlay opacity-[0.05]" />
          <div className="absolute -top-16 -end-16 pointer-events-none">
            <Icon size={340} strokeWidth={0.8} className="text-brand-gold/10" />
          </div>
          <div className="container-x relative z-10 py-20 md:py-28 max-w-4xl">
            <Link
              to="/#services"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-6"
              data-testid="service-back"
            >
              <ArrowRight size={16} /> الخدمات
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <span className="text-brand-gold text-xs tracking-[0.2em] uppercase">خدمة معتمدة</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl md:text-6xl font-light tracking-tight leading-tight"
            >
              {details.heading}
            </motion.h1>
            <p className="mt-6 text-white/75 text-lg leading-relaxed font-light max-w-3xl">
              {details.intro}
            </p>
          </div>
        </section>

        {/* ماذا نُقدّم */}
        <section className="py-16 md:py-24">
          <div className="container-x grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
            <Reveal>
              <p className="overline mb-4">ما نُقدّم</p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-brand-ink leading-tight">
                نطاق خدمتنا التفصيلي
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-4">
                {details.what.map((w, i) => (
                  <li key={i} className="flex items-start gap-3 pb-4 border-b border-black/10">
                    <CheckCircle2 size={20} className="text-brand mt-0.5 shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{w}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* الإجراءات */}
        <section className="py-16 md:py-24 bg-brand-ink text-white relative overflow-hidden">
          <div className="noise-overlay opacity-[0.05]" />
          <div className="container-x relative z-10">
            <Reveal className="max-w-3xl mb-14">
              <p className="text-brand-gold text-xs tracking-[0.2em] uppercase mb-4">خطوات الإنجاز</p>
              <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight">
                كيف نعمل مع ملفّك
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8">
              {details.steps.map((st, i) => (
                <Reveal
                  key={i}
                  delay={i * 0.08}
                  className="relative pt-10 border-t border-white/15"
                  data-testid={`service-step-${i}`}
                >
                  <span className="absolute -top-2 end-0 font-heading text-7xl font-black text-white/[0.06] pointer-events-none">
                    0{i + 1}
                  </span>
                  <div className="font-heading text-brand-gold text-lg mb-3">0{i + 1}</div>
                  <h3 className="font-heading text-xl md:text-2xl font-medium mb-3">{st.h}</h3>
                  <p className="text-white/60 leading-relaxed font-light">{st.p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* الأوراق المطلوبة */}
        <section className="py-16 md:py-24">
          <div className="container-x grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
            <Reveal>
              <div className="w-14 h-14 flex items-center justify-center border border-brand/30 text-brand mb-6">
                <FileText size={26} strokeWidth={1.5} />
              </div>
              <p className="overline mb-4">الأوراق المطلوبة</p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-brand-ink leading-tight">
                جهّز ملفّك بدقّة
              </h2>
              <p className="mt-4 text-gray-600 font-light leading-relaxed">
                القائمة أدناه إرشادية وقد تختلف قليلاً حسب حالتك. نراجع ملفّك مسبقاً ونحدّد لك المطلوب بدقّة.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="grid sm:grid-cols-2 gap-x-8">
                {details.docs.map((d, i) => (
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

        {/* أسئلة شائعة */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-x max-w-4xl">
            <Reveal className="mb-10">
              <p className="overline mb-3">أسئلة شائعة</p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-brand-ink leading-tight">
                إجابات سريعة عن هذه الخدمة
              </h2>
            </Reveal>
            <div>
              {details.faqs.map((f, i) => (
                <Reveal
                  key={i}
                  delay={i * 0.05}
                  className="border-b border-black/10 py-6"
                  data-testid={`service-faq-${i}`}
                >
                  <h3 className="font-heading text-lg md:text-xl font-medium text-brand-ink mb-2">
                    {f.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">{f.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-paper">
          <div className="container-x">
            <div className="bg-brand-ink text-white p-10 md:p-14 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
              <div>
                <h3 className="font-heading text-3xl md:text-4xl font-light leading-tight">
                  جاهزون لبدء إنجاز معاملتك
                </h3>
                <p className="text-white/70 mt-4 font-light leading-relaxed">
                  تواصل معنا الآن، ونبدأ بمراجعة ملفّك مجاناً وتحديد الأوراق المطلوبة بدقّة.
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
