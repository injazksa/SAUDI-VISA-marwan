import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { NAV, CONTACT, BRAND } from "@/lib/content";

export default function Footer({ isHome = true }) {
  const year = new Date().getFullYear();
  const anchor = (href) => (isHome ? href : `/${href}`);

  return (
    <footer className="bg-brand-ink text-white border-t border-white/10" data-testid="site-footer">
      <div className="container-x py-16 md:py-20">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
          {/* العلامة */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <LogoMark size={48} />
              <div>
                <div className="font-heading font-bold text-lg">{BRAND.name}</div>
                <div className="text-white/60 text-xs">{BRAND.tagline}</div>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed font-light max-w-md">
              {BRAND.fullName} — نُنجز معاملاتكم لدى السفارة السعودية في الأردن
              بسرعة وموثوقية وإتقان.
            </p>
            <div className="flex items-start gap-3 mt-6 text-white/70 text-sm">
              <MapPin size={18} className="text-brand-gold mt-0.5 shrink-0" />
              {CONTACT.address}
            </div>
          </div>

          {/* روابط */}
          <div>
            <div className="text-brand-gold text-sm font-bold tracking-wider mb-6">
              روابط سريعة
            </div>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  {isHome ? (
                    <a
                      href={n.href}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                      data-testid={`footer-link-${n.href.replace("#", "")}`}
                    >
                      {n.label}
                    </a>
                  ) : (
                    <Link
                      to={anchor(n.href)}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                      data-testid={`footer-link-${n.href.replace("#", "")}`}
                    >
                      {n.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* تواصل + قانوني */}
          <div>
            <div className="text-brand-gold text-sm font-bold tracking-wider mb-6">
              تواصل
            </div>
            <a
              href={CONTACT.whatsappMsg}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors mb-3"
              data-testid="footer-whatsapp"
            >
              <MessageCircle size={18} className="text-brand-gold" />
              <span dir="ltr">{CONTACT.phoneDisplay}</span>
            </a>
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors mb-8"
              data-testid="footer-phone"
            >
              <Phone size={18} className="text-brand-gold" />
              <span dir="ltr">{CONTACT.phoneDisplay}</span>
            </a>

            <div className="text-brand-gold text-sm font-bold tracking-wider mb-4">
              قانوني
            </div>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-white/70 hover:text-white transition-colors text-sm" data-testid="footer-privacy">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/70 hover:text-white transition-colors text-sm" data-testid="footer-terms">
                  شروط الاستخدام
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-white/70 hover:text-white transition-colors text-sm" data-testid="footer-disclaimer">
                  إخلاء المسؤولية
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/50 text-sm">
          <p>© {year} {BRAND.fullName}. جميع الحقوق محفوظة.</p>
          <p className="text-white/40">
            مكتب مستقل معتمد — ليس جهة حكومية ولا يمثّل السفارة رسمياً.
          </p>
        </div>
      </div>
    </footer>
  );
}
