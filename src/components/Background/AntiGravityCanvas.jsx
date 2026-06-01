import React, { useEffect, useRef } from 'react';

export default function AntiGravityCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 200, // gravitational lens radius
    };

    // Track click ripples (Gravity Shockwaves)
    let ripples = [];

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleMouseDown = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 250,
        speed: 4,
        force: 8,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };
    window.addEventListener('resize', handleResize);

    // Star Class (Micro-Stardust)
    let stars = [];

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        // Orbital center and speed
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.angle = Math.random() * Math.PI * 2;
        this.orbitRadius = Math.random() * Math.max(width, height) * 0.8;
        this.orbitSpeed = (Math.random() * 0.0002 + 0.00005) * (Math.random() > 0.5 ? 1 : -1);

        this.size = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.colorType = Math.random() > 0.35 ? 'violet' : 'green';
        
        // Ripple velocities
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        // 1. Base orbit movement
        this.angle += this.orbitSpeed;
        
        // Standard position
        const targetX = this.centerX + Math.cos(this.angle) * this.orbitRadius;
        const targetY = this.centerY + Math.sin(this.angle) * this.orbitRadius;

        // Apply friction/decay to ripple velocities
        this.vx *= 0.95;
        this.vy *= 0.95;

        // Add orbital trajectory + ripple displacements
        this.x = targetX + this.vx;
        this.y = targetY + this.vy;

        // 2. Ripple/Shockwave physics
        ripples.forEach((rp) => {
          const dx = this.x - rp.x;
          const dy = this.y - rp.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // If ripple boundary sweeps over the star
          if (dist > rp.radius - 15 && dist < rp.radius + 15) {
            const force = (rp.maxRadius - rp.radius) / rp.maxRadius * rp.force;
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
          }
        });

        // Wrap boundaries
        if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) {
          this.reset();
        }
      }

      draw() {
        // 3. Gravitational Lens Warp Calculation
        // We warp the RENDERED coordinates, not the physical coordinates
        let renderX = this.x;
        let renderY = this.y;

        if (mouse.x > -500) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            // Gravitational bending formula (distortion bubble)
            const bendFactor = Math.sin((dist / mouse.radius) * Math.PI / 2);
            // Warp coordinates slightly away/curving around lens
            const scale = 1 + (1 - bendFactor) * 0.35; 
            renderX = mouse.x + dx * scale;
            renderY = mouse.y + dy * scale;
          }
        }

        ctx.beginPath();
        ctx.arc(renderX, renderY, this.size, 0, Math.PI * 2);
        const color = this.colorType === 'violet' ? '139, 92, 246' : '0, 255, 136';
        ctx.fillStyle = `rgba(${color}, ${this.alpha})`;
        ctx.fill();
      }
    }

    const initStars = () => {
      stars = [];
      const count = Math.min(220, Math.floor((width * height) / 8000));
      for (let i = 0; i < count; i++) {
        stars.push(new Star());
      }
    };

    initStars();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update ripples
      ripples = ripples.filter((rp) => {
        rp.radius += rp.speed;
        return rp.radius < rp.maxRadius;
      });

      // Draw faint gravity shockwave rings
      ripples.forEach((rp) => {
        const pct = (rp.maxRadius - rp.radius) / rp.maxRadius;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 92, 246, ${pct * 0.15})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw active gravity lens aura (subtle concentric ripples near mouse)
      if (mouse.x > -500) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        grad.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
        grad.addColorStop(0.5, 'rgba(0, 255, 136, 0.01)');
        grad.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Render stars
      stars.forEach((st) => {
        st.update();
        st.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="background-canvas-container">
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
