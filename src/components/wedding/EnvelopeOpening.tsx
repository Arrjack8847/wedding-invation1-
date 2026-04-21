import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, type Transition } from "framer-motion";
import OpeningBackground from "./OpeningBackground";

interface Props {
  onOpen: () => void;
}

type Stage =
  | "sealed"
  | "ribbonDrop"
  | "openingFade"
  | "cardRising"
  | "revealed"
  | "expanding"
  | "invitationHold"
  | "videoIntro"
  | "siteReveal"
  | "done";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const DURATIONS = {
  ribbonDrop: 0.55,
  openFade: 0.8,
  cardRise: 1.8,
  expand: 1.0,
  invitationHold: 0.6,
  videoIntro: 3.2,
  siteReveal: 0.9,
  cardRiseDelay: 0.22,
  quick: 0.35,
  medium: 0.7,
  soft: 0.9,
  long: 1.1,
} as const;

const FLOAT_TRANSITION: Transition = {
  duration: 3.8,
  repeat: Infinity,
  ease: "easeInOut",
};

const SCENE = {
  envelope: {
    closed: {
      y: 0,
      scale: 1,
    },
    opened: {
      scale: 1.2,
      x: 0,
      backY: -12,
      frontY: -14,
    },
  },

  card: {
    small: {
      aspectRatio: "5 / 4",
      radius: "30px 30px 14px 14px",
      startY: -20,
      revealY: -68,
      x: 0,
      rotate: -0.45,
      scale: 1.01,
      width: "min(58vw, 230px)",
      smWidth: "min(50vw, 270px)",
    },
    fullscreen: {
      aspectRatio: "16 / 10",
      radius: "30px",
      width: "min(92vw, 820px)",
    },
  },

  glow: {
    size: 240,
    yOffset: -24,
    blur: 24,
  },

  hintText: {
    bottomOffset: -72,
    smBottomOffset: -84,
  },
} as const;

const TRANSITIONS = {
  quick: { duration: DURATIONS.quick, ease: EASE } satisfies Transition,
  medium: { duration: DURATIONS.medium, ease: EASE } satisfies Transition,
  fadeBlur: { duration: DURATIONS.soft, ease: EASE } satisfies Transition,
  scaleSoft: { duration: DURATIONS.long, ease: EASE } satisfies Transition,
  rise: { duration: DURATIONS.cardRise, ease: EASE } satisfies Transition,
  expand: { duration: DURATIONS.expand, ease: EASE } satisfies Transition,
};

function getHintText(stage: Stage) {
  if (stage === "sealed") return "Tap to Open";
  if (stage === "revealed") return "Tap to Open Invitation";
  return "";
}
function getVideoOverlayOpacity(stage: Stage) {
  if (stage === "videoIntro") return 0.92;
  return 0;
}
function getCardAnimate(stage: Stage) {
  const isExpandedLike =
    stage === "expanding" ||
    stage === "invitationHold" ||
    stage === "videoIntro" ||
    stage === "siteReveal";

  const isVisible =
    stage === "openingFade" ||
    stage === "cardRising" ||
    stage === "revealed" ||
    stage === "expanding" ||
    stage === "invitationHold" ||
    stage === "videoIntro" ||
    stage === "siteReveal";

  return {
    opacity: isVisible ? 1 : 0,
    scale: isExpandedLike ? 1 : SCENE.card.small.scale,
    filter:
      stage === "videoIntro" || stage === "siteReveal"
        ? "blur(2px)"
        : isVisible
        ? "blur(0px)"
        : "blur(6px)",
    x: `calc(-50% + ${SCENE.card.small.x}px)`,
    y: isExpandedLike
      ? "-50%"
      : `calc(-50% + ${
          stage === "cardRising" || stage === "revealed"
            ? SCENE.card.small.revealY
            : SCENE.card.small.startY
        }px)`,
    rotate: isExpandedLike ? 0 : SCENE.card.small.rotate,
  };
}

function getCardInitial() {
  return {
    opacity: 0,
    scale: 1.04,
    filter: "blur(6px)",
    x: `calc(-50% + ${SCENE.card.small.x}px)`,
    y: `calc(-50% + ${SCENE.card.small.startY}px)`,
    rotate: SCENE.card.small.rotate,
  };
}

