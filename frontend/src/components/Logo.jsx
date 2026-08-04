import { BRAND } from "@/lib/content";

// شعار أصلي مميّز — ختم هندسي بالهوية السعودية (أخضر/أبيض) مع لمسة ذهبية
export const LogoMark = ({ size = 44, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="60" height="60" rx="14" fill="#006C35" />
    <rect
      x="7.5"
      y="7.5"
      width="49"
      height="49"
      rx="10"
      stroke="#C5A059"
      strokeWidth="1.2"
      opacity="0.85"
    />
    {/* نجمة/بوصلة الإنجاز */}
    <path
      d="M32 14 L36 28 L50 32 L36 36 L32 50 L28 36 L14 32 L28 28 Z"
      fill="#ffffff"
    />
    <circle cx="32" cy="32" r="4.2" fill="#006C35" />
    <circle cx="32" cy="32" r="4.2" stroke="#C5A059" strokeWidth="1" />
  </svg>
);

export const Logo = ({ light = false, size = 44, stacked = true }) => {
  const nameColor = light ? "text-white" : "text-brand-ink";
  const tagColor = light ? "text-white/70" : "text-brand";
  return (
    <div className="flex items-center gap-3" data-testid="brand-logo">
      <LogoMark size={size} />
      {stacked && (
        <div className="flex flex-col leading-tight">
          <span className={`font-heading font-bold text-base md:text-lg ${nameColor}`}>
            المتخصصة
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
