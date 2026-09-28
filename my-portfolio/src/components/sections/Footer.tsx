"use client";

import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedinIn, FaFigma } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { portfolioData } from "@/data/portfolioData";

const ease = [0.215, 0.61, 0.355, 1] as const;

const DOCK_COLORS: Record<string, string> = {
  GitHub: "#f0f0f2",
  LinkedIn: "#2563eb",
  Figma: "#ff4433",
  Instagram: "#ec4899",
  LeetCode: "#ffa116",
};

function TypewriterText({
  text,
  className,
  style,
  delay = 0,
  charDelay = 0.025,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  charDelay?: number;
}) {
  const characters = Array.from(text);

  return (
    <motion.span
      className={className}
      style={style}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: charDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, filter: "blur(2px)", y: 2 },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 0.12, ease },
            },
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Footer() {
  const { personal, socialLinks } = portfolioData;

  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 84;
      const y = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Footer ─────────────────────────────────────── */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden px-4 pt-14 pb-36 sm:px-6 md:px-12 md:pt-20 md:pb-40 lg:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Subtle animated gradient glow along top border */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/4 right-1/4 h-[1.5px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(37,99,235,0.45), rgba(124,58,237,0.45), rgba(6,182,212,0.45), transparent)",
            filter: "blur(2px)",
          }}
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ambient background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[280px] w-[280px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.04) 0%, rgba(124,58,237,0.02) 45%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 bottom-16 h-[260px] w-[260px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.035) 0%, rgba(236,72,153,0.02) 45%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px]">
          {/* Main 2-column editorial layout */}
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
            {/* ── Left: Identity & Location ─────────────── */}
            <div className="flex flex-col">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("top");
                }}
                className="font-[family-name:var(--font-bebas)] text-3xl tracking-[0.08em] text-white transition-opacity hover:opacity-75 inline-block"
              >
                <TypewriterText
                  text="S.SIBIRAJ"
                  delay={0.1}
                  charDelay={0.035}
                />
              </a>
              <p
                className="mt-2 text-sm font-medium tracking-wide transition-all duration-300 inline-block"
                style={{ color: "#a855f7" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.textShadow =
                    "0 0 12px rgba(168, 85, 247, 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.textShadow = "none";
                }}
              >
                <TypewriterText
                  text="AI Full Stack Developer"
                  delay={0.35}
                  charDelay={0.02}
                />
              </p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.65, ease },
                  },
                }}
                className="mt-1.5 text-xs"
                style={{ color: "rgba(240,240,242,0.40)" }}
              >
                {personal.location}
              </motion.p>
            </div>

            {/* ── Right: Availability ───────────────────── */}
            <div className="flex flex-col md:items-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-medium">
                  <TypewriterText
                    text="AVAILABLE FOR"
                    delay={0.2}
                    charDelay={0.025}
                  />
                </p>
              </div>
              <p className="text-xs text-white/65 leading-relaxed md:text-right max-w-[320px]">
                <TypewriterText
                  text="Internships · Freelance · Full-Time Opportunities"
                  delay={0.45}
                  charDelay={0.016}
                />
              </p>
            </div>
          </div>

          {/* ── Bottom row divider & info ─────────────── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.8, ease },
              },
            }}
            className="mt-14 pt-8 border-t border-white/[0.07] flex flex-col items-center justify-between gap-4 text-xs text-white/40 md:flex-row"
          >
            <p className="tracking-wide">
              &copy; 2026 S.Sibiraj
            </p>
            <p className="tracking-wide text-white/30 hidden sm:block">
              AI Full Stack Developer
            </p>
            <button
              type="button"
              onClick={() => scrollTo("top")}
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-white cursor-pointer select-none"
            >
              <span>Back to top</span>
              <motion.span
                className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5"
              >
                &uarr;
              </motion.span>
            </button>
          </motion.div>
        </div>
      </motion.footer>

      {/* ── Fixed glass social dock ────────────────────── */}
      <motion.aside
        aria-label="Social links dock"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8, ease }}
        style={{
          position: "fixed",
          left: "50%",
          bottom: 20,
          x: "-50%",
          zIndex: 50,
          pointerEvents: "auto" as const,
        }}
      >
        {/* Outer pill wrapper hosting the traveling neon border */}
        <div
          className="relative rounded-[23px] p-[1.2px] overflow-hidden"
          style={{
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.55), 0 0 20px -4px rgba(37,99,235,0.18)",
          }}
        >
          {/* Subtle static semi-transparent glass border */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[23px] border border-white/[0.10] z-20"
          />

          {/* Traveling neon light running around outer perimeter */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-[150%] origin-center z-10"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg 250deg, rgba(124,58,237,0.4) 280deg, rgba(37,99,235,0.8) 315deg, rgba(6,182,212,0.9) 345deg, transparent 360deg)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Soft neon side glow aura around outer edge */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-[150%] origin-center opacity-50 blur-[5px] z-10"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg 250deg, rgba(124,58,237,0.35) 280deg, rgba(37,99,235,0.7) 315deg, rgba(6,182,212,0.8) 345deg, transparent 360deg)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Center dark glass container */}
          <div
            className="relative z-20 flex items-center gap-1 sm:gap-1.5 rounded-[22px] p-1 sm:p-1.5 backdrop-blur-[18px]"
            style={{
              background: "rgba(6,6,8,0.78)",
            }}
          >
            {socialLinks.map((social, i) => {
              const Icon =
                social.icon === "github" ? FaGithub :
                  social.icon === "linkedin" ? FaLinkedinIn :
                    social.icon === "figma" ? FaFigma :
                      social.icon === "instagram" ? FaInstagram :
                        social.icon === "leetcode" ? SiLeetcode : null;

              if (!Icon) return null;

              const hoverColor = DOCK_COLORS[social.name] ?? "#fff";

              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 2.0 + i * 0.08, ease }}
                  whileHover={{
                    y: -2,
                    color: hoverColor,
                    borderColor: `${hoverColor}66`,
                    backgroundColor: `${hoverColor}12`,
                    boxShadow: `0 0 14px ${hoverColor}25`,
                    transition: { duration: 0.2, ease },
                  }}
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] text-base sm:h-[48px] sm:w-[48px] sm:rounded-[16px] sm:text-lg md:h-[52px] md:w-[52px]"
                  style={{
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.02)",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  <Icon size={18} className="sm:hidden" />
                  <Icon size={20} className="hidden sm:block" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
