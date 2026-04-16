import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onOpen: () => void;
}

type Stage =
  | "sealed"
  | "openingFade"
  | "cardRising"
  | "revealed"
  | "fullscreen"
  | "transitioning"
  | "done";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const OPEN_FADE_DURATION = 0.55;
const CARD_RISE_DURATION = 1.45;
const FULLSCREEN_DURATION = 0.9;
const ENTER_DURATION = 0.7;

const floatTransition = {
  duration: 3.6,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

const EnvelopeOpening = ({ onOpen }: Props) => {
  const [stage, setStage] = useState<Stage>("sealed");
  const timeoutsRef = useRef<number[]>([]);

  const addTimeout = (callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay);
    timeoutsRef.current.push(id);
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const isSealed = stage === "sealed";
  const isOpeningFade = stage === "openingFade";
  const isCardRising = stage === "cardRising";
  const isRevealed = stage === "revealed";
  const isFullscreen = stage === "fullscreen";
  const isTransitioning = stage === "transitioning";

  const isBusy =
    stage === "openingFade" ||
    stage === "cardRising" ||
    stage === "transitioning";

  const handleClick = useCallback(() => {
    if (isBusy) return;

    if (stage === "sealed") {
      setStage("openingFade");

      addTimeout(() => {
        setStage("cardRising");
      }, OPEN_FADE_DURATION * 1000);

      addTimeout(() => {
        setStage("revealed");
      }, (OPEN_FADE_DURATION + CARD_RISE_DURATION) * 1000);

      return;
    }

    if (stage === "revealed") {
      setStage("fullscreen");
      return;
    }

    if (stage === "fullscreen") {
      setStage("transitioning");

      addTimeout(() => {
        setStage("done");
        onOpen();
      }, ENTER_DURATION * 1000);
    }
  }, [stage, isBusy, onOpen]);

  if (stage === "done") return null;

  // Keep your exact working PNG positions
  const backEnvelopeY = -18;
  const frontPocketY = -20;
  const openedEnvelopeScale = 1.38;

  // Keep your exact working card positions
  const cardStartY = 26;
  const cardRevealY = -76;

  const cardWidth =
    isFullscreen || isTransitioning ? "min(90vw, 820px)" : "48%";
  const cardMaxWidth =
    isFullscreen || isTransitioning ? "820px" : "220px";
  const cardAspectRatio =
    isFullscreen || isTransitioning ? "16 / 10" : "5 / 7";
  const cardRadius =
    isFullscreen || isTransitioning ? "34px" : "34px 34px 16px 16px";

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
      <motion.div
        className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:h-[680px] sm:w-[680px]"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.52, 0.72, 0.52],
        }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(212,177,92,0.22) 0%, rgba(212,177,92,0.10) 36%, rgba(212,177,92,0) 72%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.20), rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.00) 60%)",
        }}
      />

      {(isFullscreen || isTransitioning) && (
        <motion.div
          className="absolute inset-0 z-[4]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0.92 : 0.55 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            background:
              "linear-gradient(180deg, rgba(255,250,244,0.68), rgba(245,234,216,0.84))",
            pointerEvents: "none",
          }}
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          className="relative flex w-full max-w-[320px] items-center justify-center sm:max-w-[520px]"
          onClick={handleClick}
          animate={
            isSealed
              ? { y: [0, -8, 0] }
              : isTransitioning
              ? { opacity: 0, scale: 1.02 }
              : { opacity: 1, scale: 1 }
          }
          transition={
            isSealed ? floatTransition : { duration: 0.7, ease: EASE }
          }
          style={{
            cursor: isBusy ? "default" : "pointer",
          }}
        >
          {!isTransitioning && (
            <motion.div
              key={stage}
              className="absolute -bottom-20 left-1/2 z-[20] -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#af8d42] sm:text-[11px]">
                {isSealed
                  ? "Tap to Open"
                  : isRevealed
                  ? "Tap to Expand"
                  : isFullscreen
                  ? "Tap to Enter"
                  : ""}
              </p>
            </motion.div>
          )}

          {/* CLOSED ENVELOPE ONLY BEFORE FIRST CLICK */}
          {isSealed && (
            <motion.img
              src="/Envelope Closed.png"
              alt="Closed envelope"
              className="relative z-[6] w-full max-w-[300px] drop-shadow-[0_26px_50px_rgba(93,70,28,0.16)] sm:max-w-[500px]"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          )}

          {/* OPENED ENVELOPE SYSTEM */}
          {!isSealed && (
            <>
              {/* BACK PNG */}
             <motion.img
  src="/Envelope Opened.png"
  alt="Opened envelope back"
  className="absolute left-1/2 top-1/2 z-[1] w-[112%] max-w-[340px] sm:max-w-[560px]"
  initial={{
    opacity: 0,
    scale: openedEnvelopeScale - 0.015,
    x: "-50%",
    y: `calc(-50% + ${backEnvelopeY}px)`,
  }}
  animate={{
    opacity: isFullscreen || isTransitioning ? 0.18 : 1,
    scale: openedEnvelopeScale,
    x: "-50%",
    y: `calc(-50% + ${backEnvelopeY}px)`,
  }}
  transition={{
    opacity: {
      duration: isOpeningFade ? 0.9 : 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
    scale: {
      duration: isOpeningFade ? 1.05 : 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  }}
  style={{
    top: "50%",
    left: "50%",
    filter: "drop-shadow(0 30px 50px rgba(91,67,28,0.11))",
  }}
/>

              {/* CARD GLOW */}
              <motion.div
                className="absolute left-1/2 top-1/2 z-[2] rounded-full"
                initial={{ opacity: 0 }}
                animate={{
                  opacity:
                    isCardRising || isRevealed
                      ? 0.24
                      : isFullscreen
                      ? 0.34
                      : 0.16,
                  x: "-50%",
                  y:
                    isCardRising || isRevealed
                      ? "calc(-50% - 28px)"
                      : "-50%",
                  scale: isFullscreen ? 1.6 : 1,
                }}
                transition={{ duration: 0.7, ease: EASE }}
                style={{
                  width: "260px",
                  height: "260px",
                  background:
                    "radial-gradient(circle, rgba(255,225,170,0.40) 0%, rgba(255,225,170,0.16) 38%, rgba(255,225,170,0) 72%)",
                  filter: "blur(26px)",
                  pointerEvents: "none",
                }}
              />

              {/* CARD */}
              <motion.div
                className="absolute left-1/2 top-1/2 z-[8]"
                initial={false}
                animate={{
                  opacity: 1,
                  x: "-50%",
                  y:
                    isFullscreen || isTransitioning
                      ? "-50%"
                      : `calc(-50% + ${
                          isOpeningFade
                            ? cardStartY
                            : isCardRising || isRevealed
                            ? cardRevealY
                            : cardStartY
                        }px)`,
                  scale: isFullscreen || isTransitioning ? 1 : 1,
                  rotate:
                    isFullscreen || isTransitioning
                      ? 0
                      : isCardRising || isRevealed
                      ? -1
                      : 0,
                  width: cardWidth,
                  maxWidth: cardMaxWidth,
                }}
                transition={{
                  y:
                    isOpeningFade
                      ? { duration: 0 }
                      : isCardRising
                      ? { duration: CARD_RISE_DURATION, ease: EASE }
                      : isFullscreen || isTransitioning
                      ? { duration: FULLSCREEN_DURATION, ease: EASE }
                      : { duration: 0 },
                  rotate:
                    isCardRising
                      ? { duration: CARD_RISE_DURATION, ease: EASE }
                      : isFullscreen || isTransitioning
                      ? { duration: FULLSCREEN_DURATION, ease: EASE }
                      : { duration: 0 },
                  width:
                    isFullscreen || isTransitioning
                      ? { duration: FULLSCREEN_DURATION, ease: EASE }
                      : { duration: 0 },
                  maxWidth:
                    isFullscreen || isTransitioning
                      ? { duration: FULLSCREEN_DURATION, ease: EASE }
                      : { duration: 0 },
                  opacity: { duration: 0.2, ease: EASE },
                }}
                style={{
                  aspectRatio: cardAspectRatio,
                  transformOrigin: "center center",
                }}
              >
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    borderRadius: cardRadius,
                    background:
                      "linear-gradient(180deg, #fffdf8 0%, #fbf4e8 55%, #f8eedf 100%)",
                    border: "1px solid #e7d7b4",
                    boxShadow:
                      isFullscreen || isTransitioning
                        ? `
                          inset 0 1px 0 rgba(255,255,255,0.95),
                          inset 0 -10px 18px rgba(93,70,28,0.05),
                          0 30px 70px rgba(93,70,28,0.16),
                          0 10px 24px rgba(93,70,28,0.10)
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
                      isFullscreen || isTransitioning
                        ? "inset-[18px]"
                        : "inset-[8px]"
                    }`}
                    style={{
                      borderRadius:
                        isFullscreen || isTransitioning
                          ? "28px"
                          : "26px 26px 12px 12px",
                    }}
                  />
                  <div
                    className={`absolute border border-[#f6eddd] ${
                      isFullscreen || isTransitioning
                        ? "inset-[28px]"
                        : "inset-[14px]"
                    }`}
                    style={{
                      borderRadius:
                        isFullscreen || isTransitioning
                          ? "22px"
                          : "20px 20px 10px 10px",
                    }}
                  />

                  <div
                    className={`relative flex h-full flex-col items-center justify-center text-center ${
                      isFullscreen || isTransitioning
                        ? "px-10 py-12 sm:px-14"
                        : "px-4 py-6 sm:px-5"
                    }`}
                  >
                    <p
                      className={`uppercase tracking-[0.42em] text-[#ba9650] ${
                        isFullscreen || isTransitioning
                          ? "mb-5 text-[10px] sm:text-[12px]"
                          : "mb-3 text-[7px] sm:text-[8px]"
                      }`}
                    >
                      Wedding Invitation
                    </p>

                    <div
                      className={`bg-gradient-to-r from-transparent via-[#d6b164] to-transparent opacity-80 ${
                        isFullscreen || isTransitioning
                          ? "mb-7 h-px w-24"
                          : "mb-4 h-px w-12"
                      }`}
                    />

                    <div
                      className={
                        isFullscreen || isTransitioning
                          ? "space-y-2"
                          : "space-y-[2px]"
                      }
                    >
                      <p
                        className={`font-display leading-[1.02] text-[#3e332b] ${
                          isFullscreen || isTransitioning
                            ? "text-[28px] sm:text-[42px]"
                            : "text-[16px] sm:text-[21px]"
                        }`}
                      >
                        Myo Myat
                      </p>
                      <p
                        className={`font-display leading-[1.02] text-[#3e332b] ${
                          isFullscreen || isTransitioning
                            ? "text-[28px] sm:text-[42px]"
                            : "text-[16px] sm:text-[21px]"
                        }`}
                      >
                        Khine
                      </p>
                    </div>

                    <p
                      className={`text-[#c59d46] ${
                        isFullscreen || isTransitioning
                          ? "my-4 text-[22px] sm:text-[28px]"
                          : "my-2 text-[13px] sm:text-[15px]"
                      }`}
                    >
                      &
                    </p>

                    <div
                      className={
                        isFullscreen || isTransitioning
                          ? "space-y-2"
                          : "space-y-[2px]"
                      }
                    >
                      <p
                        className={`font-display leading-[1.02] text-[#3e332b] ${
                          isFullscreen || isTransitioning
                            ? "text-[28px] sm:text-[42px]"
                            : "text-[16px] sm:text-[21px]"
                        }`}
                      >
                        Than Htay
                      </p>
                      <p
                        className={`font-display leading-[1.02] text-[#3e332b] ${
                          isFullscreen || isTransitioning
                            ? "text-[28px] sm:text-[42px]"
                            : "text-[16px] sm:text-[21px]"
                        }`}
                      >
                        Hlaing
                      </p>
                    </div>

                    <div
                      className={`flex items-center gap-2 ${
                        isFullscreen || isTransitioning ? "my-7" : "my-4"
                      }`}
                    >
                      <span
                        className={`bg-[#dcc27d]/75 ${
                          isFullscreen || isTransitioning
                            ? "h-px w-10"
                            : "h-px w-6"
                        }`}
                      />
                      <span
                        className={`text-[#c8a042] ${
                          isFullscreen || isTransitioning
                            ? "text-[12px]"
                            : "text-[8px]"
                        }`}
                      >
                        ✦
                      </span>
                      <span
                        className={`bg-[#dcc27d]/75 ${
                          isFullscreen || isTransitioning
                            ? "h-px w-10"
                            : "h-px w-6"
                        }`}
                      />
                    </div>

                    <p
                      className={`text-[#7d6c5f] ${
                        isFullscreen || isTransitioning
                          ? "max-w-[500px] text-[13px] leading-[1.9] sm:text-[15px]"
                          : "max-w-[165px] text-[8px] leading-[1.65] sm:text-[9px]"
                      }`}
                    >
                      Together with our families, we invite you to celebrate
                      our love, our joy, and the beginning of our forever.
                    </p>

                    <div
                      className={`bg-gradient-to-r from-transparent via-[#d6b164] to-transparent opacity-80 ${
                        isFullscreen || isTransitioning
                          ? "mt-7 h-px w-28"
                          : "mt-4 h-px w-14"
                      }`}
                    />

                    <div
                      className={
                        isFullscreen || isTransitioning
                          ? "mt-6 space-y-2"
                          : "mt-3 space-y-1"
                      }
                    >
                      <p
                        className={`uppercase tracking-[0.26em] text-[#af8a39] ${
                          isFullscreen || isTransitioning
                            ? "text-[10px] sm:text-[12px]"
                            : "text-[7px] sm:text-[8px]"
                        }`}
                      >
                        Sunday
                      </p>
                      <p
                        className={`tracking-[0.14em] text-[#8c6a2f] ${
                          isFullscreen || isTransitioning
                            ? "text-[13px] sm:text-[15px]"
                            : "text-[10px] sm:text-[11px]"
                        }`}
                      >
                        29 January 2027
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FRONT POCKET */}
              <motion.img
  src="/Envelope Opened Cutted.png"
  alt="Opened envelope front pocket"
  className="absolute left-1/2 top-1/2 z-[10] w-[112%] max-w-[340px] sm:max-w-[560px]"
  initial={{
    opacity: 0,
    scale: openedEnvelopeScale - 0.015,
    x: "-50%",
    y: `calc(-50% + ${frontPocketY}px)`,
  }}
  animate={{
    opacity: isFullscreen || isTransitioning ? 0 : 1,
    scale: openedEnvelopeScale,
    x: "-50%",
    y: `calc(-50% + ${frontPocketY}px)`,
  }}
  transition={{
    opacity: {
      duration: isOpeningFade ? 0.9 : 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
    scale: {
      duration: isOpeningFade ? 1.05 : 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  }}
  style={{
    top: "50%",
    left: "50%",
    filter: "drop-shadow(0 30px 50px rgba(91,67,28,0.11))",
  }}
/>

              {isTransitioning && (
                <motion.div
                  className="absolute inset-0 z-[30] rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
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