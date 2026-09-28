"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import CursorFollower from "@/components/CursorFollower";
import ContinuousRgbParticleField from "@/components/visuals/ContinuousRgbParticleField";

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#030304", color: "var(--fg)" }}
    >
      <CursorFollower />

      {/* ── FLOATING NAVBAR ─────────────────────────────── */}
      <Navbar />

      {/* ── HERO SECTION ────────────────────────────────── */}
      <Hero />

      {/* ── SINGLE UNIFIED RGB AMBIENT ATMOSPHERE (About → Footer) ── */}
      <div className="relative">
        <ContinuousRgbParticleField />
        <div className="relative z-[1]">
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Education />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}