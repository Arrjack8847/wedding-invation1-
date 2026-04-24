import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { weddingData } from "@/data/wedding";

const StorySection = () => {
  const { stories } = weddingData;

  return (
    <>
      {stories.map((story, i) => {
        const isCenter = i === 0;
        const isLeftCard = i === 1;
        const isFinal = i === 2;

        return (
          <section
            key={i}
            className="relative flex min-h-screen w-full items-center overflow-hidden"
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 12, ease: "linear" }}
              viewport={{ once: true }}
            >
              <img
                src={story.image}
                alt={story.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/35" />

              {isCenter && (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,230,180,0.12),transparent_22%,rgba(0,0,0,0.34)_100%)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/35 to-transparent" />
                </>
              )}

              {isLeftCard && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
                </>
              )}

              {isFinal && (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,223,160,0.15),transparent_24%,rgba(0,0,0,0.36)_100%)]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/18 to-background/95" />
                </>
              )}
            </motion.div>

            <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 md:px-10">
              {isCenter && (
                <div className="mx-auto max-w-3xl text-center">
                  <motion.div
                    className="mx-auto mb-8 flex items-center justify-center gap-3"
                    initial={{ opacity: 0, scaleX: 0.85 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60 sm:w-12" />
                    <div className="h-[5px] w-[5px] rounded-full bg-gold/80 shadow-[0_0_14px_rgba(214,177,100,0.45)]" />
                    <div className="h-px w-12 bg-gold sm:w-16" />
                    <div className="h-[5px] w-[5px] rounded-full bg-gold/80 shadow-[0_0_14px_rgba(214,177,100,0.45)]" />
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60 sm:w-12" />
                  </motion.div>

                  <motion.h2
                    className="font-display mb-6 text-3xl leading-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl"
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    {story.title}
                  </motion.h2>

                  <motion.p
                    className="mx-auto max-w-2xl text-base font-light leading-8 text-white/85 sm:text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.25 }}
                    viewport={{ once: true }}
                  >
                    {story.text}
                  </motion.p>

                  <motion.div
                    className="mx-auto mt-8 h-px w-12 bg-gold sm:w-16"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    viewport={{ once: true }}
                  />
                </div>
              )}

              {isLeftCard && (
                <div className="flex justify-start">
                  <motion.div
                    className="w-full max-w-xl rounded-[30px] border border-white/10 bg-black/30 p-7 text-left shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-md sm:p-9"
                    initial={{ opacity: 0, x: -36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                    viewport={{ once: true }}
                  >
                    <motion.p
                      className="mb-4 text-[10px] uppercase tracking-[0.42em] text-gold/80"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      Chapter Two
                    </motion.p>

                    <motion.h2
                      className="font-display mb-5 text-3xl leading-tight text-white sm:text-5xl"
                      initial={{ opacity: 0, y: 26 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.16 }}
                      viewport={{ once: true }}
                    >
                      {story.title}
                    </motion.h2>

                    <motion.div
                      className="mb-6 h-px w-16 bg-gold"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.7, delay: 0.24 }}
                      viewport={{ once: true }}
                    />

                    <motion.p
                      className="text-base font-light leading-8 text-white/85 sm:text-lg"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {story.text}
                    </motion.p>
                  </motion.div>
                </div>
              )}

              {isFinal && (
                <div className="mx-auto max-w-3xl text-center">
                  <motion.p
                    className="mb-4 text-[10px] uppercase tracking-[0.42em] text-gold/80"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                  >
                    Final Chapter
                  </motion.p>

                  <motion.h2
                    className="font-display mb-6 text-3xl leading-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl"
                    initial={{ opacity: 0, y: 34 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    {story.title}
                  </motion.h2>

                  <motion.div
                    className="mx-auto mb-7 flex items-center justify-center gap-3"
                    initial={{ opacity: 0, scaleX: 0.85 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-px w-10 bg-gold/40 sm:w-16" />
                    <Sparkles className="h-4 w-4 text-gold sm:h-5 sm:w-5" />
                    <div className="h-px w-10 bg-gold/40 sm:w-16" />
                  </motion.div>

                  <motion.p
                    className="mx-auto max-w-2xl text-base font-light leading-8 text-white/85 sm:text-lg"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.95, delay: 0.25 }}
                    viewport={{ once: true }}
                  >
                    {story.text}
                  </motion.p>

                  <motion.div
                    className="mx-auto mt-8 h-px w-14 bg-gradient-to-r from-transparent via-gold to-transparent sm:w-20"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    viewport={{ once: true }}
                  />
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default StorySection;
