import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

const RSVPSection = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }

    setSubmitted(true);

    toast({
      title: "Thank You!",
      description: "Your response has been received with love.",
    });
  };

  return (
    <section className="relative py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-champagne/10 to-background" />

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <motion.p
          className="text-gold text-sm tracking-[0.4em] uppercase mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Be Our Guest
        </motion.p>

        <motion.h2
          className="font-display text-4xl sm:text-5xl text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          RSVP
        </motion.h2>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              className="glass rounded-2xl p-8 space-y-6 text-left"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
            >
              {/* Name */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Your Name
                </label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="bg-background/50 border-border/50 focus:border-gold"
                  maxLength={100}
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Will you be joining us?
                </label>
                <div className="flex gap-3">
                  {["yes", "no"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        form.attending === val
                          ? "bg-gold text-primary-foreground"
                          : "bg-background/50 text-muted-foreground border border-border/50 hover:border-gold/30"
                      }`}
                      onClick={() =>
                        setForm({ ...form, attending: val })
                      }
                    >
                      {val === "yes"
                        ? "Joyfully Accept"
                        : "Respectfully Decline"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests */}
              {form.attending === "yes" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                >
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Number of Guests
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={form.guests}
                    onChange={(e) =>
                      setForm({ ...form, guests: e.target.value })
                    }
                    className="bg-background/50 border-border/50 focus:border-gold"
                  />
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  A message for us (optional)
                </label>
                <Textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Leave your wishes for the couple..."
                  rows={3}
                  className="bg-background/50 border-border/50 focus:border-gold resize-none"
                  maxLength={500}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="w-full py-3 rounded-full bg-gold text-primary-foreground font-medium text-sm tracking-wider uppercase hover:brightness-110 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Response
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="glass rounded-2xl p-12 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-12 h-12 text-gold fill-gold/30" />
              </motion.div>

              <h3 className="font-display text-2xl text-foreground mt-6 mb-2">
                Thank You
              </h3>

              <p className="text-muted-foreground text-sm text-center">
                Your presence means everything to us.  
                We look forward to celebrating together.
              </p>

              {/* Floating hearts */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-gold/40"
                  initial={{
                    x: (Math.random() - 0.5) * 100,
                    y: 0,
                    opacity: 1,
                    scale: 0.5 + Math.random() * 0.5,
                  }}
                  animate={{
                    y: -200 - Math.random() * 100,
                    opacity: 0,
                    rotate: (Math.random() - 0.5) * 90,
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    delay: i * 0.1,
                  }}
                >
                  ♥
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RSVPSection;