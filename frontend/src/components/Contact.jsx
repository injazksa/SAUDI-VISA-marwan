import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock, ArrowLeft } from "lucide-react";
import { MaskedLines } from "@/components/Reveal";
import { CONTACT } from "@/lib/content";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 md:py-32 lg:py-40 bg-brand-ink text-white relative overflow-hidden"
      data-testid="contact-section"
    >
      <div className="noise-overlay opacity-[0.05]" />
      <div className="container-x relative z-10">
        <p className="text-brand-gold text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6">
          تواصل معنا
        </p>
        <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05]">
          <MaskedLines lines={["جاهزون", "لإنجاز معاملتك"]} />
        </h2>

        <div className="mt-14 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
          {/* أزرار التواصل */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <a
              href={CONTACT.whatsappMsg}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 bg-brand-gold text-brand-ink p-6 md:p-8 transition-all duration-300 hover:bg-white"
              data-testid="contact-whatsapp-btn"
            >
              <div className="flex items-center gap-4">
                <MessageCircle size={28} />
                <div>
                  <div className="font-heading text-lg font-bold">
                    راسلنا على الواتساب
                  </div>
                  <div dir="ltr" className="text-sm">
                    {CONTACT.phoneDisplay}
                  </div>
                </div>
              </div>
              <ArrowLeft
                size={22}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
            </a>

            <a
              href={CONTACT.phoneHref}
              className="group flex items-center justify-between gap-4 border border-white/25 p-6 md:p-8 transition-all duration-300 hover:bg-white/10"
              data-testid="contact-phone-btn"
            >
              <div className="flex items-center gap-4">
                <Phone size={28} className="text-brand-gold" />
                <div>
                  <div className="font-heading text-lg font-bold">
                    اتصل بنا مباشرةً
                  </div>
                  <div dir="ltr" className="text-sm text-white/70">
                    {CONTACT.phoneDisplay}
                  </div>
                </div>
              </div>
              <ArrowLeft
                size={22}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
            </a>
          </motion.div>

          {/* المعلومات */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4 border-t border-white/15 pt-6">
              <MapPin size={22} className="text-brand-gold mt-1 shrink-0" />
              <div>
                <div className="text-white/50 text-sm mb-1">العنوان</div>
                <p className="text-white/90 leading-relaxed">{CONTACT.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 border-t border-white/15 pt-6">
              <Clock size={22} className="text-brand-gold mt-1 shrink-0" />
              <div>
                <div className="text-white/50 text-sm mb-1">ساعات العمل</div>
                <p className="text-white/90">{CONTACT.hours}</p>
                <p className="text-white/50 text-sm mt-1">{CONTACT.hoursOff}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
