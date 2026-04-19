import { motion } from "framer-motion";
import type { Stage } from "./EnvelopeOpening";

interface ExpandedLetterProps {
  stage: Stage;
  onClick: () => void;
}

const easeOutExpo = [0.19, 1, 0.22, 1];

const ExpandedLetter = ({ stage, onClick }: ExpandedLetterProps) => {
  const isClosing = stage === "closing";

  return (
    <motion.div
      className="absolute inset-0 z-[60] flex items-center justify-center px-4 py-6 sm:px-8 sm:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      onClick={onClick}
    >
      {/* background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(255,240,220,0.4),transparent_70%)]" />

      <motion.div
        initial={{
          scale: 0.9,
          y: 70,
          opacity: 0,
        }}
        animate={{
          scale: isClosing ? 1.03 : 1,
          y: 0,
          opacity: isClosing ? 0 : 1,
        }}
        transition={{
          duration: isClosing ? 0.75 : 0.95,
          ease: easeOutExpo,
        }}
        className="relative w-full max-w-[520px] aspect-[3/4] overflow-hidden rounded-[24px] 
        bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.8),transparent_60%),linear-gradient(180deg,#fffefb_0%,#f9f1e6_100%)] 
        shadow-[0_20px_60px_rgba(80,60,30,0.15)]"
        style={{
          border: "1px solid rgba(216,193,160,0.55)",
        }}
      >
        {/* inset border */}
        <div className="absolute inset-[12px] rounded-[18px] border border-[#e6d3b8]/45" />

        {/* decorative top */}
        <div className="absolute left-1/2 top-7 flex -translate-x-1/2 items-center gap-3">
          <div className="h-px w-10 bg-[#d8c1a0]/50" />
          <div className="h-[5px] w-[5px] rounded-full bg-[#c6a96b]" />
          <div className="h-px w-10 bg-[#d8c1a0]/50" />
        </div>

        {/* decorative bottom */}
        <div className="absolute left-1/2 bottom-7 flex -translate-x-1/2 items-center gap-3">
          <div className="h-px w-10 bg-[#d8c1a0]/50" />
          <div className="h-[5px] w-[5px] rounded-full bg-[#c6a96b]" />
          <div className="h-px w-10 bg-[#d8c1a0]/50" />
        </div>

        {/* content */}
        <div className="relative z-10 px-6 py-14 text-center sm:px-10 sm:py-16">
          {/* label */}
          <motion.p
            className="mb-6 text-[10px] uppercase tracking-[0.38em] text-[#a78654]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: easeOutExpo }}
          >
            Wedding Invitation
          </motion.p>

          {/* name 1 */}
          <motion.h1
            className="font-display text-[30px] leading-tight text-[#3e3126]"
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 1.1, ease: easeOutExpo }}
          >
            Myo Myat Khine
          </motion.h1>

          {/* & */}
          <motion.p
            className="my-4 text-lg italic text-[#b38a52]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            &
          </motion.p>

          {/* name 2 */}
          <motion.h1
            className="font-display text-[30px] leading-tight text-[#3e3126]"
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 1.1, ease: easeOutExpo }}
          >
            Than Htay Hlaing
          </motion.h1>

          {/* divider */}
          <motion.div
            className="flex items-center justify-center gap-3 my-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="h-px w-10 bg-[#d8c1a0]/50" />
            <div className="w-2 h-2 rounded-full bg-[#c6a96b]" />
            <div className="h-px w-10 bg-[#d8c1a0]/50" />
          </motion.div>

          {/* description */}
          <motion.p
            className="mx-auto max-w-[420px] text-sm leading-7 text-[#6f6150]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: easeOutExpo }}
          >
            Together with our families, we invite you to celebrate our wedding
            and the beginning of our forever.
          </motion.p>

          {/* date */}
          <motion.p
            className="mt-10 text-[11px] uppercase tracking-[0.32em] text-[#7d6b54]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6, ease: easeOutExpo }}
          >
            29 January 2023
          </motion.p>
        </div>

        {/* hint */}
        <motion.p
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.34em] text-[#8a7356]/70"
          animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Open Invitation
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ExpandedLetter;