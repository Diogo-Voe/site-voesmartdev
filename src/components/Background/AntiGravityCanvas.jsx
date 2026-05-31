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

    // Track mouse coordinates and velocity
    const mouse = {
      x: -1000,
      y: -1000,
      vx: 0,
      vy: 0,
      lastX: -1000,
      lastY: -1000,
      radius: 180, // Repulsion boundary
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - mouse.lastX;
      mouse.vy = mouse.y - mouse.lastY;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    // Particle Setup
    let particles = [];
    const particleCount = Math.min(100, Math.floor((width * height) / 15000));

    class Particle {
      constructor() {
        this.reset();
        // Scatter initially across full canvas
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        // Original grid/anchor points that they drift back to
        this.anchorX = Math.random() * width;
        this.anchorY = Math.random() * height;
        this.x = this.anchorX;
        this.y = this.anchorY;
        this.vx = 0;
        this.vy = 0;
        
        // Custom properties
        this.size = Math.random() * 2.5 + 0.8;
        this.baseAlpha = Math.random() * 0.4 + 0.15;
        this.alpha = this.baseAlpha;
        this.colorType = Math.random() > 0.4 ? 'cyan' : 'green'; // themed colors
        this.springStiffness = Math.random() * 0.005 + 0.002; // slow spring-back
        this.damping = Math.random() * 0.04 + 0.92; // smooth deceleration
      }

      update() {
        // 1. Spring-back force to original anchor point (creates floating/hovering effect)
        const dxAnchor = this.anchorX - this.x;
        const dyAnchor = this.anchorY - this.y;
        this.vx += dxAnchor * this.springStiffness;
        this.vy += dyAnchor * this.springStiffness;

        // 2. Mouse Antigravity Repulsion
        if (mouse.x > -500) {
          const dxMouse = this.x - mouse.x;
          const dyMouse = this.y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < mouse.radius) {
            // Stronger push when closer, fading at the edges
            const force = (mouse.radius - distMouse) / mouse.radius;
            const pushX = (dxMouse / distMouse) * force * 1.5;
            const pushY = (dyMouse / distMouse) * force * 1.5;

            this.vx += pushX;
            this.vy += pushY;
            
            // Brighten particle near cursor
            this.alpha = Math.min(0.9, this.baseAlpha + force * 0.5);
          } else {
            // Decay alpha back to base
            this.alpha += (this.baseAlpha - this.alpha) * 0.1;
          }
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.1;
        }

        // Apply friction/damping
        this.vx *= this.damping;
        this.vy *= this.damping;

        // Apply movement
        this.x += this.vx;
        this.y += this.vy;

        // Soft boundaries / wrap anchors if window resized
        if (this.anchorX > width) this.anchorX = Math.random() * width;
        if (this.anchorY > height) this.anchorY = Math.random() * height;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const color = this.colorType === 'cyan' ? '0, 240, 255' : '0, 255, 136';
        ctx.fillStyle = `rgba(${color}, ${this.alpha})`;
        ctx.shadowColor = `rgba(${color}, ${this.alpha})`;
        ctx.shadowBlur = this.size > 2 ? 8 : 0;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const initParticles = () => {
      particles = [];
      const dynamicCount = Math.min(100, Math.floor((width * height) / 15000));
      for (let i = 0; i < dynamicCount; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    // Loop & Mesh Connector
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Connect particles close to each other (Neural Constellation Mesh)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            // Draw link line
            const alpha = (110 - dist) / 110 * 0.08;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Blend colors based on particle types
            const color = p1.colorType === 'cyan' ? '0, 240, 255' : '0, 255, 136';
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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
