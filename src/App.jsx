import React, { useState, useEffect } from 'react';
import HUDNavbar from './components/Navigation/HUDNavbar';
import TelemetryFooter from './components/Navigation/TelemetryFooter';
import AntiGravityCanvas from './components/Background/AntiGravityCanvas';
import HeroSection from './components/Sections/HeroSection';
import SecurityVault from './components/Sections/SecurityVault';
import ContactTerminal from './components/Sections/ContactTerminal';

export default function App() {
  const [isDecrypted, setIsDecrypted] = useState(false);
  
  // Custom Chasing Cursor State
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorOutlinePos, setCursorOutlinePos] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth Chase Effect for Outer Cursor Outline (Fluid lag)
  useEffect(() => {
    let animationFrame;
    
    const updateOutline = () => {
      setCursorOutlinePos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        
        // Linear interpolation for smooth trailing
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrame = requestAnimationFrame(updateOutline);
    };

    updateOutline();
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos]);

  // Track hover state for buttons, links, inputs
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.closest('.hud-panel') ||
        target.closest('a') ||
        target.closest('button');

      setIsHoveringInteractive(!!isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 🌌 High-Performance Antigravity Particle Canvas */}
      <AntiGravityCanvas />

      {/* 🚀 Active HUD Grid Overlay & Digital Scanlines */}
      <div className="hud-grid-overlay"></div>
      <div className="hud-scanline-overlay"></div>

      {/* 🎯 Custom Cyber-Cursor Chaser */}
      <div 
        className={`custom-cursor hidden md:block ${isHoveringInteractive ? 'custom-cursor-hover' : ''}`}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      <div 
        className={`custom-cursor-outline hidden md:block ${isHoveringInteractive ? 'custom-cursor-outline-hover' : ''}`}
        style={{ left: `${cursorOutlinePos.x}px`, top: `${cursorOutlinePos.y}px` }}
      />

      {/* ⚓ Tactical HUD Navbar */}
      <HUDNavbar isDecrypted={isDecrypted} setIsDecrypted={setIsDecrypted} />

      {/* Main Structural HUD Layout */}
      <main className="relative z-10">
        
        {/* Sector 1: Hero Telemetry */}
        <HeroSection isDecrypted={isDecrypted} />

        {/* Sector 2: Security Crypt Core */}
        <SecurityVault forceDecryptAll={isDecrypted} />

        {/* Sector 3: Command Terminal inquiry */}
        <ContactTerminal />

      </main>

      {/* 🛰️ Telemetry Status Footer */}
      <TelemetryFooter />

    </div>
  );
}
