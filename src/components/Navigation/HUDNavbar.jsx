import React from 'react';
import { Eye, EyeOff, Radio, Shield, HelpCircle, HardDrive } from 'lucide-react';

export default function HUDNavbar({ isDecrypted, setIsDecrypted }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/40 backdrop-blur-md border-b border-cyan-500/10 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO SECTOR: Levitating Anti-Gravity Core */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Spinning Gravity Rings */}
            <svg className="absolute w-full h-full animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeDasharray="30 20" opacity="0.4" />
            </svg>
            <svg className="absolute w-full h-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="32" fill="none" stroke="var(--accent-green)" strokeWidth="1" strokeDasharray="15 15" opacity="0.6" />
            </svg>
            
            {/* Suspended Core - Antigravity Float */}
            <div className="relative w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 group-hover:scale-125 transition-transform duration-300 animate-pulse" style={{ boxShadow: 'var(--glow-cyan)' }}>
              <div className="absolute inset-0.5 rounded-full bg-white opacity-80 blur-[1px]"></div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="font-hud font-black text-sm tracking-[0.25em] text-white flex items-center gap-1">
              VOE<span className="text-cyan-400 group-hover:text-emerald-400 transition-colors">SMART</span>
              <span className="text-[9px] font-mono border border-cyan-500/30 px-1 py-0.2 rounded bg-cyan-950/20 text-cyan-400">.DEV</span>
            </span>
            <span className="font-mono text-[8px] tracking-widest text-slate-500 uppercase">AI ENGINE & HIGH ARCH</span>
          </div>
        </a>

        {/* Center telemetry stats */}
        <div className="hidden lg:flex items-center gap-8 font-mono text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Radio size={12} className="text-cyan-400 animate-pulse" />
            <span>SYS_SYNC: <span className="text-cyan-400 font-bold">ORBIT_01</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield size={12} className="text-emerald-400" />
            <span>SHIELD_SHELL: <span className="text-emerald-400 font-bold">99.8%</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <HardDrive size={12} className="text-purple-400" />
            <span>V_CORE: <span className="text-purple-400 font-bold">ACTIVE_26Y</span></span>
          </div>
        </div>

        {/* Navigation & Decryptor Switch */}
        <div className="flex items-center gap-4">
          <a href="#security" className="hidden md:inline-block font-hud text-[10px] tracking-widest text-slate-400 hover:text-cyan-400 transition-colors uppercase">
            Cofre Seguro
          </a>
          <a href="#contact" className="hidden md:inline-block font-hud text-[10px] tracking-widest text-slate-400 hover:text-cyan-400 transition-colors uppercase">
            Terminal
          </a>

          {/* Master Decrypt Switch */}
          <button
            onClick={() => setIsDecrypted(!isDecrypted)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all duration-300 font-mono text-[10px] uppercase tracking-wider ${
              isDecrypted 
                ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400 var(--glow-green)' 
                : 'border-cyan-500/20 bg-slate-900/60 text-cyan-400 hover:border-cyan-400/40'
            }`}
            style={isDecrypted ? { boxShadow: 'var(--glow-green)' } : {}}
            title={isDecrypted ? "Encriptar Dados da Página" : "Descriptografar Dados da Página"}
          >
            {isDecrypted ? <Eye size={12} className="animate-pulse" /> : <EyeOff size={12} />}
            <span className="hidden sm:inline">{isDecrypted ? 'MODO: ABERTO' : 'DECRIPTAR_SITE'}</span>
          </button>
        </div>

      </div>
    </nav>
  );
}
