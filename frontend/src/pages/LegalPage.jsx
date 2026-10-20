import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { CONTACT } from "@/lib/content";
import { LEGAL_MAP as LEGAL } from "@/lib/legal";

export default function LegalPage({ slug }) {
  const data = LEGAL[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      document.title = `${data.title} | مكتب المتخصصون لإنجاز معاملات السفارة السعودية`;
    }
    return () => {
      document.title =
        "مكتب المتخصصون لإنجاز معاملات السفارة السعودية | متخصّص في الأردن";
    };
  }, [slug, data]);

  if (!data) return null;

  return (
    <div className="bg-paper min-h-screen" data-testid={`legal-page-${slug}`}>
      <Header isHome={false} />

      <main className="pt-[76px]">
        {/* رأس الصفحة */}
        <section className="bg-brand-ink text-white py-20 md:py-28 relative overflow-hidden">
          <div className="noise-overlay opacity-[0.05]" />
          <div className="container-x relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-8"
              data-testid="legal-back-home"
            >
              <ArrowRight size={16} />
              العودة للرئيسية
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl md:text-6xl font-light tracking-tight"
            >
              {data.title}
            </motion.h1>
            <p className="mt-4 text-white/50 text-sm">{data.updated}</p>
          </div>
        </section>

        {/* المحتوى */}
        <section className="py-16 md:py-24">
          <div className="container-x max-w-4xl">
            <p className="text-lg md:text-xl text-brand-ink font-light leading-loose mb-12 pb-12 border-b border-black/10">
              {data.intro}
            </p>

            <div className="space-y-10">
              {data.sections.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.03 }}
                  data-testid={`legal-section-${i}`}
                >
                  <h2 className="font-heading text-xl md:text-2xl font-medium text-brand mb-3">
                    {s.h}
                  </h2>
                  <p className="text-gray-600 leading-loose font-light">{s.p}</p>
                </motion.div>
              ))}
            </div>

            {/* تواصل */}
            <div className="mt-16 pt-12 border-t border-black/10">
              <p className="text-gray-600 mb-6">
                لأي استفسار بخصوص هذه الصفحة، يسعدنا تواصلكم معنا.
              </p>
              <a
                href={CONTACT.whatsappMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-testid="legal-contact-btn"
              >
                <MessageCircle size={18} />
                تواصل معنا
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer isHome={false} />
      <FloatingContact />
    </div>
  );
}
