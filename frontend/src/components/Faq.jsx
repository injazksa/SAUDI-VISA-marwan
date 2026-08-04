import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FAQ } from "@/lib/content";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="py-20 md:py-32 lg:py-40 bg-paper"
      data-testid="faq-section"
    >
      <div className="container-x grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        <Reveal>
          <p className="overline mb-4">الأسئلة الشائعة</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light tracking-tight text-brand-ink leading-tight">
            كل ما تودّون
            <br />
            معرفته
          </h2>
          <p className="mt-6 text-gray-600 font-light leading-relaxed">
            لم تجدوا إجابتكم؟ تواصلوا معنا مباشرةً وسنجيب على كل استفساراتكم.
          </p>
        </Reveal>

        <div data-testid="faq-list">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="border-b border-black/10">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-start"
                    data-testid={`faq-question-${i}`}
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-heading text-lg md:text-2xl font-light transition-colors duration-300 ${
                        isOpen ? "text-brand" : "text-brand-ink"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span className="shrink-0 text-brand">
                      {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                        data-testid={`faq-answer-${i}`}
                      >
                        <p className="pb-6 text-gray-600 leading-loose font-light max-w-2xl">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
