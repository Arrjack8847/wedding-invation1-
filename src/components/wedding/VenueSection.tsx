import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { weddingData } from "@/data/wedding";

const VenueSection = () => {
  const { venue } = weddingData;

  return (
    <section id="venue" className="relative px-4 py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#f8f1e8] to-background" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="mb-3 text-[10px] uppercase tracking-[0.4em] text-gold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {venue.eyebrow}
          </motion.p>

          <motion.h2
            className="font-display text-4xl text-foreground sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {venue.title}
          </motion.h2>

          <motion.div
            className="gold-line mx-auto mt-5 h-px w-24"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {venue.description}
          </motion.p>
        </div>

        {/* PHOTOS */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {venue.photos.map((src, i) => (
            <motion.div
              key={i}
              className="overflow-hidden rounded-[24px] luxury-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={src}
                alt="Venue"
                className="h-[280px] w-full object-cover transition duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        {/* MAP BUTTON */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3 text-[10px] uppercase tracking-[0.3em] text-white transition hover:brightness-110"
          >
            <MapPin className="h-4 w-4" />
            View Location
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VenueSection;
