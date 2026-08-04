import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle, Phone } from "lucide-react";
import { MaskedLines } from "@/components/Reveal";
import { HERO, CONTACT } from "@/lib/content";

export default function Hero() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const t = setInterval(
      () => setActive((p) => (p + 1) % HERO.slides.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-brand-ink"
      data-testid="hero-section"
    >
      {/* السلايدر */}
      <div className="absolute inset-0">
        {HERO.slides.map((s, i) => (
          <div
            key={i}
            className="hero-slide absolute inset-0"
            style={{
              opacity: i === active ? 1 : 0,
              transform: i === active ? "scale(1.08)" : "scale(1)",
            }}
          >
            <img
              src={s.url}
              alt={s.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/70 to-brand-ink/40" />
        <div className="absolute inset-0 bg-brand-ink/20" />
        <div className="noise-overlay" />
      </div>

      {/* المحتوى */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-x min-h-[100svh] flex flex-col justify-center pt-24 pb-32"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-brand-gold text-sm md:text-base font-bold tracking-[0.25em] mb-6"
          data-testid="hero-overline"
        >
          {HERO.overline}
        </motion.p>

        <h1 className="font-heading font-light text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.08] tracking-tight max-w-5xl">
          <MaskedLines
            lines={HERO.titleLines}
            startDelay={0.35}
            lineClassName=""
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9 }}
          className="mt-8 text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl"
          data-testid="hero-subtitle"
        >
          {HERO.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href={CONTACT.whatsappMsg}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-brand-gold text-brand-ink rounded-none px-8 py-4 text-sm font-bold tracking-wide transition-all duration-300 hover:bg-white"
            data-testid="hero-whatsapp-btn"
          >
            <MessageCircle size={18} />
            ابدأ معاملتك عبر الواتساب
          </a>
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center gap-3 border border-white/40 text-white rounded-none px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-white/10"
            data-testid="hero-phone-btn"
          >
            <Phone size={18} />
            اتصل بنا
          </a>
        </motion.div>

        {/* إحصاءات */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className="mt-16 flex flex-wrap gap-10 md:gap-16"
          data-testid="hero-stats"
        >
          {HERO.stats.map((st) => (
            <div key={st.label} className="border-t border-white/20 pt-4">
              <div className="font-heading text-3xl md:text-4xl font-bold text-white">
                {st.value}
              </div>
              <div className="text-white/60 text-sm mt-1">{st.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* مؤشرات السلايدر + التمرير */}
      <div className="absolute bottom-8 inset-x-0 z-10 container-x flex items-center justify-between">
        <div className="flex items-center gap-2">
          {HERO.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`الشريحة ${i + 1}`}
              data-testid={`hero-slide-dot-${i}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active ? "w-10 bg-brand-gold" : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>
        <a
          href="#services"
          className="hidden md:flex items-center gap-2 text-white/70 text-xs tracking-widest hover:text-white transition-colors"
          data-testid="hero-scroll-indicator"
        >
          مرّر للأسفل
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <ArrowDown size={16} />
          </motion.span>
        </a>
      </div>
    </section>
  );
}
