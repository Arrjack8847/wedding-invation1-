import { motion } from "framer-motion";
import type { Stage } from "./EnvelopeOpening";

interface ExpandedLetterProps {
  stage: Stage;
  onClick: () => void;
}

const ExpandedLetter = ({ stage, onClick }: ExpandedLetterProps) => {
  return (
    <motion.div
      className="absolute inset-0 z-[60] flex items-center justify-center px-4 py-6 sm:px-10 sm:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: stage === "closing" ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onClick={onClick}
    >
      {/* main card */}
      <motion.div
        initial={{
          scale: 0.85,
          y: 80,
          opacity: 0,
        }}
        animate={{
          scale: stage === "closing" ? 1.05 : 1,
          y: 0,
          opacity: stage === "closing" ? 0 : 1,
        }}
        transition={{
          duration: stage === "closing" ? 0.8 : 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full max-w-2xl rounded-[16px] bg-[#fffdf8] shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
        style={{
          border: "1px solid rgba(216,193,160,0.6)",
        }}
      >
        {/* subtle border inset */}
        <div className="absolute inset-[10px] border border-[#e6d3b8]/40 rounded-[12px]" />

        {/* top line */}
        <div className="absolute left-1/2 top-6 h-px w-16 -translate-x-1/2 bg-[#d8c1a0]/70" />

        {/* bottom line */}
        <div className="absolute left-1/2 bottom-6 h-px w-16 -translate-x-1/2 bg-[#d8c1a0]/70" />

        {/* content */}
        <div className="relative z-10 px-6 py-12 text-center sm:px-12 sm:py-16">
          <motion.p
            className="mb-4 text-[10px] uppercase tracking-[0.34em] text-[#a78654]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Wedding Invitation
          </motion.p>

          <motion.h1
            className="font-display text-3xl text-[#3e3126] sm:text-4xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Myo Myat Khine
          </motion.h1>

          <motion.p
            className="my-2 text-lg text-[#b38a52]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            &
          </motion.p>

          <motion.h1
            className="font-display text-3xl text-[#3e3126] sm:text-4xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Than Htay Hlaing
          </motion.h1>

          <motion.div
            className="my-6 h-px w-14 bg-[#d8c1a0]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6 }}
          />

          <motion.p
            className="text-sm leading-relaxed text-[#6f6150] sm:text-base"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            Together with our families, we invite you to celebrate our
            wedding and the beginning of our forever.
          </motion.p>

          <motion.p
            className="mt-6 text-xs uppercase tracking-[0.28em] text-[#7d6b54]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            29 January 2023
          </motion.p>
        </div>

        {/* hint */}
        <motion.p
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.26em] text-[#7c6a55]/70"
          animate={{ opacity: [0.3, 0.85, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap to continue
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ExpandedLetter;