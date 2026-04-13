import { motion } from "framer-motion";
import { MessageCircle, Heart } from "lucide-react";

const contacts = [
  { name: "Myo Myat Khine", role: "The Bride", phone: "6281234567890" },
  { name: "Than Htay Hlaing", role: "The Groom", phone: "6289876543210" },
];

const ContactSection = () => {
  return (
    <section className="relative px-4 py-28">
      <div className="section-glow absolute inset-0" />
      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          className="mb-3 text-sm uppercase tracking-[0.4em] text-gold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Reach Out
        </motion.p>

        <motion.h2
          className="font-display text-4xl text-foreground sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          With Love, Contact Us
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          viewport={{ once: true }}
        >
          For kind wishes, warm words, or any details regarding the celebration,
          you may reach us directly.
        </motion.p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {contacts.map((c, i) => (
            <motion.a
              key={c.name}
              href={`https://wa.me/${c.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-card group relative overflow-hidden rounded-[30px] p-8 text-left"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-gold/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-500/15 ring-1 ring-green-500/20">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>

                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.35em] text-gold/80">
                    {c.role}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-foreground">
                    {c.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Tap to send your wishes and blessings through WhatsApp.
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    <span>Message on WhatsApp</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mt-24 border-t border-gold/15 pt-10"
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
            Myo Myat Khine & Than Htay Hlaing
          </p>

          <p className="mt-2 text-sm uppercase tracking-[0.28em] text-muted-foreground">
            29 January 2025
          </p>

          <p className="mt-6 text-xs tracking-[0.16em] text-muted-foreground/70">
            Crafted with love by <span className="text-gold/90">JackNex Studio</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;