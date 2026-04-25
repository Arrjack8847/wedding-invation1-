import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useWeddingContent } from "@/context/language";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const VenueSection = () => {
  const { venue, ui } = useWeddingContent();
  const reduceMotion = useReducedMotion();

  const mainPhoto = venue.photos[0];
  const sidePhotos = venue.photos.slice(1, 3);

  return (
    <section
      id="venue"
      className="relative flex min-h-screen items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#f8f1e8] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(212,175,108,0.15),transparent_36%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/40 to-transparent" />

      {/* DECOR */}
      <div className="pointer-events-none absolute left-8 top-24 h-2 w-2 rounded-full bg-gold/50" />
      <div className="pointer-events-none absolute right-10 top-36 h-3 w-3 rounded-full bg-gold/40" />
      <div className="pointer-events-none absolute bottom-28 left-10 h-3 w-3 rounded-full bg-gold/30" />
      <div className="pointer-events-none absolute bottom-44 right-8 h-2 w-2 rounded-full bg-gold/50" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="mb-3 text-[9px] uppercase tracking-[0.38em] text-gold/80 sm:text-[11px] sm:tracking-[0.45em]"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {venue.eyebrow}
          </motion.p>

          <motion.h2
            className="font-display text-[2.65rem] font-medium leading-[0.95] tracking-[0.01em] text-foreground sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {venue.title}
          </motion.h2>

          <motion.div
            className="gold-line mx-auto mt-5 h-px w-24"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          />

          <motion.p
            className="mx-auto mt-5 max-w-[22rem] text-[13.5px] leading-[1.8] text-muted-foreground sm:max-w-2xl sm:text-base sm:leading-8"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {venue.description}
          </motion.p>
        </div>

        {/* PREMIUM PHOTO LAYOUT */}
        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-[1.35fr_0.9fr]">
          {/* MAIN PHOTO */}
          {mainPhoto && (
            <motion.div
              className="luxury-card group relative overflow-hidden rounded-[30px] border border-white/50 bg-white/35 p-2 shadow-[0_24px_65px_rgba(111,84,42,0.12)] backdrop-blur-xl"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <div className="overflow-hidden rounded-[24px]">
                <img
                  src={mainPhoto}
                  alt={ui.venueAlt}
                  className="h-[330px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[430px] lg:h-[520px]"
                />
              </div>

              <div className="pointer-events-none absolute inset-2 rounded-[24px] bg-gradient-to-t from-black/25 via-transparent to-white/10" />
            </motion.div>
          )}

          {/* SIDE PHOTOS */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            {sidePhotos.map((src, i) => (
              <motion.div
                key={src}
                className="luxury-card group relative overflow-hidden rounded-[26px] border border-white/50 bg-white/35 p-2 shadow-[0_20px_55px_rgba(111,84,42,0.1)] backdrop-blur-xl"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.08,
                  ease: EASE,
                }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="overflow-hidden rounded-[20px]">
                  <img
                    src={src}
                    alt={ui.venueDetailAlt}
                    className="h-[170px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[230px] lg:h-[250px]"
                  />
                </div>

                <div className="pointer-events-none absolute inset-2 rounded-[20px] bg-gradient-to-t from-black/15 via-transparent to-white/10" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* MAP BUTTON */}
        <motion.div
          className="mt-9 flex justify-center sm:mt-11"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.75, ease: EASE }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[54px] w-full max-w-[20rem] items-center justify-center gap-3 rounded-full bg-gold px-7 text-[10px] font-medium uppercase tracking-[0.28em] text-white shadow-[0_16px_36px_rgba(201,162,92,0.28)] transition-all duration-300 active:scale-[0.98] sm:w-auto sm:max-w-none sm:px-10 sm:text-[11px] sm:hover:-translate-y-0.5 sm:hover:brightness-110"
          >
            <MapPin className="h-4 w-4 shrink-0" />
            {ui.viewLocation}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VenueSection;
