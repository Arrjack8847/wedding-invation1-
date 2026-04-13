import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const photos = [
  { src: "/gallery-1.jpg", label: "A Beautiful Beginning" },
  { src: "/gallery-2.jpg", label: "Moments We Treasure" },
  { src: "/gallery-3.jpg", label: "A Love That Grew" },
  { src: "/gallery-4.jpg", label: "Side by Side" },
  { src: "/gallery-5.jpg", label: "Captured with Love" },
  { src: "/gallery-6.jpg", label: "Forever Starts Here" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          className="mb-3 text-sm uppercase tracking-[0.4em] text-gold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Moments
        </motion.p>

        <motion.h2
          className="mb-16 font-display text-4xl text-foreground sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Gallery
        </motion.h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {photos.map((photo, i) => (
            <motion.div
              key={i}className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[24px] luxury-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(i)}
              layoutId={`photo-${i}`}
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent px-4 py-5 text-left">
                <p className="translate-y-2 text-xs font-light text-white/85 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:text-sm">
                  {photo.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.button
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setSelected(null);
              }}
            >
              <X className="h-5 w-5" />
            </motion.button>

            <motion.div
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl"
              layoutId={`photo-${selected}`}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selected].src}
                alt={photos[selected].label}
                className="max-h-[85vh] w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-6 py-6 text-left">
                <p className="font-display text-lg text-white sm:text-2xl">
                  {photos[selected].label}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;