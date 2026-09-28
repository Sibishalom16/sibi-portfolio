"use client";

import { motion } from "framer-motion";
import KineticDigitalFabric from "@/components/ui/KineticDigitalFabric";

export default function HeroBackground() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      style={{ backgroundColor: "#030304" }}
    >
      {/* ── Soft Ambient Lighting Fields (Ultra-blurred deep glows) ── */}
      {/* Electric Blue / Indigo glow — upper-right area */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 680,
          height: 680,
          top: "-10%",
          right: "-8%",
          background:
            "radial-gradient(circle, rgba(47, 99, 232, 0.075) 0%, rgba(124, 58, 237, 0.045) 45%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />

      {/* Subtle Cyan / Blue glow — middle-right area */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 520,
          height: 520,
          top: "35%",
          right: "-4%",
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, rgba(37, 99, 235, 0.035) 45%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Warm Orange / Red subtle ember glow — lower-left corner */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          bottom: "-6%",
          left: "-6%",
          background:
            "radial-gradient(circle, rgba(255, 149, 0, 0.045) 0%, rgba(255, 73, 63, 0.03) 45%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* ── Kinetic Digital Fabric (Generative living 3D digital surface) ── */}
      <KineticDigitalFabric />

      {/* Subtle radial vignette to soften extreme outer edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 55%, #030304 100%)",
        }}
      />
    </motion.div>
  );
}
