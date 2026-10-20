import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home as HomeIcon, MessageCircle } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { CONTACT } from "@/lib/content";

export default function NotFound() {
  useEffect(() => {
    document.title = "الصفحة غير موجودة (404) | مكتب المتخصصون";
    return () => {
      document.title =
        "مكتب المتخصصون لإنجاز معاملات السفارة السعودية | متخصّص في الأردن";
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-brand-ink text-white flex flex-col items-center justify-center px-6 relative overflow-hidden"
      data-testid="notfound-page"
    >
      <div className="noise-overlay opacity-[0.05]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center max-w-lg"
      >
        <LogoMark size={90} className="mx-auto mb-8" />
        <div className="font-heading text-7xl md:text-9xl font-black text-brand-gold">404</div>
        <h1 className="font-heading text-2xl md:text-3xl font-light mt-4">
          عذراً، الصفحة غير موجودة
        </h1>
        <p className="text-white/60 mt-4 leading-relaxed font-light">
          يبدو أن الرابط الذي تبحث عنه غير صحيح أو تم نقله. يمكنك العودة للصفحة
          الرئيسية أو التواصل معنا مباشرةً.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link to="/" className="inline-flex items-center gap-3 bg-white text-brand-ink px-8 py-4 text-sm font-medium hover:bg-brand-gold transition-colors" data-testid="notfound-home-btn">
            <HomeIcon size={18} /> العودة للرئيسية
          </Link>
          <a href={CONTACT.whatsappMsg} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-white/40 px-8 py-4 text-sm font-medium hover:bg-white/10 transition-colors" data-testid="notfound-whatsapp-btn">
            <MessageCircle size={18} /> تواصل معنا
          </a>
        </div>
      </motion.div>
    </div>
  );
}
