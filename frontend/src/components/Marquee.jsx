import { MARQUEE_ITEMS } from "@/lib/content";

// شريط تحريري ثابت بـCSS — بلا مكتبات، بلا انقطاع
export default function EditorialMarquee() {
  // نكرّر العناصر مرتين لضمان تدفّق سلس (translateX -50%)
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      className="py-10 md:py-14 bg-white border-y border-black/5 overflow-hidden"
      data-testid="marquee-section"
      aria-hidden="true"
    >
      <div className="marquee-track" dir="ltr">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap"
          >
            <span
              className={`font-heading text-4xl md:text-6xl font-bold px-8 ${
                i % 2 === 0 ? "text-brand" : "text-brand/30"
              }`}
            >
              {item}
            </span>
            <span className="text-brand-gold text-3xl md:text-5xl">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
