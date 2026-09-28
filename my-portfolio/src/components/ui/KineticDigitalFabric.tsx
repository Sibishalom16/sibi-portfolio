"use client";

import { useEffect, useRef } from "react";

interface Node3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

interface Particle {
  ribbonIndex: number;
  pointIndex: number;
  t: number;
  speed: number;
  size: number;
  accent: "coral" | "blue" | "orange" | "neutral";
  alpha: number;
  pulsePhase: number;
}

interface WakePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  time: number;
  intensity: number;
}

interface PulseWave {
  active: boolean;
  startTime: number;
  duration: number;
}

export default function KineticDigitalFabric() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Cursor state with smooth wake-up / calm-down interpolation
    const mouse = {
      x: -2000,
      y: -2000,
      prevX: -2000,
      prevY: -2000,
      vx: 0,
      vy: 0,
      active: false,
      targetActive: 0,
      currentActive: 0,
    };

    // Wake trail memory (remembers cursor disturbance for ~0.8s)
    const wakeHistory: WakePoint[] = [];

    // Periodic organic data pulse (Coral -> Blue -> Orange wave)
    const pulse: PulseWave = {
      active: false,
      startTime: 0,
      duration: 3800,
    };
    let nextPulseTime = performance.now() + 6500;

    // Fabric mesh configuration
    let numRibbons = 24;
    let pointsPerRibbon = 32;
    let grid: Node3D[][] = [];
    let particles: Particle[] = [];

    const initFabricMesh = () => {
      grid = [];
      particles = [];

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      numRibbons = isMobile ? 12 : isTablet ? 18 : 26;
      pointsPerRibbon = isMobile ? 18 : isTablet ? 26 : 34;

      // Span primarily across the right 50% on desktop, extending softly behind typography
      const startXRatio = isMobile ? 0.15 : 0.35;
      const endXRatio = 1.08;
      const startYRatio = -0.08;
      const endYRatio = 1.08;

      const spanX = (endXRatio - startXRatio) * width;
      const spanY = (endYRatio - startYRatio) * height;

      for (let r = 0; r < numRibbons; r++) {
        const ribbon: Node3D[] = [];
        const vRatio = r / (numRibbons - 1);
        const baseY = startYRatio * height + vRatio * spanY;

        for (let p = 0; p < pointsPerRibbon; p++) {
          const uRatio = p / (pointsPerRibbon - 1);
          // Apply gentle isometric shear to form a floating 3D digital architectural plane
          const baseX =
            startXRatio * width +
            uRatio * spanX +
            (vRatio - 0.5) * width * 0.14;

          // Depth distribution
          const baseZ = (uRatio * 0.55 + (1 - vRatio) * 0.45) * 140;

          ribbon.push({
            baseX,
            baseY,
            baseZ,
            x: baseX,
            y: baseY,
            z: baseZ,
            vx: 0,
            vy: 0,
            vz: 0,
          });
        }
        grid.push(ribbon);
      }

      // Populate floating data particles
      const particleCount = isMobile ? 24 : isTablet ? 45 : 75;
      const accents: Particle["accent"][] = [
        "coral",
        "blue",
        "orange",
        "neutral",
      ];

      for (let i = 0; i < particleCount; i++) {
        const ribbonIndex = Math.floor(Math.random() * numRibbons);
        const pointIndex = Math.floor(
          Math.random() * (pointsPerRibbon - 1)
        );
        particles.push({
          ribbonIndex,
          pointIndex,
          t: Math.random(),
          speed: 0.003 + Math.random() * 0.006,
          size: 1.2 + Math.random() * 2.2,
          accent: accents[Math.floor(Math.random() * accents.length)],
          alpha: 0.25 + Math.random() * 0.65,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initFabricMesh();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse movement & wake trail tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (
        currentX >= -120 &&
        currentX <= width + 120 &&
        currentY >= -120 &&
        currentY <= height + 120
      ) {
        if (!mouse.active) {
          mouse.prevX = currentX;
          mouse.prevY = currentY;
        }

        const now = performance.now();
        const vx = currentX - mouse.prevX;
        const vy = currentY - mouse.prevY;
        const speed = Math.sqrt(vx * vx + vy * vy);

        mouse.x = currentX;
        mouse.y = currentY;
        mouse.vx = vx;
        mouse.vy = vy;
        mouse.active = true;
        mouse.targetActive = 1;

        // Register wake disturbance if cursor is moving with velocity
        if (speed > 1.5) {
          wakeHistory.push({
            x: currentX,
            y: currentY,
            vx,
            vy,
            time: now,
            intensity: Math.min(speed / 12, 1),
          });
        }

        mouse.prevX = currentX;
        mouse.prevY = currentY;
      } else {
        mouse.targetActive = 0;
      }
    };

    const handleMouseLeave = () => {
      mouse.targetActive = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Pause rendering when Hero is out of view (saves CPU & battery)
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Main animation render loop
    let lastTime = performance.now();

    const render = (now: number) => {
      animationId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth wake-up & calm-down interpolation
      mouse.currentActive += (mouse.targetActive - mouse.currentActive) * 0.05;
      if (mouse.currentActive < 0.001 && mouse.targetActive === 0) {
        mouse.active = false;
      }

      // Purge old wake points (> 800ms)
      const wakeMaxAge = 800;
      while (
        wakeHistory.length > 0 &&
        now - wakeHistory[0].time > wakeMaxAge
      ) {
        wakeHistory.shift();
      }

      // Trigger periodic data pulse (every 8 to 15s)
      if (!pulse.active && now > nextPulseTime && !prefersReducedMotion) {
        pulse.active = true;
        pulse.startTime = now;
        pulse.duration = 4200;
        nextPulseTime = now + 8500 + Math.random() * 6500;
      }

      let pulseProgress = 0;
      let pulseCurrentX = -500;
      if (pulse.active) {
        pulseProgress = (now - pulse.startTime) / pulse.duration;
        if (pulseProgress >= 1) {
          pulse.active = false;
        } else {
          pulseCurrentX = width * 0.28 + pulseProgress * width * 0.85;
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Simulation physics & procedural deformation
      const time = now * 0.00065;
      const motionScale = prefersReducedMotion ? 0.15 : 1;

      for (let r = 0; r < numRibbons; r++) {
        const ribbon = grid[r];
        const vRatio = r / (numRibbons - 1);

        for (let p = 0; p < pointsPerRibbon; p++) {
          const pt = ribbon[p];
          const uRatio = p / (pointsPerRibbon - 1);

          // Harmonic procedural waves (organic fluid movement)
          const wave1 =
            Math.sin(uRatio * 4.2 + time * 1.8 + vRatio * 2.5) * 22;
          const wave2 =
            Math.cos(uRatio * 2.8 - time * 1.2 + vRatio * 3.8) * 16;
          const wave3 =
            Math.sin(uRatio * 7.5 + vRatio * 6.0 + time * 2.4) * 8;

          const targetZ = pt.baseZ + (wave1 + wave2 + wave3) * motionScale;
          const targetY =
            pt.baseY +
            (wave2 * 0.8 + Math.sin(time + uRatio * 3) * 12) * motionScale;

          // Magnetic mouse force
          let forceX = 0;
          let forceY = 0;
          let forceZ = 0;

          if (mouse.active && !prefersReducedMotion) {
            const dx = pt.x - mouse.x;
            const dy = pt.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 250;

            if (dist < radius) {
              const proximity = Math.pow(1 - dist / radius, 2);
              // Fluid magnetic push-pull
              const pushStrength = 36 * mouse.currentActive;
              forceX += (dx / (dist + 0.1)) * pushStrength * proximity;
              forceY += (dy / (dist + 0.1)) * pushStrength * proximity;
              forceZ += pushStrength * 2.2 * proximity;
            }
          }

          // Wake disturbance interaction
          if (wakeHistory.length > 0 && !prefersReducedMotion) {
            for (let i = 0; i < wakeHistory.length; i += 2) {
              const wp = wakeHistory[i];
              const age = now - wp.time;
              const decay = 1 - age / wakeMaxAge;
              if (decay <= 0) continue;

              const wdx = pt.x - wp.x;
              const wdy = pt.y - wp.y;
              const wdist = Math.sqrt(wdx * wdx + wdy * wdy);
              const wakeRadius = 160;

              if (wdist < wakeRadius) {
                const wFactor =
                  Math.pow(1 - wdist / wakeRadius, 2) *
                  decay *
                  wp.intensity *
                  0.35;
                forceX += wp.vx * wFactor * 1.4;
                forceY += wp.vy * wFactor * 1.4;
                forceZ += (Math.abs(wp.vx) + Math.abs(wp.vy)) * wFactor * 2.5;
              }
            }
          }

          // Spring damping update
          const ax = (pt.baseX + forceX - pt.x) * 0.14;
          const ay = (targetY + forceY - pt.y) * 0.14;
          const az = (targetZ + forceZ - pt.z) * 0.14;

          pt.vx = (pt.vx + ax) * 0.82;
          pt.vy = (pt.vy + ay) * 0.82;
          pt.vz = (pt.vz + az) * 0.82;

          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.z += pt.vz;
        }
      }

      // Render woven curves / ribbons
      for (let r = 0; r < numRibbons; r++) {
        const ribbon = grid[r];
        const vRatio = r / (numRibbons - 1);

        // Depth & opacity calculations
        const avgZ = ribbon[Math.floor(pointsPerRibbon / 2)].z;
        const depthAlpha = Math.min(
          Math.max(0.12, (avgZ + 40) / 180),
          0.75
        );

        ctx.beginPath();
        ctx.moveTo(ribbon[0].x, ribbon[0].y);

        for (let p = 1; p < pointsPerRibbon - 1; p++) {
          const xc = (ribbon[p].x + ribbon[p + 1].x) * 0.5;
          const yc = (ribbon[p].y + ribbon[p + 1].y) * 0.5;
          ctx.quadraticCurveTo(ribbon[p].x, ribbon[p].y, xc, yc);
        }
        ctx.lineTo(
          ribbon[pointsPerRibbon - 1].x,
          ribbon[pointsPerRibbon - 1].y
        );

        // Determine if pulse is passing through this ribbon
        const centerPt = ribbon[Math.floor(pointsPerRibbon / 2)];
        const distToPulse = Math.abs(centerPt.x - pulseCurrentX);
        const pulseWidth = 260;
        let pulseGlow = 0;
        let pulseColor = "rgba(255,255,255,0.06)";

        if (pulse.active && distToPulse < pulseWidth) {
          pulseGlow = Math.pow(1 - distToPulse / pulseWidth, 2);
          // Color sequence: Coral/Red (#ff493f) -> Electric Blue (#2f63e8) -> Warm Orange (#ff9d08)
          if (pulseProgress < 0.35) {
            pulseColor = `rgba(255, 73, 63, ${0.48 * pulseGlow})`;
          } else if (pulseProgress < 0.7) {
            pulseColor = `rgba(47, 99, 232, ${0.52 * pulseGlow})`;
          } else {
            pulseColor = `rgba(255, 157, 8, ${0.48 * pulseGlow})`;
          }
        }

        // Base ribbon styling
        ctx.lineWidth = pulseGlow > 0 ? 1.35 : 0.85;

        // Subtle gradient stroke for the line
        const grad = ctx.createLinearGradient(
          ribbon[0].x,
          ribbon[0].y,
          ribbon[pointsPerRibbon - 1].x,
          ribbon[pointsPerRibbon - 1].y
        );

        const baseAlpha = 0.05 + depthAlpha * 0.14;
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(
          0.3,
          pulseGlow > 0
            ? pulseColor
            : `rgba(240, 240, 242, ${baseAlpha * 0.5})`
        );
        grad.addColorStop(
          0.7,
          pulseGlow > 0
            ? pulseColor
            : r % 3 === 0
            ? `rgba(47, 99, 232, ${baseAlpha * 1.15})`
            : r % 4 === 0
            ? `rgba(124, 58, 237, ${baseAlpha * 1.15})`
            : `rgba(240, 240, 242, ${baseAlpha})`
        );
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = grad;
        ctx.stroke();

        // Subtle cross-connections (transverse threads)
        if (r < numRibbons - 1) {
          const nextRibbon = grid[r + 1];
          ctx.beginPath();
          const step = r % 2 === 0 ? 3 : 4;
          for (let p = 2; p < pointsPerRibbon - 2; p += step) {
            ctx.moveTo(ribbon[p].x, ribbon[p].y);
            ctx.lineTo(nextRibbon[p].x, nextRibbon[p].y);
          }
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = `rgba(255, 255, 255, ${baseAlpha * 0.35})`;
          ctx.stroke();
        }
      }

      // Render floating data particles
      const colorMap = {
        coral: "rgba(255, 73, 63,",
        blue: "rgba(47, 99, 232,",
        orange: "rgba(255, 157, 8,",
        neutral: "rgba(240, 240, 242,",
      };

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.t += p.speed;
        if (p.t >= 1) {
          p.t = 0;
          p.pointIndex = (p.pointIndex + 1) % (pointsPerRibbon - 1);
        }

        const ribbon = grid[p.ribbonIndex];
        const p1 = ribbon[p.pointIndex];
        const p2 = ribbon[p.pointIndex + 1];

        if (!p1 || !p2) continue;

        const px = p1.x + (p2.x - p1.x) * p.t;
        const py = p1.y + (p2.y - p1.y) * p.t;
        const pz = p1.z + (p2.z - p1.z) * p.t;

        // Subtle breathing pulse
        const breath = Math.sin(now * 0.003 + p.pulsePhase) * 0.3 + 0.7;
        const depthFactor = Math.max(0.3, Math.min(1.2, (pz + 50) / 140));
        const finalAlpha = p.alpha * breath * depthFactor;
        const colorPrefix = colorMap[p.accent];

        // Particle core
        ctx.beginPath();
        ctx.arc(px, py, p.size * depthFactor * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `${colorPrefix} ${finalAlpha})`;
        ctx.fill();

        // Subtle soft glow halo on accented particles
        if (p.accent !== "neutral" && finalAlpha > 0.4) {
          ctx.beginPath();
          ctx.arc(px, py, p.size * depthFactor * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `${colorPrefix} ${finalAlpha * 0.18})`;
          ctx.fill();
        }
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
      style={{
        // Radial mask so the fabric organically dissolves toward typography on the left and edges
        maskImage:
          "radial-gradient(ellipse 75% 70% at 75% 50%, black 28%, rgba(0,0,0,0.65) 65%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 70% at 75% 50%, black 28%, rgba(0,0,0,0.65) 65%, transparent 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          opacity: 0.95,
        }}
      />
    </div>
  );
}
