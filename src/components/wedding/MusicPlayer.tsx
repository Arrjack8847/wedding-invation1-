import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  play: boolean;
}

const MusicPlayer = ({ play }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio.muted = muted;

    if (play) {
      audio.play().catch(() => {
        // autoplay may be blocked on some devices
      });
    } else {
      audio.pause();
    }
  }, [play, muted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !muted;
    audio.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted && play) {
      audio.play().catch(() => {
        // autoplay may still be blocked until user interaction
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        onClick={toggleMute}
        className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition hover:bg-black/35 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
        initial={{ opacity: 0, scale: 0.88, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-label={muted ? "Unmute music" : "Mute music"}
      >
        <span className="absolute inset-0 rounded-full ring-1 ring-gold/15" />
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,108,0.12),transparent_65%)]" />
        {muted ? (
          <VolumeX className="relative z-10 h-4 w-4 sm:h-5 sm:w-5" />
        ) : (
          <Volume2 className="relative z-10 h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </motion.button>
    </>
  );
};

export default MusicPlayer;
