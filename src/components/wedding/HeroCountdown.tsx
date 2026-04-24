import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  targetDate: string;
}

const calculateTimeLeft = (targetDate: string) => {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const HeroCountdown = ({ targetDate }: Props) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="mt-8 flex justify-center">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
          >
            <motion.p
              key={item.value}
              className="font-display text-2xl text-white sm:text-3xl"
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {item.value}
            </motion.p>

            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gold/80">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroCountdown;
