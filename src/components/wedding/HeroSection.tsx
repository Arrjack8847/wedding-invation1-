import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronDown, Heart } from "lucide-react";
import { useWeddingContent } from "@/context/language";
import HeroCountdown from "@/components/wedding/HeroCountdown";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HeroSection = () => {
  const { couple, hero, ui } = useWeddingContent();
  const reduceMotion = useReducedMotion();

  const bgMotion = reduceMotion
    ? {}
    : {
        scale: [1.06, 1],
      };

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-background">
      {/* BACKGROUND IMAGE */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: reduceMotion ? 1 : 1.08 }}
        animate={bgMotion}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: reduceMotion ? 0 : Infinity,
          repeatType: "reverse",
        }}
      >
        <img
          src={hero.image}
          alt={`${couple.bride} and ${couple.groom}`}
          className="h-full w-full object-cover"
          style={{
            objectPosition: "center center",
          }}
        />

        {/* MOBILE-FRIENDLY OVERLAYS */}
        <div className="absolute inset-0 bg-black/50 sm:bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-background/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,229,176,0.18),transparent_24%,rgba(0,0,0,0.32)_100%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px] opacity-[0.10] sm:block" />
      </motion.div>

      {/* TOP / BOTTOM SAFETY FADE */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/50 to-transparent sm:h-40" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/85 to-transparent sm:h-56" />

      {/* SOFT GOLD GLOW */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[44%] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[90px] sm:top-1/2 sm:h-[460px] sm:w-[460px] sm:blur-[120px]"
        animate={
          reduceMotion
            ? { opacity: 0.24 }
            : { opacity: [0.18, 0.32, 0.18], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full px-5 pb-6 pt-[max(76px,8vh)] sm:px-6 sm:py-20">
        <motion.div
          className="mx-auto flex min-h-[calc(100svh-88px)] max-w-6xl flex-col items-center justify-center text-center sm:min-h-0"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: EASE }}
        >
          {/* EYEBROW */}
          <motion.p
            className="mb-3 text-[8.5px] uppercase tracking-[0.28em] text-gold-light/90 sm:mb-4 sm:text-[11px] sm:tracking-[0.42em]"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.75, ease: EASE }}
          >
            {hero.eyebrow}
          </motion.p>

          {/* DECORATIVE LINE */}
          <motion.div
            className="mx-auto mb-4 flex items-center justify-center gap-2.5 sm:mb-6 sm:gap-3"
            initial={{ opacity: 0, scaleX: 0.86 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
          >
            <div className="h-px w-7 bg-gradient-to-r from-transparent to-gold/60 sm:w-12" />
            <div className="h-[4px] w-[4px] rounded-full bg-gold/80 shadow-[0_0_14px_rgba(214,177,100,0.45)] sm:h-[5px] sm:w-[5px]" />
            <div className="gold-line h-px w-14 sm:w-28" />
            <div className="h-[4px] w-[4px] rounded-full bg-gold/80 shadow-[0_0_14px_rgba(214,177,100,0.45)] sm:h-[5px] sm:w-[5px]" />
            <div className="h-px w-7 bg-gradient-to-l from-transparent to-gold/60 sm:w-12" />
          </motion.div>

          {/* TITLE */}
          <motion.h1
            className="font-display text-shadow-glow text-[clamp(2.2rem,10.8vw,3.65rem)] leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[7rem]"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.38, duration: 1.0, ease: EASE }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46, duration: 0.85, ease: EASE }}
            >
              {hero.titleLine1}
            </motion.span>

            <motion.span
              className="my-2 block text-[clamp(1.55rem,7vw,2.4rem)] text-gold/90 sm:my-3 sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.62, duration: 0.7, ease: EASE }}
            >
              {hero.separator}
            </motion.span>

            <motion.span
              className="block"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.54, duration: 0.85, ease: EASE }}
            >
              {hero.titleLine2}
            </motion.span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            className="mx-auto mt-4 max-w-[20rem] text-[13px] font-light leading-[1.75] text-white/90 drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)] sm:mt-6 sm:max-w-2xl sm:text-base sm:leading-8 md:text-lg"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.8, ease: EASE }}
          >
            {hero.description}
          </motion.p>

          {/* DATE BADGE */}
          <motion.div
            className="mt-4 inline-flex w-full max-w-[17.5rem] items-center justify-center gap-3 rounded-2xl border border-gold/45 bg-black/45 px-4 py-3 text-left shadow-[0_18px_45px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl sm:mt-6 sm:w-auto sm:max-w-none sm:rounded-full sm:px-6 sm:py-3.5"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.78, duration: 0.75, ease: EASE }}
          >
            <CalendarDays className="h-4 w-4 shrink-0 text-gold-light sm:h-5 sm:w-5" />

            <div>
              <span className="block text-[8px] uppercase tracking-[0.22em] text-gold-light/90 sm:text-[10px] sm:tracking-[0.28em]">
                {hero.badgeLabel}
              </span>

              <span className="mt-1 block max-w-[13rem] font-display text-[1.2rem] leading-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)] sm:max-w-none sm:text-2xl">
                {hero.dateText}
              </span>
            </div>
          </motion.div>

          {/* BUTTONS */}
          <motion.div
            className="mt-4 flex w-full flex-col items-center justify-center gap-2.5 sm:mt-8 sm:flex-row sm:gap-3"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.88, duration: 0.75, ease: EASE }}
          >
            <a
              href="#details"
              className="inline-flex min-h-10 w-full max-w-[15.5rem] items-center justify-center rounded-full bg-gold px-6 text-[9.5px] font-medium uppercase tracking-[0.24em] text-primary-foreground shadow-[0_16px_34px_rgba(201,162,92,0.28)] transition-all duration-300 active:scale-[0.98] sm:min-h-11 sm:w-auto sm:max-w-none sm:text-[10px] sm:tracking-[0.28em] sm:hover:-translate-y-0.5 sm:hover:brightness-105"
            >
              {ui.viewDetails}
            </a>

            <a
              href="#rsvp"
              className="inline-flex min-h-10 w-full max-w-[15.5rem] items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-[9.5px] font-medium uppercase tracking-[0.24em] text-white shadow-[0_16px_34px_rgba(0,0,0,0.16)] backdrop-blur-md transition-all duration-300 active:scale-[0.98] sm:min-h-11 sm:w-auto sm:max-w-none sm:text-[10px] sm:tracking-[0.28em] sm:hover:-translate-y-0.5 sm:hover:bg-white/15"
            >
              {ui.rsvpShort}
            </a>
          </motion.div>

          {/* COUNTDOWN */}
          <motion.div
            className="mt-4 w-full sm:mt-8"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.98, duration: 0.8, ease: EASE }}
          >
            <HeroCountdown targetDate={hero.countdownDate} />
          </motion.div>

          {/* SMALL DIVIDER */}
          <motion.div
            className="hidden items-center justify-center gap-3 sm:my-6 sm:flex sm:gap-4"
            initial={{ opacity: 0, scaleX: 0.9 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.05, duration: 0.7, ease: EASE }}
          >
            <div className="h-px w-8 bg-gold/35 sm:w-24" />
            <Heart className="h-3.5 w-3.5 fill-gold/25 text-gold sm:h-5 sm:w-5" />
            <div className="h-px w-8 bg-gold/35 sm:w-24" />
          </motion.div>

          {/* SCROLL HINT */}
          <motion.div
            className="mt-7 hidden sm:mt-12 sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.8, ease: EASE }}
          >
            <motion.div
              animate={
                reduceMotion
                  ? { opacity: 0.75 }
                  : { y: [0, 8, 0], opacity: [0.55, 1, 0.55] }
              }
              transition={{ duration: 2.4, repeat: Infinity }}
              className="text-gold/75"
            >
              <ChevronDown className="mx-auto h-5 w-5 sm:h-6 sm:w-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
