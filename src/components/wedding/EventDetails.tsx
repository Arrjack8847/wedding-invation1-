import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock3, CalendarDays, PhoneCall } from "lucide-react";
import { weddingData } from "@/data/wedding";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const iconMap = {
  calendar: CalendarDays,
  clock: Clock3,
  mapPin: MapPin,
  phone: PhoneCall,
} as const;

const EventDetails = () => {
  const { event } = weddingData;
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="details"
      className="relative flex min-h-screen items-center overflow-hidden px-4 py-14 sm:px-6 sm:py-24"
    >
      {/* BACKGROUND */}
      <div className="section-glow absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#f8f1e8] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(212,175,108,0.16),transparent_34%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white/35 to-transparent" />

      {/* SOFT GOLD DECOR */}
      <div className="pointer-events-none absolute left-6 top-20 h-2 w-2 rounded-full bg-gold/50" />
      <div className="pointer-events-none absolute right-8 top-32 h-3 w-3 rounded-full bg-gold/40" />
      <div className="pointer-events-none absolute bottom-24 left-10 h-3 w-3 rounded-full bg-gold/30" />
      <div className="pointer-events-none absolute bottom-36 right-10 h-2 w-2 rounded-full bg-gold/50" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="mb-3 text-[9px] uppercase tracking-[0.36em] text-gold/75 sm:text-[11px] sm:tracking-[0.45em]"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {event.eyebrow}
          </motion.p>

          <motion.h2
            className="font-display text-[2.55rem] font-medium leading-[0.95] tracking-[0.01em] text-foreground sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {event.title}
          </motion.h2>

          <motion.div
            className="gold-line mx-auto mt-5 h-px w-24"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          />

          <motion.p
            className="mx-auto mt-5 max-w-[22rem] text-[13.5px] leading-[1.75] text-muted-foreground sm:max-w-2xl sm:text-base sm:leading-8"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {event.description}
          </motion.p>
        </div>

        {/* ONE-PAGE COMPACT DETAILS */}
        <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
          {event.items.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={item.label}
                className="luxury-card group relative min-h-[155px] overflow-hidden rounded-[24px] border border-white/50 bg-white/40 p-4 shadow-[0_18px_46px_rgba(111,84,42,0.1)] backdrop-blur-xl sm:min-h-[220px] sm:rounded-[30px] sm:p-7"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.07,
                  ease: EASE,
                }}
                viewport={{ once: true, amount: 0.25 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,108,0.16),transparent_45%)]" />

                <div className="relative z-10 mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20 sm:mb-6 sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 text-gold sm:h-6 sm:w-6" />
                </div>

                <p className="relative z-10 mb-2 text-[8px] uppercase tracking-[0.28em] text-gold/75 sm:mb-3 sm:text-[10px] sm:tracking-[0.4em]">
                  {item.label}
                </p>

                <p className="font-display relative z-10 whitespace-pre-line text-[1rem] font-normal leading-[1.35] tracking-[0.01em] text-foreground/90 sm:text-[1.35rem] sm:leading-[1.45]">
                  {item.value}
                </p>

                <div className="relative z-10 mt-4 flex items-center gap-2 sm:mt-6">
                  <span className="h-px w-8 bg-gold/35 sm:w-12" />
                  <span className="h-1 w-1 rotate-45 bg-gold/70" />
                  <span className="h-px w-5 bg-gold/25 sm:w-8" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ACTION BUTTONS */}
        <motion.div
          className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.75, ease: EASE }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gold px-6 text-[10px] font-medium uppercase tracking-[0.24em] text-primary-foreground shadow-[0_16px_34px_rgba(201,162,92,0.26)] transition-all duration-300 active:scale-[0.98] sm:min-h-[56px] sm:text-[11px] sm:tracking-[0.28em] sm:hover:-translate-y-0.5 sm:hover:brightness-105"
          >
            <MapPin className="h-4 w-4 shrink-0" />
            Open in Google Maps
          </a>

          <a
            href="#rsvp"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-gold/30 bg-background/65 px-6 text-[10px] font-medium uppercase tracking-[0.28em] text-gold shadow-[0_14px_30px_rgba(111,84,42,0.08)] backdrop-blur-md transition-all duration-300 active:scale-[0.98] sm:min-h-[56px] sm:text-[11px] sm:tracking-[0.34em] sm:hover:-translate-y-0.5 sm:hover:border-gold/50 sm:hover:bg-background/85"
          >
            RSVP Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;