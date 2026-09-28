"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, X } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import CertificateLightField from "@/components/visuals/CertificateLightField";

const ease = [0.215, 0.61, 0.355, 1] as const;

/* ── Fixed Deterministic Accent Color System ──────────── */
interface CertTheme {
  primary: string; // solid accent color
  glow: string;    // soft ambient glow
  bg: string;      // subtle card background tint
  border: string;  // border accent
}

const CERT_THEMES: CertTheme[] = [
  {
    // Certificate 01: Pink / Magenta — Rajya Puraskar
    primary: "#EC4899",
    glow: "rgba(236, 72, 153, 0.14)",
    bg: "rgba(236, 72, 153, 0.035)",
    border: "rgba(236, 72, 153, 0.28)",
  },
  {
    // Certificate 02: Electric Blue — AI Hackathon
    primary: "#EF4444",
    glow: "rgba(239, 68, 68, 0.14)",
    bg: "rgba(239, 68, 68, 0.035)",
    border: "rgba(239, 68, 68, 0.28)",
  },
  {
    // Certificate 03: Violet / Purple — Walmart Global Tech
    primary: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.14)",
    bg: "rgba(139, 92, 246, 0.035)",
    border: "rgba(139, 92, 246, 0.28)",
  },
  {
    // Certificate 04: Orange — Deloitte Technology Simulation
    primary: "#F97316",
    glow: "rgba(249, 115, 22, 0.14)",
    bg: "rgba(249, 115, 22, 0.035)",
    border: "rgba(249, 115, 22, 0.28)",
  },
  {
    // Certificate 05: Cyan / Teal — Tata Data Visualization
    primary: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.14)",
    bg: "rgba(6, 182, 212, 0.035)",
    border: "rgba(6, 182, 212, 0.28)",
  },
];

