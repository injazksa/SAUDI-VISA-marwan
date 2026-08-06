import { MapPin, ExternalLink } from "lucide-react";
import { CONTACT } from "@/lib/content";

// إحداثيات الدوّار الأول — جبل عمّان (Duwwar Al-Awwal, Jabal Amman)
const LAT = 31.9528;
const LNG = 35.9283;
const BBOX = `${LNG - 0.0045},${LAT - 0.0025},${LNG + 0.0045},${LAT + 0.0025}`;

export default function LocationMap() {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${LAT},${LNG}`;
  const fullMapUrl = `https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LNG}#map=16/${LAT}/${LNG}`;

  return (
    <section
      className="bg-brand-ink text-white border-t border-white/10"
      data-testid="location-map-section"
    >
      <div className="container-x py-14 md:py-16 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-center">
        <div>
          <p className="text-brand-gold text-xs tracking-[0.2em] uppercase mb-3">
            موقعنا
          </p>
          <h3 className="font-heading text-2xl md:text-3xl font-light leading-tight">
            الأردن — عمّان — جبل عمّان
            <br />
            <span className="text-brand-gold">الدوّار الأول</span>
          </h3>
          <p className="mt-4 text-white/60 leading-relaxed font-light">
            {CONTACT.address}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={fullMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/25 hover:bg-white/10 px-5 py-2.5 text-sm transition-colors"
              data-testid="open-map-btn"
            >
              <MapPin size={16} /> افتح الخريطة كاملة
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
        <div className="relative border border-white/15 overflow-hidden h-[260px] md:h-[320px] bg-white/5">
          <iframe
            title="موقع مكتب المتخصصة على الخريطة — الدوّار الأول، جبل عمّان"
            src={mapUrl}
            loading="lazy"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0, filter: "grayscale(0.15) contrast(1.02)" }}
            data-testid="location-iframe"
          />
        </div>
      </div>
    </section>
  );
}