function getCardTransition(stage: Stage) {
  const isOpeningFade = stage === "openingFade";
  const isCardRising = stage === "cardRising";
  const isExpandedLike =
    stage === "expanding" ||
    stage === "invitationHold" ||
    stage === "videoIntro" ||
    stage === "siteReveal";

  return {
    opacity:
      stage === "videoIntro" || stage === "siteReveal"
        ? TRANSITIONS.fadeBlur
        : isOpeningFade
        ? TRANSITIONS.fadeBlur
        : TRANSITIONS.quick,
    filter:
      stage === "videoIntro" || stage === "siteReveal"
        ? TRANSITIONS.fadeBlur
        : isOpeningFade
        ? TRANSITIONS.fadeBlur
        : TRANSITIONS.quick,
    scale: isOpeningFade
      ? TRANSITIONS.scaleSoft
      : isCardRising
      ? TRANSITIONS.rise
      : isExpandedLike
      ? TRANSITIONS.expand
      : TRANSITIONS.quick,
    y: isOpeningFade
      ? TRANSITIONS.fadeBlur
      : isCardRising
      ? TRANSITIONS.rise
      : isExpandedLike
      ? TRANSITIONS.expand
      : TRANSITIONS.quick,
    rotate: isOpeningFade
      ? TRANSITIONS.fadeBlur
      : isCardRising
      ? TRANSITIONS.rise
      : isExpandedLike
      ? TRANSITIONS.expand
      : TRANSITIONS.quick,
  };
}

