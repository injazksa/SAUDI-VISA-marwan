import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";

// أكورديون أسئلة شائعة مشترك — يدعم إجابات مع قوائم ونص ختامي
export default function FaqList({ items, idPrefix = "faq", defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div data-testid={`${idPrefix}-list`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={i} delay={Math.min(i * 0.04, 0.3)}>
            <div
              className={`border-b border-black/10 transition-colors duration-300 ${
                isOpen ? "bg-brand/[0.03]" : ""
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-6 py-6 px-2 text-start"
                data-testid={`${idPrefix}-question-${i}`}
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
                    data-testid={`${idPrefix}-answer-${i}`}
                  >
                    <div className="pb-6 px-2 text-gray-600 leading-loose font-light max-w-3xl">
                      <p>{item.a}</p>
                      {item.list && (
                        <ul className="mt-4 space-y-2.5">
                          {item.list.map((li, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 bg-brand-gold mt-3 shrink-0" />
                              <span>{li}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.after && <p className="mt-4">{item.after}</p>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
