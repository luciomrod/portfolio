import React, { useEffect, useRef } from 'react';

const MouseTrail: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<{ x: number; y: number; alpha: number; dx: number; dy: number }[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const isMovingRef = useRef(false);
    const lastMousePosRef = useRef({ x: 0, y: 0 });
    const timeoutRef = useRef<number>();

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

            // Only create new particles if the mouse is moving
            if (isMovingRef.current && Math.random() < 0.3) {
                particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y));
            }

            // Update and draw existing particles
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
                gradient.addColorStop(0, `rgba(168, 85, 247, ${particle.alpha})`);
                gradient.addColorStop(1, `rgba(219, 39, 119, ${particle.alpha})`);

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                return particle.alpha > 0.01;
            });

            requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const newX = e.clientX - rect.left;
            const newY = e.clientY - rect.top;
            
            // Check if the mouse has moved significantly
            const dx = newX - lastMousePosRef.current.x;
            const dy = newY - lastMousePosRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 1) {
                isMovingRef.current = true;
                // Clear any existing timeout
                if (timeoutRef.current) {
                    window.clearTimeout(timeoutRef.current);
                }
                
                // Set a timeout to stop particle creation after mouse stops moving
                timeoutRef.current = window.setTimeout(() => {
                    isMovingRef.current = false;
                }, 50); // Adjust this value to change how quickly particles stop appearing after mouse stops
            }
            
            mouseRef.current = { x: newX, y: newY };
            lastMousePosRef.current = { x: newX, y: newY };
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
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