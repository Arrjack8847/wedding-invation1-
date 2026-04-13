import { motion } from "framer-motion";

const stories = [
  {
    title: "The Beginning",
    text: "From a simple hello, everything changed. A moment that quietly started a lifetime together.",
    image: "/story-1.jpg",
  },
  {
    title: "Our Journey",
    text: "Through every laugh, every challenge, and every dream — we chose each other, again and again.",
    image: "/story-2.jpg",
  },
  {
    title: "Forever Starts Here",
    text: "Now, we begin the most beautiful chapter of our lives — and we invite you to be part of it.",
    image: "/story-3.jpg",
  },
];

const StorySection = () => {
  return (
    <>
      {stories.map((story, i) => (
        <section
          key={i}
          className="relative h-screen w-full overflow-hidden flex items-center justify-center"
        >
          {/* Background image */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            viewport={{ once: true }}
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover"
            />

            {/* overlays */}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/40 to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-2xl">
            <motion.div
              className="w-10 h-px bg-gold mx-auto mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />

            <motion.h2
              className="font-display text-3xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {story.title}
            </motion.h2>

            <motion.p
              className="text-white/85 text-base sm:text-lg font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {story.text}
            </motion.p>

            <motion.div
              className="w-10 h-px bg-gold mx-auto mt-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </div>
        </section>
      ))}
    </>
  );
};

export default StorySection;