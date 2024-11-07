import React, { useEffect, useRef } from 'react';

const MouseTrail: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<{ x: number; y: number; alpha: number; dx: number; dy: number }[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
        return {
        x,
        y,
        alpha: 1,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        };
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new particles at mouse position
        if (Math.random() < 0.3) {
        particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y));
        }

      // Update and draw particles
        particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.dx;
        particle.y += particle.dy;
        particle.alpha *= 0.96;

        const gradient = ctx.createLinearGradient(
            particle.x,
            particle.y,
            particle.x + 10,
            particle.y + 10
        );
        gradient.addColorStop(0, `rgba(168, 85, 247, ${particle.alpha})`); // purple-400
        gradient.addColorStop(1, `rgba(219, 39, 119, ${particle.alpha})`); // pink-600

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        
          // Create new particles at mouse position
          if (Math.random() < 0.3) {
            particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y));
          }
        
          // Update and draw particles
          particlesRef.current = particlesRef.current.filter((particle) => {
            particle.x += particle.dx;
            particle.y += particle.dy;
            particle.alpha *= 0.96;
        
            // Change color to shadow grey when scrolling on a link
            const isScrollingOnLink = document.querySelector('a:hover') !== null;
            const color = isScrollingOnLink ? `rgba(60, 60, 60, ${particle.alpha})` : `rgba(168, 85, 247, ${particle.alpha})`;
        
            const gradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              particle.x + 10,
              particle.y + 10
            );
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, `rgba(219, 39, 119, ${particle.alpha})`);
        
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        
            // Reduce opacity when scrolling on a link
            if (isScrollingOnLink) {
              particle.alpha *= 0.5;
            }
        
            return particle.alpha > 0.01;
          });
        
          requestAnimationFrame(animate);
        };

        return particle.alpha > 0.01;
        });

        requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        };
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleMouseMove);
    };
    }, []);

    return (
    <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ mixBlendMode: 'screen' }}
    />
    );
};

export default MouseTrail;