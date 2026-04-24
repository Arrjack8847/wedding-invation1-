import { motion } from "framer-motion";
import { ArrowRight, Heart, MessageCircle } from "lucide-react";
import { weddingData } from "@/data/wedding";

const ContactSection = () => {
  const { contact, couple } = weddingData;

  return (
    <section className="relative px-4 py-24 sm:py-28">
      <div className="section-glow absolute inset-0" />

      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          className="mb-4 text-[10px] uppercase tracking-[0.42em] text-gold/75 sm:text-[11px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {contact.eyebrow}
        </motion.p>

        <motion.h2
          className="font-display text-4xl text-foreground sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {contact.title}
        </motion.h2>

        <motion.div
          className="gold-line mx-auto mt-5 h-px w-24 sm:w-28"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        />

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          viewport={{ once: true }}
        >
          {contact.description}
        </motion.p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {contact.people.map((person, i) => (
            <motion.a
              key={person.name}
              href={`https://wa.me/${person.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-card group relative overflow-hidden rounded-[28px] p-7 text-left sm:p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-gold/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex items-start gap-4 sm:gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-500/15 ring-1 ring-green-500/20">
                  <MessageCircle className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
                </div>

                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-gold/80 sm:text-xs">
                    {person.role}
                  </p>

                  <h3 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
                    {person.name}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {contact.ctaText}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground sm:text-xs">
                    <span>{contact.buttonText}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mt-20 border-t border-gold/15 pt-10 sm:mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 text-gold/75">
            <div className="h-px w-10 bg-gold/30" />
            <Heart className="h-4 w-4 fill-gold/20" />
            <div className="h-px w-10 bg-gold/30" />
          </div>

          <p className="mt-6 font-display text-3xl text-foreground sm:text-4xl">
            {couple.display}
          </p>

          <p className="mt-2 text-sm uppercase tracking-[0.28em] text-muted-foreground">
            {contact.footerDate}
          </p>

          <p className="mt-6 text-xs tracking-[0.16em] text-muted-foreground/70">
            Crafted with love by{" "}
            <span className="text-gold/90">{contact.footerCredit}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
