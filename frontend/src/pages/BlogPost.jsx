import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MessageCircle, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { BLOG, CONTACT, BRAND } from "@/lib/content";

const BASE = "https://saudi-services-hub-2.preview.emergentagent.com";

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = `${post.title} | ${BRAND.fullName}`;
      const md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute("content", post.excerpt);
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "ar",
        keywords: post.keywords,
        articleBody: post.body.map((s) => s.p).join(" "),
        author: { "@type": "Organization", name: BRAND.fullName },
        publisher: {
          "@type": "Organization",
          name: BRAND.fullName,
          logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${slug}` },
      });
      const bc = document.createElement("script");
      bc.type = "application/ld+json";
      bc.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: "المدونة", item: `${BASE}/#blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${BASE}/blog/${slug}` },
        ],
      });
      document.head.appendChild(script);
      document.head.appendChild(bc);
      return () => {
        script.remove();
        bc.remove();
        document.title = "مكتب المتخصصة لإنجاز معاملات السفارة السعودية | معتمد ومرخص في الأردن";
      };
    }
  }, [slug, post]);

  if (!post) {
    return (
      <div className="bg-paper min-h-screen">
        <Header isHome={false} />
        <div className="container-x pt-40 pb-32 text-center">
          <h1 className="font-heading text-3xl text-brand-ink mb-4">المقال غير موجود</h1>
          <Link to="/#blog" className="btn-primary inline-flex">العودة للمدونة</Link>
        </div>
        <Footer isHome={false} />
      </div>
    );
  }

  const related = BLOG.filter((p) => p.slug !== slug).slice(0, 2);
  const Icon = post.icon || BookOpen;

  return (
    <div className="bg-paper min-h-screen" data-testid={`blog-post-${slug}`}>
      <Header isHome={false} />
      <main className="pt-[76px]">
        {/* رأس أيقوني بدل الصورة */}
        <section className="relative bg-brand-ink text-white overflow-hidden">
          <div className="noise-overlay opacity-[0.05]" />
          <div className="absolute -top-16 -end-16 pointer-events-none">
            <Icon size={340} strokeWidth={0.8} className="text-brand-gold/10" />
          </div>
          <div className="container-x relative z-10 py-20 md:py-28 max-w-4xl">
            <Link to="/#blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-6" data-testid="blogpost-back">
              <ArrowRight size={16} /> العودة للمدونة
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <span className="text-brand-gold text-xs tracking-[0.2em] uppercase">مقال إرشادي</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-3xl md:text-5xl font-light tracking-tight leading-tight"
            >
              {post.title}
            </motion.h1>
            <div className="flex items-center gap-4 mt-5 text-white/60 text-sm">
              <span className="flex items-center gap-2"><Clock size={15} /> {post.read}</span>
              <span>·</span>
              <span>{post.date}</span>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-x max-w-3xl">
            <p className="text-lg md:text-xl text-brand-ink font-light leading-loose mb-12 pb-12 border-b border-black/10">
              {post.excerpt}
            </p>
            <div className="space-y-10">
              {post.body.map((sec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.03 }}
                >
                  <h2 className="font-heading text-2xl font-medium text-brand mb-3">{sec.h}</h2>
                  <p className="text-gray-600 leading-loose font-light">{sec.p}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 p-8 md:p-10 bg-brand-ink text-white">
              <h3 className="font-heading text-2xl font-light mb-3">هل تحتاج مساعدة في معاملتك؟</h3>
              <p className="text-white/70 mb-6 font-light">تواصل معنا الآن وسنرشدك خطوة بخطوة حتى الإنجاز.</p>
              <a href={CONTACT.whatsappMsg} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-brand-gold text-brand-ink px-8 py-4 text-sm font-bold hover:bg-white transition-colors" data-testid="blogpost-cta">
                <MessageCircle size={18} /> تواصل عبر الواتساب
              </a>
            </div>

            <div className="mt-16">
              <h3 className="overline mb-6">اقرأ أيضاً</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="group border border-black/10 hover:border-brand p-6 transition-colors duration-300" data-testid={`related-${r.slug}`}>
                    <h4 className="font-heading text-lg font-medium text-brand-ink group-hover:text-brand transition-colors">{r.title}</h4>
                    <p className="text-sm text-gray-500 mt-2 font-light">{r.excerpt}</p>
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
