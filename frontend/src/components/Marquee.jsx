import { MARQUEE_ITEMS } from "@/lib/content";

// شريط إخباري متواصل — نمط قطعتَين متطابقتَين تُترجَمان -100% معاً
// يضمن استمرارية بصرية بلا انقطاع على كل المتصفحات والشاشات
export default function EditorialMarquee() {
  const Row = ({ ariaHidden = false }) => (
    <div className="marquee-content" aria-hidden={ariaHidden || undefined}>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="marquee-item">
          <span className="font-body text-2xl md:text-4xl font-semibold text-brand tracking-tight">
            {item}
          </span>
          <span className="text-brand-gold text-2xl md:text-3xl ms-6 me-0" aria-hidden="true">
            •
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      className="marquee-section py-8 md:py-12 bg-white border-y border-black/5"
      data-testid="marquee-section"
      aria-label="خدمات المكتب — شريط متحرك"
    >
      <div className="marquee-inner" dir="ltr">
        <Row />
        <Row ariaHidden />
      </div>
    </section>
  );
}
