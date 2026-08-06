import { BRAND } from "@/lib/content";

// الشعار: صورة الختم الرسمية بخلفية شفافة
export const LogoMark = ({ size = 48, className = "" }) => (
  <img
    src="/logo.png"
    alt={BRAND.fullName}
    width={size}
    height={size}
    className={`object-contain ${className}`}
    style={{ width: size, height: size }}
    loading="eager"
    decoding="async"
  />
);

export const Logo = ({ light = false, size = 50, stacked = true }) => {
  const nameColor = light ? "text-white" : "text-brand-ink";
  const tagColor = light ? "text-white/70" : "text-brand";
  return (
    <div className="flex items-center gap-3" data-testid="brand-logo">
      <LogoMark size={size} />
      {stacked && (
        <div className="flex flex-col leading-tight">
          <span className={`font-heading font-bold text-base md:text-lg ${nameColor}`}>
            مكتب المتخصصة
          </span>
          <span className={`text-[10px] md:text-[11px] font-medium ${tagColor}`}>
            لإنجاز معاملات السفارة السعودية
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
