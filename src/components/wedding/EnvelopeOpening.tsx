import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onOpen: () => void;
}

type Stage = "sealed" | "opening" | "peek" | "expanded" | "closing" | "done";

const EnvelopeOpening = ({ onOpen }: Props) => {
  const [stage, setStage] = useState<Stage>("sealed");

  const handleClick = () => {
    if (stage === "sealed") {
      setStage("opening");

      setTimeout(() => {
        setStage("peek");
      }, 1350);
      return;
    }

    if (stage === "peek") {
      setStage("expanded");
      return;
    }

    if (stage === "expanded") {
      setStage("closing");

      setTimeout(() => {
        setStage("done");
        onOpen();
      }, 850);
    }
  };

  const showEnvelope =
    stage === "sealed" || stage === "opening" || stage === "peek";
  const showExpandedLetter = stage === "expanded" || stage === "closing";

  return (
    <AnimatePresence mode="wait">
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at top, hsla(43,76%,52%,0.10), transparent 30%), linear-gradient(135deg, hsl(45,100%,98%) 0%, hsl(35,55%,91%) 45%, hsl(45,100%,98%) 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* ambient background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/6 blur-3xl sm:h-[700px] sm:w-[700px]"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute left-[18%] top-[24%] h-[170px] w-[170px] rounded-full bg-gold/5 blur-2xl sm:left-[28%] sm:top-[30%] sm:h-[260px] sm:w-[260px]"
              animate={{
                y: [0, -18, 0],
                x: [0, 8, 0],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {showEnvelope && (
            <div
              className="absolute inset-0 flex items-center justify-center px-4 sm:px-6"
              onClick={handleClick}
              style={{ perspective: "1600px" }}
            >
              <motion.div
                className="relative cursor-pointer select-none"
                animate={{
                  y: stage === "peek" ? -6 : 0,
                  scale: stage === "peek" ? 1.01 : 1,
                }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* floor shadow */}
                <motion.div
                  className="absolute left-1/2 top-[92%] h-8 w-[210px] -translate-x-1/2 rounded-full bg-black/15 blur-2xl sm:top-[90%] sm:h-10 sm:w-[360px]"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    scale:
                      stage === "opening"
                        ? 0.9
                        : stage === "peek"
                        ? 0.84
                        : 1,
                  }}
                  transition={{ duration: 0.8 }}
                />

                {/* envelope shell */}
                <motion.div
                  className="relative h-[190px] w-[280px] sm:h-[310px] sm:w-[460px]"
                  initial={{ scale: 0.88, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* glow behind letter */}
                  <motion.div
                    className="absolute left-1/2 top-[30%] z-[1] h-[90px] w-[170px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl sm:top-[32%] sm:h-[120px] sm:w-[220px]"
                    animate={{
                      opacity:
                        stage === "sealed"
                          ? 0.15
                          : stage === "opening"
                          ? 0.35
                          : 0.45,
                      scale:
                        stage === "sealed"
                          ? 0.9
                          : stage === "opening"
                          ? 1.05
                          : 1.12,
                    }}
                    transition={{ duration: 0.9 }}
                  />

                  {/* main back panel */}
                  <div
                    className="absolute inset-0 rounded-[16px] sm:rounded-[18px] shadow-[0_28px_70px_rgba(0,0,0,0.16)]"
                    style={{
                      background:
                        "linear-gradient(145deg, hsl(37,58%,91%) 0%, hsl(35,48%,84%) 58%, hsl(34,42%,79%) 100%)",
                      border: "1px solid hsla(43,76%,52%,0.22)",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-[16px] sm:rounded-[18px]"
                      style={{
                        background:
                          "linear-gradient(135deg, transparent 35%, hsla(43,76%,52%,0.07) 50%, transparent 65%)",
                      }}
                    />
                  </div>

                  {/* letter inside */}
                  <motion.div
                    className="absolute left-[8%] right-[8%] z-[2] rounded-[10px] sm:left-[9%] sm:right-[9%] sm:rounded-[12px]"
                    style={{
                      top: "14%",
                      bottom: "10%",
                      background:
                        "linear-gradient(to bottom, hsl(45,100%,99%) 0%, hsl(40,55%,96%) 100%)",
                      border: "1px solid hsla(43,76%,52%,0.14)",
                      boxShadow: "0 16px 34px rgba(0,0,0,0.10)",
                    }}
                    animate={
                      stage === "opening"
                        ? {
                            y: -95,
                            scale: [1, 1.02, 1],
                          }
                        : stage === "peek"
                        ? {
                            y: -95,
                            scale: 1.01,
                          }
                        : { y: 0, scale: 1 }
                    }
                    transition={{
                      duration: 1.15,
                      delay: stage === "opening" ? 0.28 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="absolute inset-[8px] rounded-[7px] border border-gold/10 sm:inset-[10px] sm:rounded-[8px]" />
                    <div className="absolute left-1/2 top-3 h-px w-14 -translate-x-1/2 bg-gold/20 sm:top-4 sm:w-20" />
                    <div className="absolute bottom-3 left-1/2 h-px w-14 -translate-x-1/2 bg-gold/20 sm:bottom-4 sm:w-20" />

                    <div className="flex h-full flex-col items-center justify-center px-4 py-4 text-center sm:px-6 sm:py-5">
                      <p className="mb-2 font-display text-[8px] uppercase tracking-[0.34em] text-gold/80 sm:mb-3 sm:text-xs sm:tracking-[0.42em]">
                        Wedding Invitation
                      </p>

                      <p className="font-display text-[17px] leading-tight text-foreground sm:text-[30px]">
                        Myo Myat Khine
                      </p>

                      <p className="my-1 font-display text-base text-gold/90 sm:text-lg">
                        &
                      </p>

                      <p className="font-display text-[17px] leading-tight text-foreground sm:text-[30px]">
                        Than Htay Hlaing
                      </p>

                      <div className="my-3 h-px w-10 bg-gold/35 sm:my-4 sm:w-12" />

                      <p className="max-w-[220px] text-[10px] leading-relaxed text-muted-foreground sm:max-w-[260px] sm:text-sm">
                        Together with our families, we invite you to celebrate
                        our wedding and the beginning of our forever.
                      </p>

                      <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:mt-4 sm:text-[11px] sm:tracking-[0.24em]">
                        29 January 2023
                      </p>
                    </div>
                  </motion.div>

                  {/* bottom center fold */}
                  <div
                    className="absolute bottom-0 left-0 right-0 z-[3] h-[58%]"
                    style={{
                      clipPath: "polygon(0 100%, 50% 34%, 100% 100%)",
                      background:
                        "linear-gradient(180deg, hsla(35,36%,88%,0.85) 0%, hsla(34,34%,75%,0.92) 100%)",
                    }}
                  />

                  {/* left fold */}
                  <div
                    className="absolute bottom-0 left-0 z-[4] h-[62%] w-1/2"
                    style={{
                      clipPath: "polygon(0 100%, 0 18%, 100% 72%, 100% 100%)",
                      background:
                        "linear-gradient(135deg, hsla(36,45%,90%,0.95) 0%, hsla(34,38%,78%,0.96) 100%)",
                    }}
                  />

                  {/* right fold */}
                  <div
                    className="absolute bottom-0 right-0 z-[4] h-[62%] w-1/2"
                    style={{
                      clipPath: "polygon(100% 100%, 100% 18%, 0 72%, 0 100%)",
                      background:
                        "linear-gradient(225deg, hsla(36,45%,90%,0.95) 0%, hsla(34,38%,78%,0.96) 100%)",
                    }}
                  />

                  {/* top flap */}
                  <motion.div
                    className="absolute left-0 right-0 top-0 z-[5] h-[54%] origin-top"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background:
                        "linear-gradient(180deg, hsl(35,56%,86%) 0%, hsl(35,54%,80%) 100%)",
                      filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.06))",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                    animate={
                      stage === "opening" || stage === "peek"
                        ? { rotateX: -180 }
                        : { rotateX: 0 }
                    }
                    transition={{
                      duration: 0.9,
                      ease: [0.68, -0.2, 0.32, 1.2],
                    }}
                  >
                    <div className="absolute left-1/2 top-[18%] h-px w-16 -translate-x-1/2 bg-white/30 sm:w-24" />
                  </motion.div>

                  {/* wax seal */}
                  <motion.div
                    className="absolute left-1/2 top-[16%] z-[6] flex h-[52px] w-[52px] -translate-x-1/2 items-center justify-center rounded-full sm:top-[18%] sm:h-[68px] sm:w-[68px]"
                    animate={
                      stage === "opening"
                        ? {
                            scale: [1, 1.18, 0],
                            rotate: [0, 10, -22],
                            opacity: [1, 1, 0],
                          }
                        : stage === "peek"
                        ? { scale: 0, opacity: 0 }
                        : { scale: 1, opacity: 1 }
                    }
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    style={{
                      background:
                        "radial-gradient(circle at 35% 35%, hsl(352,58%,48%), hsl(350,45%,31%) 72%)",
                      boxShadow:
                        "inset 0 2px 5px rgba(255,255,255,0.18), inset 0 -4px 8px rgba(0,0,0,0.12), 0 10px 18px rgba(0,0,0,0.18)",
                    }}
                  >
                    <span className="font-display text-[15px] font-bold tracking-[0.12em] text-amber-100 sm:text-[21px] sm:tracking-[0.16em]">
                      M&T
                    </span>
                  </motion.div>
                </motion.div>

                {(stage === "sealed" || stage === "peek") && (
                  <motion.p
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground/80 sm:-bottom-14 sm:text-sm sm:tracking-[0.35em]"
                    animate={{
                      opacity: [0.35, 0.85, 0.35],
                      y: [0, -2, 0],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  >
                    {stage === "sealed" ? "Tap to Open" : "Tap to View"}
                  </motion.p>
                )}
              </motion.div>
            </div>
          )}

          {/* expanded full letter */}
          <AnimatePresence>
            {showExpandedLetter && (
              <motion.div
                className="absolute inset-0 z-[60] flex items-center justify-center px-3 py-4 sm:px-8 sm:py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: stage === "closing" ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                onClick={handleClick}
              >
                <motion.div
                  initial={{
                    scale: 0.84,
                    y: 60,
                    opacity: 0,
                    rotateX: 8,
                    borderRadius: 20,
                  }}
                  animate={{
                    scale: stage === "closing" ? 1.05 : 1,
                    y: 0,
                    opacity: stage === "closing" ? 0 : 1,
                    rotateX: stage === "closing" ? 2 : 0,
                    filter: stage === "closing" ? "blur(10px)" : "blur(0px)",
                  }}
                  transition={{
                    duration: stage === "closing" ? 0.8 : 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex h-full min-h-[88vh] w-full max-w-5xl items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(to_bottom,hsl(45,100%,99%)_0%,hsl(40,55%,96%)_100%)] shadow-[0_30px_90px_rgba(0,0,0,0.16)] sm:min-h-[75vh] sm:rounded-none"
                  style={{
                    border: "1px solid hsla(43,76%,52%,0.14)",
                  }}
                >
                  {/* cinematic glow */}
                  <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(43,76%,52%,0.08),transparent_32%)]"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="absolute inset-[10px] border border-gold/10 sm:inset-[16px]" />
                  <div className="absolute left-1/2 top-6 h-px w-20 -translate-x-1/2 bg-gold/20 sm:top-10 sm:w-28" />
                  <div className="absolute bottom-6 left-1/2 h-px w-20 -translate-x-1/2 bg-gold/20 sm:bottom-10 sm:w-28" />

                  <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center px-5 py-10 text-center sm:px-14 sm:py-16">
                    <motion.p
                      className="mb-4 font-display text-[9px] uppercase tracking-[0.34em] text-gold/80 sm:mb-5 sm:text-xs sm:tracking-[0.48em]"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.7 }}
                    >
                      Wedding Invitation
                    </motion.p>

                    <motion.p
                      className="font-display text-[28px] leading-tight text-foreground sm:text-5xl"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      Myo Myat Khine
                    </motion.p>

                    <motion.p
                      className="my-2 font-display text-lg text-gold/90 sm:text-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.42, duration: 0.6 }}
                    >
                      &
                    </motion.p>

                    <motion.p
                      className="font-display text-[28px] leading-tight text-foreground sm:text-5xl"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      Than Htay Hlaing
                    </motion.p>

                    <motion.div
                      className="my-5 h-px w-14 bg-gold/40 sm:my-7 sm:w-16"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.65, duration: 0.6 }}
                    />

                    <motion.p
                      className="max-w-xl text-[13px] leading-7 text-muted-foreground sm:text-base sm:leading-8"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    >
                      Together with our families, we invite you to celebrate our
                      wedding and the beginning of our forever. Your presence
                      would make this day even more meaningful as we start this
                      beautiful new chapter together.
                    </motion.p>

                    <motion.p
                      className="mt-7 text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:mt-8 sm:text-xs sm:tracking-[0.28em]"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.95, duration: 0.65 }}
                    >
                      29 January 2023
                    </motion.p>

                    <motion.p
                      className="mt-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80 sm:mt-3 sm:text-xs sm:tracking-[0.2em]"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.05, duration: 0.65 }}
                    >
                      Signing Ceremony & Wedding Celebration
                    </motion.p>
                  </div>

                  <motion.p
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground/80 sm:bottom-8 sm:text-xs sm:tracking-[0.35em]"
                    animate={{ opacity: [0.35, 0.85, 0.35], y: [0, -2, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  >
                    Tap to continue
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeOpening;