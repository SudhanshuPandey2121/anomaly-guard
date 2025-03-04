
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  particleCount?: number;
  type?: "bubbles" | "sparkles";
}

export function AnimatedBackground({
  className,
  particleCount = 50,
  type = "bubbles",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      life: number;
      maxLife: number;
    }[] = [];

    const colors = type === "bubbles" 
      ? ["rgba(77, 124, 254, 0.3)", "rgba(77, 124, 254, 0.2)", "rgba(77, 124, 254, 0.1)"]
      : ["rgba(255, 255, 255, 0.6)", "rgba(255, 210, 140, 0.6)", "rgba(130, 210, 255, 0.6)"];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === "bubbles" ? Math.random() * 15 + 5 : Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: type === "bubbles" ? Math.random() * -0.5 - 0.2 : Math.random() * -1 - 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.2,
        life: 0,
        maxLife: type === "bubbles" ? Math.random() * 300 + 100 : Math.random() * 100 + 50
      });
    }

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        
        if (p.life >= p.maxLife) {
          // Reset particle
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.life = 0;
          p.size = type === "bubbles" ? Math.random() * 15 + 5 : Math.random() * 3 + 1;
        }

        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Draw particle
        ctx.globalAlpha = type === "bubbles" ? p.opacity : p.opacity * (1 - p.life / p.maxLife);
        
        if (type === "bubbles") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          
          // Add subtle highlight to bubble
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.fill();
        } else {
          // Draw sparkle
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.life * 0.05);
          
          const size = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -size * 2);
          ctx.lineTo(0, size * 2);
          ctx.moveTo(-size * 2, 0);
          ctx.lineTo(size * 2, 0);
          ctx.moveTo(-size, -size);
          ctx.lineTo(size, size);
          ctx.moveTo(size, -size);
          ctx.lineTo(-size, size);
          
          ctx.strokeStyle = p.color;
          ctx.lineWidth = size / 2;
          ctx.stroke();
          ctx.restore();
        }
      }
      
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount, type]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 pointer-events-none z-0", className)}
    />
  );
}
