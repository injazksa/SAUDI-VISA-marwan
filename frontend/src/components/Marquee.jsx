import Marquee from "react-fast-marquee";
import { MARQUEE_ITEMS } from "@/lib/content";

export default function EditorialMarquee() {
  return (
    <section
      className="py-10 md:py-14 bg-white border-y border-black/5 overflow-hidden"
      data-testid="marquee-section"
    >
      <Marquee speed={38} gradient={false} direction="right" autoFill>
        {MARQUEE_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center">
            <span
              className={`font-heading text-4xl md:text-6xl font-bold px-8 ${
                i % 2 === 0 ? "text-brand" : "text-stroke"
              }`}
            >
              {item}
            </span>
            <span className="text-brand-gold text-3xl md:text-5xl">•</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
