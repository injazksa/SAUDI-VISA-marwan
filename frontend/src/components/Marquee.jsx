import { MARQUEE_ITEMS } from "@/lib/content";

// شريط إخباري CSS خالص — حلقة لا نهائية سلسة بلا انقطاع
export default function EditorialMarquee() {
  // نكرّر مرتين: عند translateX(-50%) يحلّ النصف الثاني محلّ الأول تماماً
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      className="py-10 md:py-14 bg-white border-y border-black/5"
      data-testid="marquee-section"
      aria-hidden="true"
    >
      <div className="marquee-viewport">
        <div className="marquee-track" dir="ltr">
          {items.map((item, i) => (
            <span key={i} className="marquee-item">
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
      </div>
    </section>
  );
}
