"use client";

import { useEffect, useRef } from "react";

export function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const gradient1 = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.max(canvas.width, canvas.height) * 0.3,
      vx: 0.2,
      vy: 0.1,
    };

    const gradient2 = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.max(canvas.width, canvas.height) * 0.3,
      vx: -0.1,
      vy: 0.2,
    };

    const animate = () => {
      // Clear canvas with a very subtle background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Check if dark mode is enabled
      const isDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isSystemDarkMode =
        document.documentElement.classList.contains("dark");

      // Update positions
      gradient1.x += gradient1.vx;
      gradient1.y += gradient1.vy;
      gradient2.x += gradient2.vx;
      gradient2.y += gradient2.vy;

      // Bounce off edges
      if (gradient1.x < 0 || gradient1.x > canvas.width) gradient1.vx *= -1;
      if (gradient1.y < 0 || gradient1.y > canvas.height) gradient1.vy *= -1;
      if (gradient2.x < 0 || gradient2.x > canvas.width) gradient2.vx *= -1;
      if (gradient2.y < 0 || gradient2.y > canvas.height) gradient2.vy *= -1;

      // Create gradients based on theme
      const gradient1Colors =
        isDarkMode || isSystemDarkMode
          ? ["rgba(79, 70, 229, 0.08)", "rgba(79, 70, 229, 0)"] // Indigo for dark mode
          : ["rgba(79, 70, 229, 0.05)", "rgba(79, 70, 229, 0)"]; // Indigo for light mode

      const gradient2Colors =
        isDarkMode || isSystemDarkMode
          ? ["rgba(20, 184, 166, 0.08)", "rgba(20, 184, 166, 0)"] // Teal for dark mode
          : ["rgba(20, 184, 166, 0.05)", "rgba(20, 184, 166, 0)"]; // Teal for light mode

      // Draw first gradient
      const g1 = ctx.createRadialGradient(
        gradient1.x,
        gradient1.y,
        0,
        gradient1.x,
        gradient1.y,
        gradient1.radius
      );
      g1.addColorStop(0, gradient1Colors[0]);
      g1.addColorStop(1, gradient1Colors[1]);

      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw second gradient
      const g2 = ctx.createRadialGradient(
        gradient2.x,
        gradient2.y,
        0,
        gradient2.x,
        gradient2.y,
        gradient2.radius
      );
      g2.addColorStop(0, gradient2Colors[0]);
      g2.addColorStop(1, gradient2Colors[1]);

      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
