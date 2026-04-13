import { motion } from "framer-motion";
import { MapPin, Clock3, CalendarDays, PhoneCall } from "lucide-react";

const details = [
  {
    icon: CalendarDays,
    label: "The Date",
    value: "Wednesday, 29 January 2025",
  },
  {
    icon: Clock3,
    label: "The Time",
    value: "Signing Ceremony · 10:00 AM\nWedding Celebration · 12:00 PM",
  },
  {
    icon: MapPin,
    label: "The Venue",
    value: "Arian\nShuKhinTha St, Sittwe, Myanmar",
  },
  {
    icon: PhoneCall,
    label: "Contact",
    value: "+95 9517001",
  },
];

const EventDetails = () => {
  return (
    <section className="relative px-4 py-28 sm:py-32">
      <div className="section-glow absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#f8f1e8] to-background" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="mb-4 text-[10px] uppercase tracking-[0.5em] text-gold/75 sm:text-[11px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Join Us
          </motion.p>

          <motion.h2
            className="font-display text-4xl font-medium tracking-[0.01em] text-foreground sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Wedding Details
          </motion.h2>

          <motion.div
            className="mx-auto mt-6 h-px w-24 gold-line sm:w-28"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            We would be honored to celebrate this unforgettable day with the people
            who mean the most to us.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {details.map((item, i) => (
            <motion.div
              key={item.label}
              className="luxury-card rounded-[30px] p-9 md:p-10"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/20">
                <item.icon className="h-5 w-5 text-gold" />
              </div>

              <p className="mb-3 text-[10px] uppercase tracking-[0.5em] text-gold/70">
                {item.label}
              </p>

              <p className="font-display text-[1.5rem] font-normal leading-[1.6] tracking-[0.02em] text-foreground/90 whitespace-pre-line sm:text-[1.7rem]">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <a
            href="https://www.google.com/maps/place/Arian/@20.1358489,92.8979683,17.75z/data=!4m15!1m8!3m7!1s0x30b04f689ff64957:0x6f89e0ea33ba5cec!2sSittwe,+Myanmar+(Burma)!3b1!8m2!3d20.1527657!4d92.8676861!16zL20vMDVxbDhf!3m5!1s0x30b04f9e4236f609:0x475ee836395f588e!8m2!3d20.1360702!4d92.899345!16s%2Fg%2F1tg37jls?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3 text-[10px] font-medium uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:px-9 sm:py-3.5 sm:text-[11px]"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;