import React, { useEffect, useRef } from "react";

interface Firefly {
  x: number;
  y: number;
  z: number; // 3D depth level from 0.3 to 2.5
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
}

export default function FirefliesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Firefly colors: bioluminescent fern green, warm gold, and rare blood firefly glow
    const colors = [
      "rgba(143, 227, 138, ", // Fern Green
      "rgba(180, 240, 160, ", // Soft Lime Glow
      "rgba(232, 178, 77, ",  // Warm Gold
      "rgba(224, 90, 58, ",   // Rare Amber/Orange
    ];

    const fireflyCount = Math.min(Math.floor((width * height) / 22000), 60);
    const fireflies: Firefly[] = [];

    for (let i = 0; i < fireflyCount; i++) {
      const z = 0.3 + Math.random() * 2.2; // 3D depth layer
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: z,
        radius: (1.2 + Math.random() * 2.2) * z,
        baseAlpha: 0.2 + Math.random() * 0.7,
        alpha: 0.2,
        pulseSpeed: 0.015 + Math.random() * 0.035,
        pulsePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.4 * z,
        vy: (Math.random() - 0.5) * 0.4 * z - 0.15 * z, // Slightly floating upward
        vz: (Math.random() - 0.5) * 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Mouse interactive movement
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Sort by Z depth so background fireflies draw behind foreground fireflies
      fireflies.sort((a, b) => a.z - b.z);

      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];

        // 3D position updates with organic sway
        f.x += f.vx + Math.sin(time + f.pulsePhase) * 0.3 * f.z;
        f.y += f.vy + Math.cos(time * 0.8 + f.pulsePhase) * 0.25 * f.z;
        f.z += f.vz;

        // Keep z within bounds
        if (f.z < 0.3) f.z = 2.2;
        if (f.z > 2.5) f.z = 0.4;

        // Wrap around screen edges softly
        if (f.x < -30) f.x = width + 30;
        if (f.x > width + 30) f.x = -30;
        if (f.y < -30) f.y = height + 30;
        if (f.y > height + 30) f.y = -30;

        // Subtle attraction force to mouse cursor if near
        const dx = mouseX - f.x;
        const dy = mouseY - f.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 10) {
          f.x += (dx / dist) * 0.25 * f.z;
          f.y += (dy / dist) * 0.25 * f.z;
        }

        // Bioluminescent flicker & pulse calculation
        f.pulsePhase += f.pulseSpeed;
        const pulse = (Math.sin(f.pulsePhase) + 1) / 2; // 0 to 1
        f.alpha = f.baseAlpha * (0.3 + 0.7 * Math.pow(pulse, 2));

        // Draw 3D glowing firefly
        ctx.save();
        
        // Depth-of-field blur for foreground and far background
        if (f.z > 1.8) {
          ctx.filter = "blur(1.5px)";
        } else if (f.z < 0.6) {
          ctx.filter = "blur(1px)";
        } else {
          ctx.filter = "none";
        }

        // Radial glow gradient for 3D volumetric light
        const glowRadius = f.radius * (3.5 + pulse * 2.5);
        const gradient = ctx.createRadialGradient(
          f.x, f.y, 0,
          f.x, f.y, glowRadius
        );

        gradient.addColorStop(0, `${f.color}${Math.min(1, f.alpha * 1.5)})`);
        gradient.addColorStop(0.3, `${f.color}${f.alpha * 0.6})`);
        gradient.addColorStop(1, `${f.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(f.x, f.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Intense central core dot
        ctx.fillStyle = `#ffffff`;
        ctx.globalAlpha = Math.min(1, f.alpha * 1.8);
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius * 0.45, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-80"
    />
  );
}