export default function Certifications() {
  const { certifications } = portfolioData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Manual navigation handlers
  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((i) => (i === 0 ? certifications.length - 1 : i - 1));
  }, [certifications.length]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => (i === certifications.length - 1 ? 0 : i + 1));
  }, [certifications.length]);

  // Automatic 7-second continuous slideshow (pauses on hover or when modal is open)
  useEffect(() => {
    if (isPaused || isModalOpen) return;

    const timer = setInterval(() => {
      next();
    }, 7000);

    return () => clearInterval(timer);
  }, [isPaused, isModalOpen, next, currentIndex]);

  // Global Keyboard navigation and modal escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      } else if (!isModalOpen) {
        if (e.key === "ArrowLeft") {
          prev();
        } else if (e.key === "ArrowRight") {
          next();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, prev, next]);

  // Lock body scroll when preview modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const current = certifications[currentIndex];
  const theme = CERT_THEMES[currentIndex % CERT_THEMES.length];

  // Refined image & card transition: subtle 16px horizontal movement, opacity, and scale
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 16 : -16,
      opacity: 0,
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -16 : 16,
      opacity: 0,
      scale: 0.985,
    }),
  };

  return (
    <section
      id="certifications"
      className="relative px-4 py-16 sm:px-6 md:px-12 md:py-32 lg:px-16 overflow-hidden"
      style={{ borderTop: `1px solid ${theme.border}` }}
    >
      {/* Top subtle ambient glow matched to active certificate */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[280px] -translate-x-1/2"
        animate={{
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.6, ease }}
        style={{ filter: "blur(60px)" }}
      />

      <div
        className="relative mx-auto max-w-[1400px] outline-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        tabIndex={0}
        role="region"
        aria-label="Certifications & achievements carousel"
      >
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 sm:mb-12 flex flex-col justify-between gap-6 sm:gap-8 lg:flex-row lg:items-end"
        >
          <div className="flex-shrink-0">
            <p
              className="text-xs uppercase tracking-[0.22em] mb-3 sm:mb-4 transition-colors duration-500 font-medium"
              style={{ color: theme.primary }}
            >
              Recognition
            </p>
            <h2
              className="font-[family-name:var(--font-space-grotesk)] leading-[0.92] tracking-[-0.05em]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5.5rem)" }}
            >
              Certifications &amp;
              <br />
              <motion.span
                animate={{ color: theme.primary }}
                transition={{ duration: 0.5, ease }}
              >
                achievements.
              </motion.span>
            </h2>
          </div>

          {/* Abstract Certificate Light Field on the upper right */}
          <div className="flex flex-col items-start lg:items-end select-none w-full lg:w-[48%] xl:w-[54%] max-w-[620px] pb-1 overflow-hidden sm:overflow-visible">
            <CertificateLightField
              primaryColor={theme.primary}
              glowColor={theme.glow}
            />
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Subtle blurred ambient glow directly behind the certificate card */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-4 rounded-3xl"
            animate={{
              background: `radial-gradient(60% 60% at 50% 50%, ${theme.glow} 0%, transparent 100%)`,
            }}
            transition={{ duration: 0.6, ease }}
            style={{ filter: "blur(50px)" }}
          />

          <motion.div
            className="relative overflow-hidden transition-colors"
            animate={{
              borderColor: theme.border,
              backgroundColor: theme.bg,
            }}
            transition={{ duration: 0.5, ease }}
            style={{
              border: `1px solid ${theme.border}`,
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease }}
                className="grid gap-6 p-4 sm:p-6 md:grid-cols-[1fr_320px] md:items-center md:gap-10 md:p-10"
              >
                {/* Main certificate visual / award showcase */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsModalOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsModalOpen(true);
                    }
                  }}
                  title="Click to view certificate"
                  className="group relative flex h-[220px] sm:h-[320px] md:h-[400px] w-full cursor-pointer items-center justify-center overflow-hidden transition-colors focus:outline-none"
                  style={{
                    border: `1px solid ${theme.border}`,
                    background: "#0a0a0c",
                  }}
                >
                  {/* Digital Document Scanning Beam */}
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 h-[1.5px] z-10"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${theme.primary} 50%, transparent 100%)`,
                      boxShadow: `0 0 10px ${theme.primary}`,
                    }}
                    animate={{ top: ["4%", "96%", "4%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Digital Document Verification HUD */}
                  <div
                    className="absolute top-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase backdrop-blur-md select-none"
                    style={{
                      border: `1px solid ${theme.border}`,
                      background: "rgba(6,6,8,0.85)",
                      color: theme.primary,
                    }}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                        style={{ background: theme.primary }}
                      />
                      <span
                        className="relative inline-flex h-1.5 w-1.5 rounded-full"
                        style={{ background: theme.primary }}
                      />
                    </span>
                    <span>
                      {current.number === "01"
                        ? "AWARD // SHOWCASE · 01"
                        : `DOC // VERIFIED · ${current.number}`}
                    </span>
                  </div>

                  <div
                    className="hidden sm:flex absolute top-3 right-3 z-10 items-center px-2 py-0.5 text-[8px] font-mono tracking-widest text-white/40 backdrop-blur-md select-none"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(6,6,8,0.65)",
                    }}
                  >
                    {current.number === "01"
                      ? "BHARAT SCOUTS & GUIDES"
                      : "SHA-256 // VERIFIED"}
                  </div>

                  <img
                    src={current.imageUrl}
                    alt={current.title}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  <span
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] backdrop-blur-sm transition-all duration-300 group-hover:text-white"
                    style={{
                      border: `1px solid ${theme.border}`,
                      background: "rgba(6,6,8,0.85)",
                      color: theme.primary,
                    }}
                  >
                    VIEW CERTIFICATE
                    <ArrowUpRight size={11} />
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                      <span
                        className="text-xs uppercase tracking-[0.22em] transition-colors duration-500 font-medium"
                        style={{ color: theme.primary }}
                      >
                        Certificate {current.number}
                      </span>
                      {current.category && (
                        <>
                          <span className="text-white/20">/</span>
                          <span
                            className="text-[11px] uppercase tracking-[0.16em] font-mono transition-colors duration-500"
                            style={{ color: theme.primary }}
                          >
                            {current.category}
                          </span>
                        </>
                      )}
                    </div>

                    <h3
                      className="font-[family-name:var(--font-space-grotesk)] font-semibold tracking-[-0.03em]"
                      style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#f0f0f2" }}
                    >
                      {current.title}
                    </h3>

                    {current.organization && (
                      <p className="mt-1.5 text-sm font-medium" style={{ color: "rgba(240,240,242,0.78)" }}>
                        {current.organization}
                      </p>
                    )}

                    <p className="mt-2 text-xs font-mono uppercase tracking-wider" style={{ color: "rgba(240,240,242,0.45)" }}>
                      Issued &bull; {current.year}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="group/btn inline-flex items-center justify-center gap-2 border px-5 py-3 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto"
                    style={{
                      borderColor: theme.border,
                      color: "rgba(240,240,242,0.85)",
                      background: theme.bg,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = theme.primary;
                      el.style.color = "#fff";
                      el.style.background = `${theme.primary}22`;
                      el.style.boxShadow = `0 0 16px -2px ${theme.primary}40`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = theme.border;
                      el.style.color = "rgba(240,240,242,0.85)";
                      el.style.background = theme.bg;
                      el.style.boxShadow = "none";
                    }}
                  >
                    VIEW CERTIFICATE
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation & Controls OUTSIDE the showcase box */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {certifications.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                aria-label={`Certificate ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: i === currentIndex ? "24px" : "8px",
                  background:
                    i === currentIndex
                      ? theme.primary
                      : "rgba(255,255,255,0.20)",
                }}
              />
            ))}
          </div>

          {/* Certificate Navigation aligned to the bottom-right: 04 / 05   ←   → */}
          <div className="flex items-center gap-5 sm:ml-auto">
            <motion.span
              animate={{ color: theme.primary }}
              transition={{ duration: 0.5, ease }}
              className="font-[family-name:var(--font-bebas)] text-xl tracking-[0.1em]"
            >
              {String(currentIndex + 1).padStart(2, "0")} / {String(certifications.length).padStart(2, "0")}
            </motion.span>
            <div className="flex gap-2">
              {[prev, next].map((fn, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={fn}
                  aria-label={i === 0 ? "Previous certificate" : "Next certificate"}
                  className="flex h-11 w-11 items-center justify-center border transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: theme.border,
                    color: "rgba(240,240,242,0.60)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = theme.primary;
                    el.style.color = theme.primary;
                    el.style.background = `${theme.primary}18`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = theme.border;
                    el.style.color = "rgba(240,240,242,0.60)";
                    el.style.background = "transparent";
                  }}
                >
                  {i === 0 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Certificate Preview Modal / Lightbox ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
            style={{
              backgroundColor: "rgba(3, 3, 4, 0.90)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.28, ease }}
              className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border overflow-hidden shadow-2xl"
              style={{
                backgroundColor: "#060608",
                borderColor: `${theme.primary}45`,
                boxShadow: `0 24px 64px -12px rgba(0,0,0,0.92), 0 0 36px -6px ${theme.glow}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div
                className="flex items-center justify-between px-4 py-3.5 sm:px-7 sm:py-5 border-b shrink-0"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  background: "rgba(10,10,14,0.75)",
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                      style={{ color: theme.primary }}
                    >
                      {current.number} / {String(certifications.length).padStart(2, "0")}
                    </span>
                    <span className="text-white/20">::</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-white/45">
                      {current.category}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-base sm:text-xl font-semibold text-white tracking-tight">
                    {current.title}
                  </h3>
                  <p className="text-xs text-white/50">
                    {current.organization} &bull; {current.year}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer shrink-0 ml-3"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-3 sm:p-6 md:p-7 flex-1">
                {current.number === "01" ? (
                  /* ── Rajya Puraskar: Premium Collage (Desktop: Side-by-Side, Mobile: Stacked) ── */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
                    {/* Left: Actual Certificate Document */}
                    <div
                      className="relative flex flex-col rounded-xl overflow-hidden border p-2 sm:p-3"
                      style={{
                        borderColor: "rgba(255,255,255,0.08)",
                        background: "#08080a",
                      }}
                    >
                      <div className="flex items-center justify-between pb-2 px-1 text-[9px] font-mono tracking-widest text-white/45 uppercase">
                        <span>OFFICIAL CERTIFICATE</span>
                        <span style={{ color: theme.primary }}>DOC // VERIFIED</span>
                      </div>
                      <div className="relative w-full aspect-[3/4] max-h-[42vh] sm:max-h-[58vh] flex items-center justify-center overflow-hidden rounded-lg bg-black/40">
                        <img
                          src={current.certificateUrl}
                          alt="Rajya Puraskar Certificate Document"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Right: Scouts Award Ceremony Photo */}
                    <div
                      className="relative flex flex-col rounded-xl overflow-hidden border p-2 sm:p-3"
                      style={{
                        borderColor: "rgba(255,255,255,0.08)",
                        background: "#08080a",
                      }}
                    >
                      <div className="flex items-center justify-between pb-2 px-1 text-[9px] font-mono tracking-widest text-white/45 uppercase">
                        <span>AWARD CEREMONY ARCHIVE</span>
                        <span style={{ color: theme.primary }}>CEREMONY // PHOTO</span>
                      </div>
                      <div className="relative w-full aspect-[3/4] max-h-[42vh] sm:max-h-[58vh] flex items-center justify-center overflow-hidden rounded-lg bg-black/40">
                        <img
                          src={current.imageUrl}
                          alt="Rajya Puraskar Award Ceremony"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── Single Certificate Preview (Certificates 02-05) ── */
                  <div
                    className="relative w-full flex items-center justify-center rounded-xl overflow-hidden border p-3 sm:p-5 bg-black/50"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <img
                      src={current.certificateUrl}
                      alt={current.title}
                      className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
