import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/content";

export default function FloatingContact() {
  return (
    <motion.a
      href={CONTACT.whatsappMsg}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 start-6 z-40 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand text-white shadow-lg shadow-brand/30"
      aria-label="تواصل عبر الواتساب"
      data-testid="floating-whatsapp-btn"
    >
      <span className="absolute inset-0 rounded-full bg-brand animate-ping opacity-20" />
      <MessageCircle size={26} />
    </motion.a>
  );
}
