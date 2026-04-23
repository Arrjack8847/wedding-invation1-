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
      y: 12,
      scale: 1,
      mobileScale: 1.05,
    },
    opened: {
      scale: 1.2,
      mobileScale: 1.28,
      x: 0,
      backY: -8,
      frontY: -10,
      mobileBackY: -4,
      mobileFrontY: -6,
    },
  },

  card: {
    small: {
    aspectRatio: "5 / 4",
    radius: "30px 30px 14px 14px",
    startY: -10,
    revealY: -42,
    mobileStartY: -4,
    mobileRevealY: -24,
    x: 0,
    rotate: -0.3,
    scale: 1.01,
    width: "min(64vw, 250px)",
    mobileWidth: "min(50vw, 170px)",
  },
    fullscreen: {
  aspectRatio: "16 / 10",
  mobileAspectRatio: "10 / 14",
  radius: "30px",
  mobileRadius: "26px",
  width: "min(92vw, 820px)",
  mobileWidth: "min(88vw, 420px)",
},
  },

  glow: {
    size: 240,
    mobileSize: 180,
    yOffset: -20,
    mobileYOffset: -10,
    blur: 24,
  },

  hintText: {
    bottomOffset: -92,
    smBottomOffset: -96,
  },

  sceneOffset: {
  mobileY: 30,
  desktopY: 10,
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

function getCardAnimate(stage: Stage, isMobile: boolean) {
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

  const revealY = isMobile
    ? SCENE.card.small.mobileRevealY
    : SCENE.card.small.revealY;

  const startY = isMobile
    ? SCENE.card.small.mobileStartY
    : SCENE.card.small.startY;

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
            ? revealY
            : startY
        }px)`,
    rotate: isExpandedLike ? 0 : SCENE.card.small.rotate,
  };
}

function getCardInitial(isMobile: boolean) {
  const startY = isMobile
    ? SCENE.card.small.mobileStartY
    : SCENE.card.small.startY;

  return {
    opacity: 0,
    scale: 1.04,
    filter: "blur(6px)",
    x: `calc(-50% + ${SCENE.card.small.x}px)`,
    y: `calc(-50% + ${startY}px)`,
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

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 640 : false;

  const openedEnvelopeScale = isMobile
    ? SCENE.envelope.opened.mobileScale
    : SCENE.envelope.opened.scale;

  const openedBackY = isMobile
    ? SCENE.envelope.opened.mobileBackY
    : SCENE.envelope.opened.backY;

  const openedFrontY = isMobile
    ? SCENE.envelope.opened.mobileFrontY
    : SCENE.envelope.opened.frontY;

  const closedEnvelopeScale = isMobile
    ? SCENE.envelope.closed.mobileScale
    : SCENE.envelope.closed.scale;

  const cardSmallWidth = isMobile
    ? SCENE.card.small.mobileWidth
    : SCENE.card.small.width;

  const cardFullscreenWidth = isMobile
    ? SCENE.card.fullscreen.mobileWidth
    : SCENE.card.fullscreen.width;

  const glowSize = isMobile ? SCENE.glow.mobileSize : SCENE.glow.size;
  const glowYOffset = isMobile
    ? SCENE.glow.mobileYOffset
    : SCENE.glow.yOffset;

  const sceneY = isMobile
    ? SCENE.sceneOffset.mobileY
    : SCENE.sceneOffset.desktopY;
  const isCompactCard = isMobile && !isExpandedLike;

  const cardLayout = useMemo(() => {
  return {
    width: isExpandedLike ? cardFullscreenWidth : cardSmallWidth,
    aspectRatio: isExpandedLike
      ? isMobile
        ? SCENE.card.fullscreen.mobileAspectRatio
        : SCENE.card.fullscreen.aspectRatio
      : SCENE.card.small.aspectRatio,
    radius: isExpandedLike
      ? isMobile
        ? SCENE.card.fullscreen.mobileRadius
        : SCENE.card.fullscreen.radius
      : SCENE.card.small.radius,
  };
}, [isExpandedLike, cardFullscreenWidth, cardSmallWidth, isMobile]);

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
    <div className="absolute inset-0">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transform: isMobile ? "scale(1.08)" : "scale(1)",
          objectPosition: "center center",
        }}
        src="/luxury-bg.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
      />
    </div>

    <div
      className="absolute inset-0"
      style={{
        background: `
          linear-gradient(to bottom, rgba(19,14,10,0.18), rgba(19,14,10,0.42)),
          radial-gradient(circle at center, rgba(255,233,190,0.08), transparent 46%)
        `,
      }}
    />

    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4 text-center sm:px-6 md:px-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: isVideoIntro ? 1 : 0,
        y: isVideoIntro ? 0 : 10,
      }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{
        paddingTop: isMobile ? "8vh" : "0",
      }}
    >
      <div
        className="mx-auto"
        style={{
          width: isMobile ? "88vw" : "min(92vw, 720px)",
          maxWidth: isMobile ? "320px" : "720px",
        }}
      >
        <p
          className="mb-3 uppercase text-[#f0dba8] sm:mb-4"
          style={{
            fontSize: isMobile ? "9px" : "12px",
            letterSpacing: isMobile ? "0.22em" : "0.36em",
          }}
        >
          Welcome to our celebration
        </p>

        <div
          className="mx-auto mb-4 h-px bg-gradient-to-r from-transparent via-[#e3c37a] to-transparent opacity-90 sm:mb-5"
          style={{
            width: isMobile ? "72px" : "96px",
          }}
        />

        <h2
          className="font-display text-white"
          style={{
            fontSize: isMobile ? "28px" : "46px",
            lineHeight: isMobile ? "1.12" : "1.15",
          }}
        >
          Step into our story
        </h2>
      </div>
    </motion.div>
  </motion.div>
)}

      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
        <div
          className="relative flex w-full items-center justify-center"
          style={{
            transform: `translateY(${sceneY}px)`,
          }}
        >
          <motion.div
            className="relative flex w-full items-center justify-center"
            onClick={handleClick}
            style={{
              width: isMobile ? "min(88vw, 420px)" : "min(92vw, 500px)",
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
    className="pointer-events-none absolute z-[20] text-center"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    style={{
      left: "50%",
      transform: "translateX(-50%)",
      bottom: isMobile ? "-78px" : "-96px",
      width: isMobile ? "260px" : "320px",
      maxWidth: "80vw",
    }}
  >
    <p className="text-[10px] uppercase tracking-[0.18em] text-[#af8d42] sm:text-[11px]">
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
                        y: isMobile ? "calc(-50% + 110px)" : "calc(-50% + 135px)",
                        opacity: 0,
                        rotate: 10,
                      }
                    : {
                        x: "-50%",
                        y: isMobile ? "calc(-50% + 28px)" : "calc(-50% + 35px)",
                        opacity: 1,
                        rotate: 0,
                      }
                }
                transition={{
                  duration: DURATIONS.ribbonDrop,
                  ease: EASE,
                }}
                style={{
                  width: isMobile ? "32%" : "34%",
                  maxWidth: isMobile ? "110px" : "130px",
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
                  scale: closedEnvelopeScale,
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
                    scale: openedEnvelopeScale + 0.02,
                    x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                    y: `calc(-50% + ${openedBackY}px)`,
                  }}
                  animate={{
                    opacity: isExpandedLike ? 0.18 : 1,
                    scale: openedEnvelopeScale,
                    x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                    y: `calc(-50% + ${openedBackY}px)`,
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
                        ? `calc(-50% + ${glowYOffset}px)`
                        : "-50%",
                    scale: isExpandedLike ? 1.45 : 1,
                  }}
                  transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                  style={{
                    width: `${glowSize}px`,
                    height: `${glowSize}px`,
                    background:
                      "radial-gradient(circle, rgba(255,225,170,0.40) 0%, rgba(255,225,170,0.16) 38%, rgba(255,225,170,0) 72%)",
                    filter: `blur(${SCENE.glow.blur}px)`,
                    pointerEvents: "none",
                  }}
                />

                <motion.div
                  className="absolute left-1/2 top-1/2 z-[8]"
                  initial={getCardInitial(isMobile)}
                  animate={getCardAnimate(stage, isMobile)}
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
  className={`relative flex h-full flex-col items-center justify-start text-center ${
    isExpandedLike
  ? isMobile
    ? "px-5 py-7"
    : "px-8 py-8 sm:px-12"
  : isCompactCard
  ? "px-2.5 pt-5 pb-2"
  : "px-3 py-4 sm:px-4"
  }`}
>
                      <p
  className={`uppercase text-[#ba9650] ${
    isExpandedLike
  ? isMobile
    ? "mb-2.5 text-[9px] tracking-[0.24em]"
    : "mb-3 text-[10px] tracking-[0.32em] sm:text-[12px]"
  : isCompactCard
  ? "mb-1.5 text-[5.5px] tracking-[0.18em]"
  : "mb-2 text-[7px] tracking-[0.26em]"
  }`}
>
  Wedding Invitation
</p>

<div
  className={`bg-gradient-to-r from-transparent via-[#d6b164] to-transparent opacity-80 ${
    isExpandedLike
      ? "mb-4 h-px w-20"
      : isCompactCard
      ? "mb-2 h-px w-8"
      : "mb-3 h-px w-10"
  }`}
/>

<div className="flex flex-col items-center">
  <p
    className={`font-display text-[#3e332b] ${
      isExpandedLike
  ? isMobile
    ? "text-[22px] leading-[1.06]"
    : "text-[26px] leading-[1.05] sm:text-[38px]"
  : isCompactCard
  ? "text-[10px] leading-[1.02]"
  : "text-[13px] leading-[1.04] sm:text-[18px]"
    }`}
  >
    Myo Myat Khine
  </p>

  <p
    className={`text-[#c59d46] ${
      isExpandedLike
  ? isMobile
    ? "my-1.5 text-[15px]"
    : "my-2 text-[18px]"
  : isCompactCard
  ? "my-[2px] text-[8px]"
  : "my-1 text-[10px]"
    }`}
  >
    &
  </p>

  <p
    className={`font-display text-[#3e332b] ${
  isExpandedLike
    ? isMobile
      ? "text-[22px] leading-[1.06]"
      : "text-[26px] leading-[1.05] sm:text-[38px]"
    : isCompactCard
    ? "text-[10px] leading-[1.02]"
    : "text-[13px] leading-[1.04] sm:text-[18px]"
}`}
  >
    Than Htay Hlaing
  </p>
</div>

<div
  className={`flex items-center ${
  isExpandedLike
    ? isMobile
      ? "my-3 gap-2"
      : "my-4 gap-2"
    : isCompactCard
    ? "my-1.5 gap-1"
    : "my-2 gap-2"
}`}
>
  <span
  className={`h-px bg-[#dcc27d]/75 ${
    isExpandedLike ? (isMobile ? "w-5" : "w-6") : isCompactCard ? "w-4" : "w-6"
  }`}
/>
  <span
  className={`text-[#c8a042] ${
    isExpandedLike ? (isMobile ? "text-[9px]" : "text-[10px]") : isCompactCard ? "text-[7px]" : "text-[10px]"
  }`}
>
  ✦
</span>
  <span className={`${isCompactCard ? "w-4" : "w-6"} h-px bg-[#dcc27d]/75`} />
</div>

<p
  className={`text-[#7d6c5f] ${
    isExpandedLike
  ? isMobile
    ? "max-w-[240px] text-[11px] leading-[1.65]"
    : "max-w-[420px] text-[12px] leading-[1.7]"
  : isCompactCard
  ? "max-w-[112px] text-[6px] leading-[1.3]"
  : "max-w-[125px] text-[7px] leading-[1.45]"
  }`}
>
  Together with our families, we invite you to celebrate our
  love and the beginning of our forever.
</p>

<div
  className={`bg-gradient-to-r from-transparent via-[#d6b164] to-transparent opacity-80 ${
    isExpandedLike
      ? "mt-4 h-px w-20"
      : isCompactCard
      ? "mt-2 h-px w-8"
      : "mt-3 h-px w-10"
  }`}
/>

<div
  className={`${
    isExpandedLike
  ? isMobile
    ? "mt-2.5 space-y-1"
    : "mt-3 space-y-1"
  : isCompactCard
  ? "mt-1.5 space-y-[1px]"
  : "mt-2 space-y-[2px]"
  }`}
>
  <p
    className={`uppercase text-[#af8a39] ${
      isExpandedLike
  ? isMobile
    ? "text-[8px] tracking-[0.14em]"
    : "text-[8px] tracking-[0.16em]"
  : isCompactCard
  ? "text-[6px] tracking-[0.12em]"
  : "text-[8px] tracking-[0.16em]"
    }`}
  >
    Sunday
  </p>
  <p
    className={`text-[#8c6a2f] ${
      isExpandedLike
  ? isMobile
    ? "text-[10px] tracking-[0.05em]"
    : "text-[11px] tracking-[0.1em] sm:text-[12px]"
  : isCompactCard
  ? "text-[7px] tracking-[0.04em]"
  : "text-[10px] tracking-[0.06em] sm:text-[12px]"
    }`}
  >
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
                    scale: openedEnvelopeScale + 0.02,
                    x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                    y: `calc(-50% + ${openedFrontY}px)`,
                  }}
                  animate={{
                    opacity: isExpandedLike ? 0 : 1,
                    scale: openedEnvelopeScale,
                    x: `calc(-50% + ${SCENE.envelope.opened.x}px)`,
                    y: `calc(-50% + ${openedFrontY}px)`,
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
    </div>
  );
};

export default EnvelopeOpening;