import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { weddingData } from "@/data/wedding";
import HeroCountdown from "@/components/wedding/HeroCountdown";

const HeroSection = () => {
  const { couple, hero } = weddingData;

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img
          src={hero.image}
          alt={`${couple.bride} and ${couple.groom}`}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,223,160,0.18),transparent_28%,rgba(0,0,0,0.38)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,236,196,0.18),transparent_18%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px] opacity-[0.10]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%,transparent_80%,rgba(255,255,255,0.02))]" />
      </motion.div>

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/80 to-transparent" />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px] sm:h-[460px] sm:w-[460px]"
        animate={{ opacity: [0.22, 0.34, 0.22], scale: [1, 1.05, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full px-4 py-12 sm:py-20">
        <motion.div
          className="mx-auto max-w-6xl text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.p
            className="mb-4 text-[9px] uppercase tracking-[0.34em] text-gold-light/90 sm:text-[11px] sm:tracking-[0.42em]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.9 }}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.div
            className="mx-auto mb-5 flex items-center justify-center gap-3 sm:mb-6"
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60 sm:w-12" />
            <div className="h-[5px] w-[5px] rounded-full bg-gold/80 shadow-[0_0_14px_rgba(214,177,100,0.45)]" />
            <div className="gold-line h-px w-20 sm:w-28" />
            <div className="h-[5px] w-[5px] rounded-full bg-gold/80 shadow-[0_0_14px_rgba(214,177,100,0.45)]" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60 sm:w-12" />
          </motion.div>

          <motion.h1
            className="font-display text-shadow-glow text-[2.35rem] leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[7rem]"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.55, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 1.05 }}
            >
              {hero.titleLine1}
            </motion.span>

            <motion.span
              className="my-2.5 block text-[1.7rem] text-gold/90 sm:my-3 sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.88, duration: 0.75 }}
            >
              {hero.separator}
            </motion.span>

            <motion.span
              className="block"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.74, duration: 1.05 }}
            >
              {hero.titleLine2}
            </motion.span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-5 max-w-[22rem] text-[13px] font-light leading-6 text-white/80 sm:mt-6 sm:max-w-2xl sm:text-base sm:leading-8 md:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.02, duration: 0.95 }}
          >
            {hero.description}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.08, duration: 0.85 }}
          >
            <a
              href="#details"
              className="inline-flex min-h-11 w-full max-w-[15rem] items-center justify-center rounded-full bg-gold px-6 text-[10px] font-medium uppercase tracking-[0.28em] text-primary-foreground shadow-[0_16px_34px_rgba(201,162,92,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 sm:w-auto sm:max-w-none"
            >
              View Details
            </a>
            <a
              href="#rsvp"
              className="inline-flex min-h-11 w-full max-w-[15rem] items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-[10px] font-medium uppercase tracking-[0.28em] text-white shadow-[0_16px_34px_rgba(0,0,0,0.16)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:w-auto sm:max-w-none"
            >
              RSVP
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.22, duration: 0.9 }}
          >
            <HeroCountdown targetDate={hero.countdownDate} />
          </motion.div>

          <motion.div
            className="my-4 sm:my-6 flex items-center justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, scaleX: 0.88 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <div className="h-px w-10 bg-gold/40 sm:w-24" />
            <Heart className="h-4 w-4 fill-gold/25 text-gold sm:h-5 sm:w-5" />
            <div className="h-px w-10 bg-gold/40 sm:w-24" />
          </motion.div>

          <motion.div
            className="inline-flex flex-col items-center rounded-full border border-white/15 bg-white/[0.08] px-5 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl sm:px-8 sm:py-4"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.28, duration: 0.95 }}
          >
            <div className="mb-1 h-px w-10 bg-gradient-to-r from-transparent via-white/35 to-transparent sm:w-14" />
            <span className="text-[9px] uppercase tracking-[0.26em] text-white/65 sm:text-[11px] sm:tracking-[0.32em]">
              {hero.badgeLabel}
            </span>
            <span className="mt-1.5 font-display text-[1.35rem] text-white sm:mt-2 sm:text-3xl">
              {hero.dateText}
            </span>
          </motion.div>

          <motion.div
            className="mt-10 sm:mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.9 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="text-gold/75"
            >
              <ChevronDown className="mx-auto h-6 w-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
