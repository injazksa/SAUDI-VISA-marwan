import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { MaskedLines } from "@/components/Reveal";
import { HERO, CONTACT } from "@/lib/content";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.15]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-brand-ink"
      data-testid="hero-section"
    >
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <img
          src={HERO.image}
          alt="مكتب المتخصصون — أعلام الأردن والسعودية"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/70 to-brand-ink/40" />
        <div className="absolute inset-0 bg-brand-ink/25" />
        <div className="noise-overlay" />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-x min-h-[100svh] flex flex-col justify-center pt-24 pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="inline-flex items-center gap-2 self-start border border-brand-gold/50 bg-brand-gold/10 backdrop-blur-sm text-brand-gold px-4 py-2 text-xs md:text-sm font-bold mb-8"
          data-testid="hero-accreditation-badge"
        >
          <ShieldCheck size={16} className="shrink-0" />
          {HERO.badge}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-brand-gold text-sm md:text-base font-bold tracking-[0.25em] mb-6"
          data-testid="hero-overline"
        >
          {HERO.overline}
        </motion.p>

        <h1 className="font-heading font-light text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.3] tracking-tight max-w-5xl">
          <MaskedLines lines={HERO.titleLines} startDelay={0.35} />
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className="mt-16 flex flex-wrap gap-x-10 gap-y-4 md:gap-x-16"
          data-testid="hero-pillars"
        >
          {HERO.pillars.map((p) => (
            <div key={p.label} className="border-t border-white/20 pt-4">
              <div className="font-heading text-xl md:text-2xl font-medium text-white">
                {p.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <a
        href="#about"
        className="absolute bottom-8 start-6 md:start-12 z-10 hidden md:flex items-center gap-2 text-white/70 text-xs tracking-widest hover:text-white transition-colors"
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
    </section>
  );
}
