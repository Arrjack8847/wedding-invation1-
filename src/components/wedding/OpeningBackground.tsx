import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Props {
  isFullscreen: boolean;
  isTransitioning: boolean;
}

/* 🎛️ CONTROL PANEL */
const BG = {
  video: {
    src: "/luxury-bg1.mp4",
  },

  blur: {
    amount: "2px", // 🔥 CHANGE THIS (was 4px)
  },

  overlay: {
    opacity: 0.3,
  },

  lightWash: {
    opacity: 0.22,
  },

  glow: {
    sizeMobile: 360,
    sizeDesktop: 680,
    opacityMin: 0.35,
    opacityMax: 0.55,
  },

  transitionOverlay: {
    opacityFullscreen: 0.55,
    opacityTransition: 0.9,
  },
};

const OpeningBackground = ({ isFullscreen, isTransitioning }: Props) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* VIDEO */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={BG.video.src}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* OVERLAY */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(255,253,250,${BG.overlay.opacity}) 0%,
              rgba(248,240,227,${BG.overlay.opacity}) 42%,
              rgba(245,234,216,${BG.overlay.opacity}) 60%,
              rgba(255,253,249,${BG.overlay.opacity}) 100%
            )
          `,
          backdropFilter: `blur(${BG.blur.amount})`,
        }}
      />

      {/* LIGHT WASH */}
      <div
        className="absolute inset-0"
        style={{
          opacity: BG.lightWash.opacity,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.20), rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.00) 60%)",
        }}
      />

      {/* GLOW */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [
            BG.glow.opacityMin,
            BG.glow.opacityMax,
            BG.glow.opacityMin,
          ],
        }}
        transition={{
          duration: 5.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: `${BG.glow.sizeMobile}px`,
          height: `${BG.glow.sizeMobile}px`,
          background:
            "radial-gradient(circle, rgba(212,177,92,0.20) 0%, rgba(212,177,92,0.10) 36%, rgba(212,177,92,0) 72%)",
        }}
      />

      {/* FULLSCREEN OVERLAY */}
      {(isFullscreen || isTransitioning) && (
        <motion.div
          className="absolute inset-0 z-[4]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isTransitioning
              ? BG.transitionOverlay.opacityTransition
              : BG.transitionOverlay.opacityFullscreen,
          }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            background:
              "linear-gradient(180deg, rgba(255,250,244,0.68), rgba(245,234,216,0.84))",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

export default OpeningBackground;