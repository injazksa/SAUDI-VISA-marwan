import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

// كشف عند التمرير
export const Reveal = ({ children, delay = 0, y = 40, className = "", ...props }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// كشف سطري بقناع (للعناوين)
export const MaskedLines = ({ lines, className = "", lineClassName = "", startDelay = 0 }) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className="reveal-line-wrap">
        <motion.span
          className={`block ${lineClassName}`}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: 1,
            delay: startDelay + i * 0.12,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);

export { EASE };
