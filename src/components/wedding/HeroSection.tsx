import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img
          src="/hero-couple.jpg"
          alt="Myo Myat Khine and Than Htay Hlaing"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.32)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px] opacity-[0.12]" />
      </motion.div>

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 w-full px-4">
        <div className="mx-auto max-w-6xl text-center">
          <motion.p
            className="mb-5 text-[11px] uppercase tracking-[0.45em] text-gold-light sm:text-sm"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 1 }}
          >
            Together with their families
          </motion.p>

          <motion.div
            className="mx-auto mb-6 h-px w-32 gold-line sm:w-48"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.8 }}
          />

          <motion.h1
            className="font-display text-shadow-glow text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[7rem]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2 }}
          >
            Myo Myat Khine
            <span className="my-3 block text-gold/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              &
            </span>
            Than Htay Hlaing
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-white/80 sm:text-base md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            A celebration of love, devotion, and the beautiful beginning of forever.
          </motion.p>

          <motion.div
            className="my-8 flex items-center justify-center gap-4"
            initial={{ opacity: 0, scaleX: 0.85 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.15, duration: 0.8 }}
          >
            <div className="h-px w-14 bg-gold/40 sm:w-24" />
            <span className="text-gold text-lg sm:text-xl">♥</span>
            <div className="h-px w-14 bg-gold/40 sm:w-24" />
          </motion.div>

          <motion.div
            className="inline-flex flex-col items-center rounded-full border border-white/15 bg-white/10 px-8 py-4 backdrop-blur-md"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 1 }}
          >
            <span className="text-[11px] uppercase tracking-[0.35em] text-white/65 sm:text-xs">
              Wedding Celebration
            </span>
            <span className="mt-2 font-display text-2xl text-white sm:text-3xl">
              29 January 2025
            </span>
          </motion.div>

          <motion.div
            className="mt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="text-gold/75"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="mx-auto"
              >
                <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;