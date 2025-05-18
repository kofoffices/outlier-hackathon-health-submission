"use client"
import React, { useEffect, useRef } from 'react';

interface AuraAnimatorProps {
  isActive: boolean;
  phase: "inhale" | "hold" | "exhale";
  streakCount?: number; // For potentially increasing complexity
  className?: string;
}

const AuraAnimator: React.FC<AuraAnimatorProps> = ({
  isActive,
  phase,
  streakCount = 0,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive) return; // Don't animate if not active

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: { x: number, y: number, size: number, speedX: number, speedY: number, color: string, life: number }[] = [];
    const particleCount = 20 + Math.min(streakCount * 5, 30); // More particles with higher streak

    const phaseConfig = {
      inhale: { color: 'rgba(96, 165, 250, 0.3)', speedFactor: 0.5, direction: 1 }, // Blue, inward/slow
      hold: { color: 'rgba(167, 139, 250, 0.2)', speedFactor: 0.1, direction: 0 },   // Purple, very slow/still
      exhale: { color: 'rgba(45, 212, 191, 0.3)', speedFactor: 0.7, direction: -1 }, // Teal, outward/faster
    };
    const config = phaseConfig[phase];
    
    const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();


    function createParticle() {
      const size = Math.random() * 3 + 1; // Particle size
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      // Speed and direction based on phase
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 1 + 0.5) * config.speedFactor;
      
      particles.push({
        x, y, size,
        speedX: config.direction === 0 ? (Math.random() - 0.5) * 0.2 : Math.cos(angle) * speed * (config.direction === 1 ? -1 : 1), // Inhale pulls inward
        speedY: config.direction === 0 ? (Math.random() - 0.5) * 0.2 : Math.sin(angle) * speed * (config.direction === 1 ? -1 : 1),
        color: config.color,
        life: 100 + Math.random() * 50 // Particle lifespan
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (particles.length < particleCount && Math.random() < 0.3) { // Add new particles gradually
        createParticle();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 1;
        p.size = Math.max(0, p.size - 0.01); // Particles can shrink

        if (p.life <= 0 || p.size <= 0) {
          particles.splice(i, 1);
          i--;
          continue;
        }
        
        // Reset if particle goes too far (especially for hold phase)
        if (config.direction === 0 && (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height)) {
            particles.splice(i,1); i--; continue;
        }


        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    animateParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive, phase, streakCount]); // Rerun when these change

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 pointer-events-none ${
        isActive ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{zIndex: -1}} // Ensure it's behind other elements
    />
  );
};

export default AuraAnimator;