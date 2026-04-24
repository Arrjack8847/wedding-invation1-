import { motion } from "framer-motion";
import { MapPin, Clock3, CalendarDays, PhoneCall } from "lucide-react";
import { weddingData } from "@/data/wedding";

const iconMap = {
  calendar: CalendarDays,
  clock: Clock3,
  mapPin: MapPin,
  phone: PhoneCall,
} as const;

const EventDetails = () => {
  const { event } = weddingData;

  return (
    <section id="details" className="relative px-4 py-24 sm:py-28">
      <div className="section-glow absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#f8f1e8] to-background" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="mb-4 text-[10px] uppercase tracking-[0.45em] text-gold/75 sm:text-[11px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {event.eyebrow}
          </motion.p>

          <motion.h2
            className="font-display text-4xl font-medium tracking-[0.01em] text-foreground sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {event.title}
          </motion.h2>

          <motion.div
            className="gold-line mx-auto mt-5 h-px w-24 sm:w-28"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {event.description}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {event.items.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={item.label}
                className="luxury-card rounded-[28px] p-8 md:p-9"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20">
                  <Icon className="h-5 w-5 text-gold" />
                </div>

                <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-gold/70">
                  {item.label}
                </p>

                <p className="font-display whitespace-pre-line text-[1.25rem] font-normal leading-[1.55] tracking-[0.01em] text-foreground/90 sm:text-[1.4rem] md:text-[1.5rem]">
                  {item.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3 text-[10px] font-medium uppercase tracking-[0.28em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 sm:px-9 sm:py-3.5 sm:text-[11px]"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
          </a>
          <a
            href="#rsvp"
            className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-background/55 px-8 py-3 text-[10px] font-medium uppercase tracking-[0.28em] text-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-background/80 sm:px-9 sm:py-3.5 sm:text-[11px]"
          >
            RSVP Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;
