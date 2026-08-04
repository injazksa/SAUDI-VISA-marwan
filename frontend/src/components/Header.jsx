import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";
import { NAV, CONTACT } from "@/lib/content";

const NavLink = ({ item, isHome, onClick }) =>
  isHome ? (
    <a
      href={item.href}
      onClick={onClick}
      className="relative text-sm font-medium text-brand-ink/80 hover:text-brand transition-colors duration-300 after:absolute after:bottom-[-4px] after:start-0 after:h-px after:w-0 after:bg-brand after:transition-all after:duration-300 hover:after:w-full"
      data-testid={`nav-link-${item.href.replace("#", "")}`}
    >
      {item.label}
    </a>
  ) : (
    <Link
      to={`/${item.href}`}
      onClick={onClick}
      className="relative text-sm font-medium text-brand-ink/80 hover:text-brand transition-colors duration-300"
      data-testid={`nav-link-${item.href.replace("#", "")}`}
    >
      {item.label}
    </Link>
  );

export default function Header({ isHome = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl saturate-150 border-b border-black/5"
            : "bg-transparent"
        }`}
        data-testid="site-header"
      >
        <div className="container-x flex items-center justify-between h-[76px]">
          {isHome ? (
            <a href="#hero" aria-label="الرئيسية">
              <Logo />
            </a>
          ) : (
            <Link to="/" aria-label="الرئيسية">
              <Logo />
            </Link>
          )}

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <NavLink key={item.href} item={item} isHome={isHome} />
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={CONTACT.whatsappMsg}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group !py-3 !px-6"
              data-testid="header-whatsapp-btn"
            >
              <MessageCircle size={18} />
              <span dir="ltr">{CONTACT.phoneDisplay}</span>
            </a>
          </div>

          <button
            className="lg:hidden text-brand-ink p-2"
            onClick={() => setOpen(true)}
            aria-label="فتح القائمة"
            data-testid="menu-open-btn"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* قائمة الموبايل */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-brand-ink text-white lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            data-testid="mobile-menu"
          >
            <div className="flex items-center justify-between h-[76px] px-6">
              <Logo light />
              <button
                onClick={() => setOpen(false)}
                aria-label="إغلاق القائمة"
                data-testid="menu-close-btn"
                className="p-2"
              >
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col px-6 mt-8 gap-1">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  {isHome ? (
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-2xl font-heading font-light border-b border-white/10"
                      data-testid={`mobile-nav-${item.href.replace("#", "")}`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={`/${item.href}`}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-2xl font-heading font-light border-b border-white/10"
                      data-testid={`mobile-nav-${item.href.replace("#", "")}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
            <div className="px-6 mt-10 flex flex-col gap-3">
              <a
                href={CONTACT.whatsappMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-brand-ink py-4 font-medium"
                data-testid="mobile-whatsapp-btn"
              >
                <MessageCircle size={18} /> تواصل عبر الواتساب
              </a>
              <a
                href={CONTACT.phoneHref}
                className="flex items-center justify-center gap-3 border border-white/40 py-4 font-medium"
                data-testid="mobile-phone-btn"
              >
                <Phone size={18} /> اتصال مباشر
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