const EnvelopeOpening = ({ onOpen }: Props) => {
  const [stage, setStage] = useState<Stage>("sealed");
  const timeoutsRef = useRef<number[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const id = window.setTimeout(() => {
      callback();
      timeoutsRef.current = timeoutsRef.current.filter(
        (timeoutId) => timeoutId !== id
      );
    }, delay);

    timeoutsRef.current.push(id);
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  const isSealed = stage === "sealed";
  const isRibbonDrop = stage === "ribbonDrop";
  const isOpeningFade = stage === "openingFade";
  const isCardRising = stage === "cardRising";
  const isRevealed = stage === "revealed";
  const isExpanding = stage === "expanding";
  const isInvitationHold = stage === "invitationHold";
  const isVideoIntro = stage === "videoIntro";
  const isSiteReveal = stage === "siteReveal";

  const isExpandedLike =
    isExpanding || isInvitationHold || isVideoIntro || isSiteReveal;

  const isBusy =
    stage === "ribbonDrop" ||
    stage === "openingFade" ||
    stage === "cardRising" ||
    stage === "expanding" ||
    stage === "invitationHold" ||
    stage === "videoIntro" ||
    stage === "siteReveal";

  const cardLayout = useMemo(() => {
    return {
      width: isExpandedLike
        ? SCENE.card.fullscreen.width
        : "min(58vw, 230px)",
      aspectRatio: isExpandedLike
        ? SCENE.card.fullscreen.aspectRatio
        : SCENE.card.small.aspectRatio,
      radius: isExpandedLike
        ? SCENE.card.fullscreen.radius
        : SCENE.card.small.radius,
    };
  }, [isExpandedLike]);

  const handleClick = useCallback(() => {
    if (isBusy) return;

    if (stage === "sealed") {
      clearAllTimeouts();
      setStage("ribbonDrop");

      schedule(() => {
        setStage("openingFade");
      }, DURATIONS.ribbonDrop * 1000);

      schedule(() => {
        setStage("cardRising");
      }, (DURATIONS.ribbonDrop + DURATIONS.openFade + DURATIONS.cardRiseDelay) * 1000);

      schedule(() => {
        setStage("revealed");
      }, (DURATIONS.ribbonDrop + DURATIONS.openFade + DURATIONS.cardRiseDelay + DURATIONS.cardRise) * 1000);

      return;
    }

    if (stage === "revealed") {
  clearAllTimeouts();
  setStage("expanding");

  schedule(() => {
    setStage("invitationHold");
  }, DURATIONS.expand * 1000);

  schedule(() => {
    setStage("videoIntro");
  }, (DURATIONS.expand + DURATIONS.invitationHold) * 1000);

  schedule(() => {
    setStage("done");
    onOpen();
  }, (DURATIONS.expand + DURATIONS.invitationHold + DURATIONS.videoIntro) * 1000);

  return;
}
  }, [stage, isBusy, schedule, clearAllTimeouts, onOpen]);

  if (stage === "done") return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 18%, rgba(255, 231, 184, 0.22), transparent 28%),
          radial-gradient(circle at 20% 10%, rgba(255,255,255,0.70), transparent 18%),
          linear-gradient(135deg, #fffdfa 0%, #f8f0e3 42%, #f5ead8 60%, #fffdf9 100%)
        `,
      }}
    >
      <OpeningBackground
        isFullscreen={isExpandedLike}
        isTransitioning={isVideoIntro || isSiteReveal}
      />
      {(isVideoIntro || isSiteReveal) && (
  <motion.div
    className="absolute inset-0 z-[25] overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: getVideoOverlayOpacity(stage) }}
    transition={{ duration: isSiteReveal ? 0.9 : 0.8, ease: EASE }}
  >
    <video
      className="h-full w-full object-cover"
      src="/luxury-bg.mp4"
      autoPlay
      muted
      playsInline
      preload="auto"
    />

    <div
      className="absolute inset-0"
      style={{
        background: `
          linear-gradient(to bottom, rgba(19,14,10,0.22), rgba(19,14,10,0.40)),
          radial-gradient(circle at center, rgba(255,233,190,0.08), transparent 46%)
        `,
      }}
    />

    <motion.div
      className="absolute inset-0 flex items-center justify-center px-5 sm:px-6 md:px-10 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: isVideoIntro ? 1 : 0,
        y: isVideoIntro ? 0 : 10,
      }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="max-w-[92vw] sm:max-w-[720px]">
        <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#f0dba8] sm:mb-4 sm:text-[12px] sm:tracking-[0.36em]">
          Welcome to our celebration
        </p>

        <div className="mx-auto mb-4 h-px w-20 bg-gradient-to-r from-transparent via-[#e3c37a] to-transparent opacity-90 sm:mb-5 sm:w-24" />

        <h2 className="font-display text-[24px] leading-[1.15] text-white sm:text-[36px] md:text-[46px]">
          Step into our story
        </h2>
      </div>
    </motion.div>
  </motion.div>
)}

      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
        <motion.div
          className="relative flex w-full items-center justify-center"
          onClick={handleClick}
          style={{
            width: "min(92vw, 500px)",
            cursor: isBusy ? "default" : "pointer",
          }}
          animate={
            isSealed
              ? { y: [0, -8, 0] }
              : isSiteReveal
              ? { opacity: 0, scale: 1.02 }
              : { opacity: 1, scale: 1 }
          }
          transition={isSealed ? FLOAT_TRANSITION : TRANSITIONS.medium}
        >
          {!isSiteReveal && getHintText(stage) && (
            <motion.div
              key={stage}
              className="absolute left-1/2 z-[20] -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{
                bottom:
                  window.innerWidth >= 640
                    ? `${SCENE.hintText.smBottomOffset}px`
                    : `${SCENE.hintText.bottomOffset}px`,
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#af8d42] sm:text-[11px]">
                {getHintText(stage)}
              </p>
            </motion.div>
          )}

          {(stage === "sealed" || stage === "ribbonDrop") && (
            <motion.img
              src="/ribbon.png"
              alt="Ribbon"
              className="pointer-events-none absolute left-1/2 top-1/2 z-[9]"
              initial={{
                opacity: 1,
                x: "-50%",
                y: "-50%",
                scale: 0.92,
              }}
              animate={
                isRibbonDrop
                  ? {
                      x: "-50%",
                      y: "calc(-50% + 135px)",
                      opacity: 0,
                      rotate: 10,
                    }
                  : {
                      x: "-50%",
                      y: "calc(-50% + 35px)",
                      opacity: 1,
                      rotate: 0,
                    }
              }
              transition={{
                duration: DURATIONS.ribbonDrop,
                ease: EASE,
              }}
              style={{
                width: "34%",
                maxWidth: "130px",
                top: "50%",
                left: "50%",
              }}
            />
          )}

          {isSealed && (
            <motion.img
              src="/Envelope Closed.png"
              alt="Closed envelope"
              className="relative z-[6] w-full drop-shadow-[0_26px_50px_rgba(93,70,28,0.16)]"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{
                opacity: 1,
                scale: SCENE.envelope.closed.scale,
                y: SCENE.envelope.closed.y,
              }}
              transition={TRANSITIONS.medium}
              style={{
                width: "100%",
                maxWidth: "500px",
              }}
            />
          )}

          {!isSealed && (
            <>
              <motion.div
                className="absolute left-1/2 top-1/2 z-[1]"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  top: "50%",
                  left: "50%",
                  filter: "drop-shadow(0 30px 50px rgba(91,67,28,0.11))",
                }}
                initial={{
                  opacity: 0,
                  scale: SCENE.envelope.opened.scale + 0.02,
                  x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                  y: `calc(-50% + ${SCENE.envelope.opened.backY}px)`,
                }}
                animate={{
                  opacity: isExpandedLike ? 0.18 : 1,
                  scale: SCENE.envelope.opened.scale,
                  x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                  y: `calc(-50% + ${SCENE.envelope.opened.backY}px)`,
                }}
                transition={{
                  opacity: TRANSITIONS.fadeBlur,
                  scale: TRANSITIONS.scaleSoft,
                }}
              >
                <motion.img
                  src="/Envelope Opened.png"
                  alt="Opened envelope back"
                  className="w-full"
                  initial={{ filter: "blur(6px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={TRANSITIONS.fadeBlur}
                />
              </motion.div>

              <motion.div
                className="absolute left-1/2 top-1/2 z-[2] rounded-full"
                initial={{ opacity: 0 }}
                animate={{
                  opacity:
                    isCardRising || isRevealed
                      ? 0.24
                      : isExpandedLike
                      ? 0.34
                      : 0.16,
                  x: "-50%",
                  y:
                    isCardRising || isRevealed
                      ? `calc(-50% + ${SCENE.glow.yOffset}px)`
                      : "-50%",
                  scale: isExpandedLike ? 1.6 : 1,
                }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                style={{
                  width: `${SCENE.glow.size}px`,
                  height: `${SCENE.glow.size}px`,
                  background:
                    "radial-gradient(circle, rgba(255,225,170,0.40) 0%, rgba(255,225,170,0.16) 38%, rgba(255,225,170,0) 72%)",
                  filter: `blur(${SCENE.glow.blur}px)`,
                  pointerEvents: "none",
                }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 z-[8]"
                initial={getCardInitial()}
                animate={getCardAnimate(stage)}
                transition={getCardTransition(stage)}
                style={{
                  width: cardLayout.width,
                  aspectRatio: cardLayout.aspectRatio,
                  transformOrigin: "center center",
                }}
              >
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    borderRadius: cardLayout.radius,
                    background:
                      "linear-gradient(180deg, #fffdf8 0%, #fbf4e8 55%, #f8eedf 100%)",
                    border: "1px solid #e7d7b4",
                    boxShadow:
                      isExpandedLike
                        ? `
                          inset 0 1px 0 rgba(255,255,255,0.95),
                          inset 0 -10px 18px rgba(93,70,28,0.05),
                          0 30px 70px rgba(93,70,28,0.16),
                          0 10px 24px rgba(93,70,28,0.10)
                        `
                        : isCardRising
                        ? `
                          inset 0 1px 0 rgba(255,255,255,0.95),
                          inset 0 -10px 18px rgba(93,70,28,0.06),
                          0 30px 60px rgba(93,70,28,0.18),
                          0 8px 18px rgba(93,70,28,0.10)
                        `
                        : `
                          inset 0 1px 0 rgba(255,255,255,0.95),
                          inset 0 -10px 18px rgba(93,70,28,0.06),
                          0 20px 45px rgba(93,70,28,0.15),
                          0 5px 14px rgba(93,70,28,0.08)
                        `,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at top, rgba(255,255,255,0.92), rgba(255,255,255,0) 42%)",
                    }}
                  />

                  <div
                    className="absolute left-0 top-0 h-[52px] w-full"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.74), rgba(255,255,255,0.16), transparent)",
                    }}
                  />

                  <div
                    className={`absolute border border-[#ede1ca] ${
                      isExpandedLike ? "inset-[18px]" : "inset-[8px]"
                    }`}
                    style={{
                      borderRadius: isExpandedLike ? "28px" : "24px 24px 10px 10px",
                    }}
                  />

                  <div
                    className={`absolute border border-[#f6eddd] ${
                      isExpandedLike ? "inset-[28px]" : "inset-[14px]"
                    }`}
                    style={{
                      borderRadius: isExpandedLike ? "22px" : "18px 18px 8px 8px",
                    }}
                  />

                  <div
                    className={`relative flex h-full flex-col items-center justify-center text-center ${
                      isExpandedLike ? "px-8 py-8 sm:px-12" : "px-3 py-4 sm:px-4"
                    }`}
                  >
                    <p
                      className={`uppercase tracking-[0.32em] text-[#ba9650] ${
                        isExpandedLike
                          ? "mb-3 text-[10px] sm:text-[12px]"
                          : "mb-2 text-[7px]"
                      }`}
                    >
                      Wedding Invitation
                    </p>

                    <div
                      className={`bg-gradient-to-r from-transparent via-[#d6b164] to-transparent opacity-80 ${
                        isExpandedLike ? "mb-4 h-px w-20" : "mb-3 h-px w-10"
                      }`}
                    />

                    <div className="flex flex-col items-center">
                      <p
                        className={`font-display leading-[1.05] text-[#3e332b] ${
                          isExpandedLike
                            ? "text-[26px] sm:text-[38px]"
                            : "text-[15px] sm:text-[18px]"
                        }`}
                      >
                        Myo Myat Khine
                      </p>

                      <p
                        className={`text-[#c59d46] ${
                          isExpandedLike ? "my-2 text-[18px]" : "my-1 text-[12px]"
                        }`}
                      >
                        &
                      </p>

                      <p
                        className={`font-display leading-[1.05] text-[#3e332b] ${
                          isExpandedLike
                            ? "text-[26px] sm:text-[38px]"
                            : "text-[15px] sm:text-[18px]"
                        }`}
                      >
                        Than Htay Hlaing
                      </p>
                    </div>

                    <div
                      className={`flex items-center gap-2 ${
                        isExpandedLike ? "my-4" : "my-2"
                      }`}
                    >
                      <span className="h-px w-6 bg-[#dcc27d]/75" />
                      <span className="text-[10px] text-[#c8a042]">✦</span>
                      <span className="h-px w-6 bg-[#dcc27d]/75" />
                    </div>

                    <p
                      className={`text-[#7d6c5f] ${
                        isExpandedLike
                          ? "max-w-[420px] text-[12px] leading-[1.7]"
                          : "max-w-[140px] text-[8px] leading-[1.5]"
                      }`}
                    >
                      Together with our families, we invite you to celebrate our
                      love and the beginning of our forever.
                    </p>

                    <div
                      className={`bg-gradient-to-r from-transparent via-[#d6b164] to-transparent opacity-80 ${
                        isExpandedLike ? "mt-4 h-px w-20" : "mt-3 h-px w-10"
                      }`}
                    />

                    <div
                      className={`${
                        isExpandedLike ? "mt-3 space-y-1" : "mt-2 space-y-[2px]"
                      }`}
                    >
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#af8a39]">
                        Sunday
                      </p>
                      <p className="text-[11px] tracking-[0.1em] text-[#8c6a2f] sm:text-[12px]">
                        29 January 2027
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute left-1/2 top-1/2 z-[10]"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  top: "50%",
                  left: "50%",
                  filter: "drop-shadow(0 30px 50px rgba(91,67,28,0.11))",
                }}
                initial={{
                  opacity: 0,
                  scale: SCENE.envelope.opened.scale + 0.02,
                  x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                  y: `calc(-50% + ${SCENE.envelope.opened.frontY}px)`,
                }}
                animate={{
                  opacity: isExpandedLike ? 0 : 1,
                  scale: SCENE.envelope.opened.scale,
                  x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                  y: `calc(-50% + ${SCENE.envelope.opened.frontY}px)`,
                }}
                transition={{
                  opacity: { duration: 0.45, ease: EASE },
                  scale: TRANSITIONS.scaleSoft,
                }}
              >
                <motion.img
                  src="/Envelope Opened Cutted.png"
                  alt="Opened envelope front pocket"
                  className="w-full"
                  initial={{ filter: "blur(6px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={TRANSITIONS.fadeBlur}
                />
              </motion.div>

              {(isVideoIntro || isSiteReveal) && (
                <motion.div
                  className="absolute inset-0 z-[30] rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isSiteReveal ? 0.65 : 0.45 }}
                  transition={{ duration: 0.55 }}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.65) 32%, rgba(255,255,255,0) 72%)",
                    transform: "scale(2)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EnvelopeOpening;