import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="رجوع لأعلى الصفحة"
      data-testid="back-to-top"
      className={`fixed bottom-6 end-6 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-brand-ink text-white border border-white/15 shadow-md transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-3"
      } hover:bg-brand`}
    >
      <ArrowUp size={20} />
    </button>
  );
}
