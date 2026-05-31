import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, Compass, Zap } from 'lucide-react';

export default function TelemetryFooter() {
  const [coords, setCoords] = useState({ lat: '00.0000', lng: '00.0000' });
  const [activeUsers, setActiveUsers] = useState(1337);

  useEffect(() => {
    const coordInterval = setInterval(() => {
      setCoords({
        lat: (Math.random() * 90).toFixed(4),
        lng: (Math.random() * 180).toFixed(4),
      });
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 2000);

    return () => clearInterval(coordInterval);
  }, []);

  return (
    <footer className="relative z-10 border-t border-cyan-500/10 bg-slate-950/80 py-8 px-4 md:px-8 mt-12 font-mono text-[10px] text-slate-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Col 1: System Coords */}
        <div className="flex flex-col gap-1.5">
          <span className="text-slate-400 font-hud text-[9px] tracking-widest uppercase">LOCATOR_BEACON</span>
          <div className="flex items-center gap-2 text-cyan-400">
            <Compass size={12} className="animate-spin" style={{ animationDuration: '8s' }} />
            <span>LAT: {coords.lat}° N</span>
          </div>
          <span>LNG: {coords.lng}° W</span>
        </div>

        {/* Col 2: High Scale Performance */}
        <div className="flex flex-col gap-1.5">
          <span className="text-slate-400 font-hud text-[9px] tracking-widest uppercase">BANDWIDTH_METRIC</span>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Zap size={12} className="animate-bounce" />
            <span>SPEED: 0.18s FULL_LOAD</span>
          </div>
          <span>LOAD_CAP: 260M REQUESTS/SEC</span>
        </div>

        {/* Col 3: Experience Authority */}
        <div className="flex flex-col gap-1.5">
          <span className="text-slate-400 font-hud text-[9px] tracking-widest uppercase">ESTABLISHED_DATE</span>
          <div className="flex items-center gap-1.5 text-purple-400">
            <Cpu size={12} />
            <span>EST: 2000_Q1</span>
          </div>
          <span>EXPERIENCE: 26_YEARS_MKT</span>
        </div>

        {/* Col 4: Corporate details & Copyright */}
        <div className="flex flex-col gap-1.5 md:items-end">
          <span className="text-slate-400 font-hud text-[9px] tracking-widest uppercase">VOESMART_SIGNATURE</span>
          <span className="text-cyan-400">CORE_SECURE_AUTH: 0xDEADBEEF</span>
          <span>© {new Date().getFullYear()} VoeSmart.dev. All Rights Reserved.</span>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center text-[8px] text-slate-600">
        <div>DESIGN SYSTEM: COMPONENTIZED ALIEN HUD SPA (V1.2)</div>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <span>SECURE_SHELL: ON</span>
          <span>ZERO_SCRIPTS_BLOCKED: OK</span>
          <span>LIGHTHOUSE: 100/100</span>
        </div>
      </div>
    </footer>
  );
}
