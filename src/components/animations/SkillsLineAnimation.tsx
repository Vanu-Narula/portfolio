"use client";

import { useEffect, useRef } from "react";

interface SkillWord {
  text: string;
  color: string;
}

export function SkillsLineAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const skills: SkillWord[] = [
    { text: "Python", color: "#4B5EFC" },
    { text: "AI", color: "#6366F1" },
    { text: "LangChain", color: "#14B8A6" },
    { text: "PostgreSQL", color: "#3B82F6" },
    { text: "Computer Vision", color: "#8B5CF6" },
    { text: "Leadership", color: "#F59E0B" },
    { text: "ML", color: "#10B981" },
    { text: "GenAI", color: "#6366F1" },
    { text: "RAG", color: "#8B5CF6" },
    { text: "Agents", color: "#14B8A6" },
    { text: "APIs", color: "#3B82F6" },
    { text: "React", color: "#0EA5E9" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make the canvas span the width of the screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 60; // Height for single line of text
    };

    // Calculate total width of all words with spacing
    const calculateTotalWidth = () => {
      ctx.font = "bold 14px system-ui, sans-serif";
      let totalWidth = 0;
      skills.forEach((skill) => {
        totalWidth += ctx.measureText(skill.text).width + 40; // Text width + spacing
      });
      return totalWidth;
    };

    const isDarkMode = () => {
      return (
        (window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches) ||
        document.documentElement.classList.contains("dark")
      );
    };

    let position = 0;
    const speed = 0.5;

    const animate = () => {
      const dark = isDarkMode();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold 14px system-ui, sans-serif";

      // Start drawing from current position
      let currentX = -position;
      const totalWidth = calculateTotalWidth();

      // Draw all skills once
      skills.forEach((skill) => {
        const textWidth = ctx.measureText(skill.text).width;

        // Only draw if it would be visible on screen
        if (currentX + textWidth >= 0 && currentX <= canvas.width) {
          // Draw subtle dot before text
          ctx.beginPath();
          ctx.arc(currentX - 8, canvas.height / 2, 3, 0, Math.PI * 2);
          ctx.fillStyle = dark ? `${skill.color}80` : skill.color;
          ctx.fill();

          // Draw text
          ctx.fillStyle = dark ? `${skill.color}CC` : `${skill.color}99`;
          ctx.fillText(skill.text, currentX, canvas.height / 2 + 5);
        }

        currentX += textWidth + 40; // Add spacing between words
      });

      // Repeat the skills if needed to fill the screen
      if (currentX < canvas.width) {
        skills.forEach((skill) => {
          const textWidth = ctx.measureText(skill.text).width;

          if (currentX + textWidth >= 0 && currentX <= canvas.width) {
            // Draw dot
            ctx.beginPath();
            ctx.arc(currentX - 8, canvas.height / 2, 3, 0, Math.PI * 2);
            ctx.fillStyle = dark ? `${skill.color}80` : skill.color;
            ctx.fill();

            // Draw text
            ctx.fillStyle = dark ? `${skill.color}CC` : `${skill.color}99`;
            ctx.fillText(skill.text, currentX, canvas.height / 2 + 5);
          }

          currentX += textWidth + 40;
        });
      }

      // Update position for next frame
      position += speed;
      if (position > totalWidth) {
        position = 0;
      }

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
      className="absolute bottom-8 left-0 right-0 pointer-events-none opacity-40 dark:opacity-60"
      style={{ zIndex: 2 }}
    />
  );
}
