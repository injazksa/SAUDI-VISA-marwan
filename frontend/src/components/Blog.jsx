import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BLOG } from "@/lib/content";

export default function Blog() {
  return (
    <section
      id="blog"
      className="py-20 md:py-32 lg:py-40 bg-paper"
      data-testid="blog-section"
    >
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-20">
          <div className="max-w-2xl">
            <p className="overline mb-4">المدونة الإرشادية</p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-brand-ink leading-tight">
              مقالات تشرح لك
              <br />
              <span className="text-brand">إجراءات السفارة السعودية</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {BLOG.map((post, i) => {
            const Icon = post.icon;
            return (
              <Reveal key={post.slug} delay={i * 0.1}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-white border border-black/10 hover:border-brand transition-colors duration-500 h-full"
                  data-testid={`blog-card-${post.slug}`}
                >
                  {/* رأس أيقوني */}
                  <div className="relative aspect-[16/9] bg-brand-ink flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.06]">
                      <div className="noise-overlay" />
                    </div>
                    <div className="absolute -top-6 -end-6 font-heading text-[9rem] font-black text-white/[0.05] leading-none pointer-events-none">
                      0{i + 1}
                    </div>
                    {Icon && (
                      <Icon
                        size={72}
                        strokeWidth={1.2}
                        className="text-brand-gold group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <Clock size={14} /> {post.read}
                    </div>
                    <h3 className="font-heading text-xl md:text-2xl font-medium text-brand-ink leading-snug group-hover:text-brand transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-gray-600 text-sm leading-relaxed font-light">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-brand text-sm font-medium">
                      اقرأ المقال
                      <ArrowLeft
                        size={16}
                        className="group-hover:-translate-x-1 transition-transform duration-300"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
