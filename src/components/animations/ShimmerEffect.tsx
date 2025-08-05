"use client";

import { useEffect, useRef } from "react";

export function ShimmerEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make the canvas span the entire screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Create an array of shimmer lines
    const shimmerCount = 15; // Reduced number of lines
    const shimmerLines = Array.from({ length: shimmerCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angle: Math.random() * Math.PI * 2,
      length: 150 + Math.random() * 200, // Shorter lines
      speed: 0.3 + Math.random() * 0.8, // Slower movement
      width: 1.5 + Math.random() * 2.5, // Thinner lines
      opacity: 0.08 + Math.random() * 0.12, // Lower base opacity
    }));

    const animate = () => {
      // Clear with transparent background to create trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Check dark mode
      const isDarkMode =
        (window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches) ||
        document.documentElement.classList.contains("dark");

      // Use different blend modes for light/dark to enhance visibility
      ctx.globalCompositeOperation = isDarkMode ? "lighter" : "darken";

      shimmerLines.forEach((line) => {
        // Move the shimmer line
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        // If line goes off screen, reset it to a random position
        if (
          line.x < -line.length ||
          line.x > canvas.width + line.length ||
          line.y < -line.length ||
          line.y > canvas.height + line.length
        ) {
          line.x = Math.random() * canvas.width;
          line.y = Math.random() * canvas.height;
          line.angle = Math.random() * Math.PI * 2;
        }

        // Draw the shimmer line
        const gradient = ctx.createLinearGradient(
          line.x,
          line.y,
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );

        // Use different colors for dark/light mode
        if (isDarkMode) {
          gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
          gradient.addColorStop(0.5, `rgba(200, 225, 255, ${line.opacity})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        } else {
          // More subtle but contrasting color for light mode
          gradient.addColorStop(0, `rgba(17, 24, 39, 0)`);
          gradient.addColorStop(0.5, `rgba(17, 24, 39, ${line.opacity * 2})`); // Dark gray with 2x opacity
          gradient.addColorStop(1, `rgba(17, 24, 39, 0)`);
        }

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        ctx.lineWidth = line.width;
        ctx.strokeStyle = gradient;
        ctx.stroke();
      });

      // Always reset composite operation
      ctx.globalCompositeOperation = "source-over";

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
      className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-50"
      style={{ zIndex: 1 }}
    />
  );
}
