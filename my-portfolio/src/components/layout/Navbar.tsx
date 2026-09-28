"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ── Constants ──────────────────────────────────────── */
const ease = [0.215, 0.61, 0.355, 1] as const;

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isTalkHovered, setIsTalkHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  /* ── Mouse position for glass light reflection ──────── */
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  /* ── Active section detection & scroll reaction ──────── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 24);

      // Bottom of page -> contact active
      const isBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 120;
      if (isBottom) {
        setActiveSection("contact");
        return;
      }

      // Hero / top region
      if (scrollY < 220) {
        setActiveSection(null);
        return;
      }

      // Detect current section via viewport positioning
      const viewportMid = window.innerHeight * 0.42;
      let matchedSection: string | null = null;

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportMid && rect.bottom >= window.innerHeight * 0.12) {
            matchedSection = item.id;
          }
        }
      }

      if (matchedSection) {
        setActiveSection(matchedSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Close mobile menu on Escape key ────────────────── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  /* ── Smooth scroll navigation ───────────────────────── */
  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection(null);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 84;
      const targetY = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 md:px-8 pt-3.5 md:pt-5 pointer-events-none"
    >
      <div className="relative w-full max-w-[1240px] pointer-events-auto">
        {/* Floating Glass Pill */}
        <motion.div
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsNavHovered(true)}
          onMouseLeave={() => {
            setIsNavHovered(false);
            mouseX.set(-200);
            mouseY.set(-200);
          }}
          animate={{
            backgroundColor: isScrolled
              ? "rgba(6, 6, 8, 0.82)"
              : "rgba(6, 6, 8, 0.52)",
            borderColor: isScrolled
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(255, 255, 255, 0.06)",
            boxShadow: isScrolled
              ? "0 16px 36px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.08)"
              : "0 8px 24px -8px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.03)",
          }}
          transition={{ duration: 0.35, ease }}
          className="relative flex h-[58px] md:h-[62px] w-full items-center justify-between rounded-full border px-5 md:px-8 backdrop-blur-xl overflow-hidden transition-all"
        >
          {/* Subtle Glass Light Refraction following mouse */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: isNavHovered ? 1 : 0,
              background: useMotionTemplate`radial-gradient(150px circle at ${springX}px ${springY}px, rgba(59, 130, 246, 0.09), rgba(147, 51, 234, 0.03), transparent 75%)`,
            }}
          />

          {/* ── LEFT: Logo ─────────────────────────────── */}
          <div className="flex items-center z-10">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("top");
              }}
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
              className="group relative flex items-center py-1 font-[family-name:var(--font-bebas)] text-2xl tracking-[0.08em] text-white focus:outline-none select-none"
              aria-label="S. Sibiraj - Home"
            >
              <div className="relative flex items-center">
                <motion.span
                  animate={{
                    x: isLogoHovered ? -2.5 : 0,
                    color: isLogoHovered ? "#93c5fd" : "#ffffff",
                  }}
                  transition={{ duration: 0.25, ease }}
                >
                  S
                </motion.span>
                <motion.span
                  animate={{
                    x: isLogoHovered ? 2.5 : 0,
                    color: isLogoHovered ? "#60a5fa" : "#ffffff",
                  }}
                  transition={{ duration: 0.25, ease }}
                >
                  R
                </motion.span>
              </div>

              {/* Distinctive subtle underline glow */}
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: isLogoHovered ? 1 : 0,
                  opacity: isLogoHovered ? 1 : 0,
                }}
                transition={{ duration: 0.24, ease }}
                className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-[1.5px] origin-center rounded-full"
                style={{
                  background: "linear-gradient(90deg, var(--blue), var(--cyan))",
                  boxShadow:
                    "0 0 8px rgba(37,99,235,0.7), 0 0 14px rgba(6,182,212,0.4)",
                }}
              />
            </a>
          </div>

          {/* ── CENTER: Desktop Navigation ────────────── */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center justify-center gap-7 lg:gap-9 text-[11px] uppercase tracking-[0.2em] font-medium md:flex z-10"
          >
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id;
              const isHovered = hoveredNav === id;

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(id);
                  }}
                  onMouseEnter={() => setHoveredNav(id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="relative py-2 select-none focus:outline-none transition-colors duration-200"
                  style={{
                    color: isActive
                      ? "#ffffff"
                      : isHovered
                        ? "rgba(255, 255, 255, 0.95)"
                        : "rgba(240, 240, 242, 0.45)",
                  }}
                >
                  <motion.span
                    className="inline-block"
                    animate={{
                      y: isHovered ? -1.5 : 0,
                      letterSpacing: isHovered ? "0.24em" : "0.2em",
                    }}
                    transition={{ duration: 0.2, ease }}
                  >
                    {label}
                  </motion.span>

                  {/* Active Section Indicator using layoutId */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-indicator"
                      className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)",
                        boxShadow:
                          "0 0 8px rgba(37, 99, 235, 0.8), 0 0 16px rgba(56, 189, 248, 0.4)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── RIGHT: LET'S TALK Button & Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 z-10">
            {/* LET'S TALK Button — compact on mobile, expanded on sm+ */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
              onMouseEnter={() => setIsTalkHovered(true)}
              onMouseLeave={() => setIsTalkHovered(false)}
              className="relative inline-flex items-center overflow-hidden rounded-full border px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] transition-colors duration-300 focus:outline-none shrink-0"
              style={{
                borderColor: isTalkHovered
                  ? "rgba(37, 99, 235, 0.85)"
                  : "rgba(37, 99, 235, 0.45)",
                backgroundColor: isTalkHovered
                  ? "rgba(37, 99, 235, 0.08)"
                  : "transparent",
                boxShadow: isTalkHovered
                  ? "0 0 16px -2px rgba(37, 99, 235, 0.45), inset 0 0 12px -2px rgba(37, 99, 235, 0.15)"
                  : "none",
              }}
            >
              <motion.span
                animate={{
                  x: isTalkHovered ? -3 : 0,
                  color: isTalkHovered ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
                }}
                transition={{ duration: 0.22, ease }}
                className="whitespace-nowrap font-medium"
              >
                LET&apos;S TALK
              </motion.span>
              <motion.span
                initial={{ width: 0, opacity: 0, x: -4 }}
                animate={{
                  width: isTalkHovered ? "auto" : 0,
                  opacity: isTalkHovered ? 1 : 0,
                  x: isTalkHovered ? 0 : -4,
                  marginLeft: isTalkHovered ? 6 : 0,
                }}
                transition={{ duration: 0.22, ease }}
                className="hidden sm:flex items-center overflow-hidden text-blue-400"
              >
                <ArrowRight size={12} strokeWidth={2.5} />
              </motion.span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-colors hover:border-white/20 hover:text-white md:hidden focus:outline-none cursor-pointer"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              <div className="relative flex h-3.5 w-4 flex-col justify-between">
                <motion.span
                  animate={{
                    rotate: mobileOpen ? 45 : 0,
                    y: mobileOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.22, ease }}
                  className="h-[1.5px] w-full rounded-full bg-current origin-center"
                />
                <motion.span
                  animate={{
                    opacity: mobileOpen ? 0 : 1,
                    scaleX: mobileOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.18, ease }}
                  className="h-[1.5px] w-full rounded-full bg-current"
                />
                <motion.span
                  animate={{
                    rotate: mobileOpen ? -45 : 0,
                    y: mobileOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.22, ease }}
                  className="h-[1.5px] w-full rounded-full bg-current origin-center"
                />
              </div>
            </button>
          </div>
        </motion.div>

        {/* ── Mobile Backdrop to close menu on tap outside ─── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden pointer-events-auto"
            />
          )}
        </AnimatePresence>

        {/* ── Mobile Floating Glass Dropdown ─────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease }}
              className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#08080c]/98 p-5 shadow-2xl backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map(({ id, label }, index) => {
                  const isActive = activeSection === id;
                  return (
                    <motion.a
                      key={id}
                      href={`#${id}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.2 }}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(id);
                      }}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(37, 99, 235, 0.12)"
                          : "rgba(255, 255, 255, 0.02)",
                        color: isActive ? "#ffffff" : "rgba(240, 240, 242, 0.6)",
                        border: isActive
                          ? "1px solid rgba(37, 99, 235, 0.35)"
                          : "1px solid rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      <span>{label}</span>
                      {isActive && (
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: "var(--blue)",
                            boxShadow: "0 0 6px var(--blue)",
                          }}
                        />
                      )}
                    </motion.a>
                  );
                })}

                <div className="mt-2 pt-2 border-t border-white/[0.08]">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("contact");
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-blue-600/10 py-3 text-xs uppercase tracking-[0.18em] text-white font-medium shadow-[0_0_15px_-3px_rgba(37,99,235,0.3)] transition-colors hover:bg-blue-600/20"
                  >
                    <span>LET&apos;S TALK</span>
                    <ArrowRight size={13} strokeWidth={2.5} className="text-blue-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
