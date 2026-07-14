"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/constants/content";

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const COLORS = ["#89d6fb", "#02a9f7", "#02577a", "#d4f0fc"];
const REPEL_RADIUS = 110;
const RETURN_SPRING = 0.06;
const FRICTION = 0.86;

/**
 * Canvas particle system that assembles the site owner's initials from
 * sampled text pixels and scatters away from the cursor.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles: Particle[] = [];
    let rafId = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Sample "DB" text pixels from an offscreen canvas.
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;
      const fontSize = Math.min(width * 0.32, height * 0.72);
      offCtx.fillStyle = "#fff";
      offCtx.font = `${fontSize}px ${getComputedStyle(document.body).getPropertyValue("--font-zen-dots") || "sans-serif"}`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(SITE.initials, width / 2, height / 2);

      const data = offCtx.getImageData(0, 0, width, height).data;
      const gap = Math.max(4, Math.round(width / 220));
      particles = [];
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          if (data[(y * width + x) * 4 + 3] > 128) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              homeX: x,
              homeY: y,
              vx: 0,
              vy: 0,
              size: Math.random() * 1.6 + 0.8,
              color: COLORS[Math.floor(Math.random() * COLORS.length)],
            });
          }
        }
      }

      if (reduced) {
        // Static render, no animation loop.
        ctx.clearRect(0, 0, width, height);
        for (const p of particles) {
          ctx.fillStyle = p.color;
          ctx.fillRect(p.homeX, p.homeY, p.size, p.size);
        }
      }
    };

    const step = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_RADIUS && dist > 0.01) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          p.vx += (dx / dist) * force * 4;
          p.vy += (dy / dist) * force * 4;
        }
        p.vx += (p.homeX - p.x) * RETURN_SPRING;
        p.vy += (p.homeY - p.y) * RETURN_SPRING;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      rafId = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      rafId = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Wait for the display font so sampling picks up the right glyphs.
    document.fonts.ready.then(build);
    build();

    // Only animate while visible.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.1 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(build);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />;
}
