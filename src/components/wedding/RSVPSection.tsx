import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import { weddingData } from "@/data/wedding";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyzoYp_Yos1aALSnClTiQQbSXHCueAc6A7b9GM_ZnV0IyvKqr9UCmbfPI4QXQsvrRtnWg/exec";

const celebrationHearts = [
  { x: -54, y: -230, rotate: -28, scale: 0.72, delay: 0 },
  { x: -30, y: -260, rotate: 18, scale: 0.58, delay: 0.1 },
  { x: 4, y: -240, rotate: -8, scale: 0.64, delay: 0.2 },
  { x: 38, y: -275, rotate: 24, scale: 0.7, delay: 0.3 },
  { x: 62, y: -225, rotate: -16, scale: 0.56, delay: 0.4 },
  { x: -70, y: -290, rotate: 12, scale: 0.5, delay: 0.5 },
  { x: 72, y: -305, rotate: -22, scale: 0.52, delay: 0.6 },
  { x: 18, y: -315, rotate: 30, scale: 0.48, delay: 0.7 },
] as const;

const RSVPSection = () => {
  const { toast } = useToast();
  const { rsvp } = weddingData;

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast({ title: rsvp.validationMessage, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
        attending: form.attending,
        guests: form.attending === "yes" ? form.guests : "0",
        message: form.message.trim(),
      };

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Submission failed");
      }

      setSubmitted(true);

      toast({
        title: `${rsvp.successTitle}!`,
        description: rsvp.toastDescription,
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
      console.error("RSVP submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="relative px-4 py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-champagne/10 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,108,0.08),transparent_38%)]" />

      <div className="relative z-10 mx-auto max-w-xl text-center">
        <motion.p
          className="mb-4 text-[10px] uppercase tracking-[0.42em] text-gold/75 sm:text-[11px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {rsvp.eyebrow}
        </motion.p>

        <motion.h2
          className="font-display text-4xl text-foreground sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {rsvp.title}
        </motion.h2>

        <motion.div
          className="gold-line mx-auto mt-5 h-px w-24 sm:w-28"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        />

        <motion.p
          className="mx-auto mt-6 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
        >
          Let us know if you'll be joining us for this beautiful celebration.
        </motion.p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              className="glass relative mt-10 space-y-6 overflow-hidden rounded-[30px] border border-white/10 p-7 text-left shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:p-8"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,108,0.08),transparent_38%)]" />

              <div className="relative z-10">
                <label className="mb-2 block text-sm text-muted-foreground">
                  {rsvp.nameLabel}
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={rsvp.namePlaceholder}
                  className="h-12 rounded-xl border-border/50 bg-background/55 shadow-sm transition-all focus:border-gold focus:ring-1 focus:ring-gold/30"
                  maxLength={100}
                  disabled={isSubmitting}
                />
              </div>

              <div className="relative z-10">
                <label className="mb-2 block text-sm text-muted-foreground">
                  {rsvp.attendingLabel}
                </label>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {["yes", "no"].map((val) => {
                    const active = form.attending === val;

                    return (
                      <motion.button
                        key={val}
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        disabled={isSubmitting}
                        className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                          active
                            ? "bg-gold text-primary-foreground shadow-[0_12px_28px_rgba(201,162,92,0.28)]"
                            : "border border-border/50 bg-background/55 text-muted-foreground hover:border-gold/30 hover:bg-background/75"
                        } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                        onClick={() => setForm({ ...form, attending: val })}
                      >
                        {val === "yes" ? rsvp.acceptText : rsvp.declineText}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {form.attending === "yes" && (
                  <motion.div
                    key="guests"
                    className="relative z-10 overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <label className="mb-2 block text-sm text-muted-foreground">
                      {rsvp.guestsLabel}
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={form.guests}
                      onChange={(e) =>
                        setForm({ ...form, guests: e.target.value })
                      }
                      className="h-12 rounded-xl border-border/50 bg-background/55 shadow-sm transition-all focus:border-gold focus:ring-1 focus:ring-gold/30"
                      disabled={isSubmitting}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10">
                <label className="mb-2 block text-sm text-muted-foreground">
                  {rsvp.messageLabel} (optional)
                </label>
                <Textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder={rsvp.messagePlaceholder}
                  rows={4}
                  className="resize-none rounded-xl border-border/50 bg-background/55 shadow-sm transition-all focus:border-gold focus:ring-1 focus:ring-gold/30"
                  maxLength={500}
                  disabled={isSubmitting}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`relative z-10 w-full rounded-full bg-gold py-3.5 text-[11px] font-medium uppercase tracking-[0.28em] text-primary-foreground shadow-[0_14px_30px_rgba(201,162,92,0.24)] transition-all hover:-translate-y-0.5 hover:brightness-105 ${
                  isSubmitting ? "cursor-not-allowed opacity-80" : ""
                }`}
                whileHover={isSubmitting ? undefined : { scale: 1.01 }}
                whileTap={isSubmitting ? undefined : { scale: 0.99 }}
              >
                {isSubmitting ? "Sending..." : rsvp.submitText}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="glass relative mt-10 flex flex-col items-center overflow-hidden rounded-[30px] border border-white/10 p-10 shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:p-12"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.9 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,108,0.14),transparent_45%)]" />

              <motion.div
                className="relative z-10"
                animate={{ scale: [1, 1.14, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <Heart className="h-12 w-12 fill-gold/30 text-gold" />
              </motion.div>

              <motion.h3
                className="relative z-10 mt-6 mb-2 font-display text-2xl text-foreground sm:text-3xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.5 }}
              >
                {rsvp.successTitle}
              </motion.h3>

              <motion.p
                className="relative z-10 max-w-sm text-center text-sm leading-7 text-muted-foreground"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.55 }}
              >
                {rsvp.successText}
              </motion.p>

              <motion.div
                className="relative z-10 mt-6 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.6 }}
              />

              {celebrationHearts.map((heart, i) => (
                <motion.div
                  key={i}
                  className="absolute text-gold/35"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: heart.scale,
                  }}
                  animate={{
                    x: heart.x,
                    y: heart.y,
                    opacity: 0,
                    rotate: heart.rotate,
                  }}
                  transition={{
                    duration: 2.2,
                    delay: heart.delay,
                  }}
                >
                  <Heart className="h-4 w-4 fill-current" />
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
