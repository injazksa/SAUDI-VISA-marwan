import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { BLOG, CONTACT, BRAND } from "@/lib/content";

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = `${post.title} | ${BRAND.fullName}`;
      const md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute("content", post.excerpt);
    }
    return () => {
      document.title =
        "مكتب المتخصصة لإنجاز معاملات السفارة السعودية | معتمد ومرخص في الأردن";
    };
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

  return (
    <div className="bg-paper min-h-screen" data-testid={`blog-post-${slug}`}>
      <Header isHome={false} />
      <main className="pt-[76px]">
        {/* رأس */}
        <section className="relative bg-brand-ink text-white overflow-hidden">
          <div className="absolute inset-0">
            <img src={post.image.replace(/w=\d+&h=\d+/, "w=1600&h=900")} alt={post.title} className="w-full h-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/85 to-brand-ink/70" />
          </div>
          <div className="container-x relative z-10 py-20 md:py-28 max-w-4xl">
            <Link to="/#blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-6" data-testid="blogpost-back">
              <ArrowRight size={16} /> العودة للمدونة
            </Link>
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

        {/* المحتوى */}
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

            {/* مقالات ذات صلة */}
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
