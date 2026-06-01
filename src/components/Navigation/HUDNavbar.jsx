import React from 'react';
import { Play, Shield, Wifi, Command, Terminal, ChevronDown } from 'lucide-react';

export default function HUDNavbar({ isDecrypted, setIsDecrypted }) {
  return (
    <header className="ide-topbar select-none">
      
      {/* Left side: IDE Menu & Brand */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          {/* Pulsating Nucleus */}
          <div className="relative w-4 h-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-violet-500/20 animate-ping"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          </div>
          <span className="font-header font-black text-xs tracking-wider text-white flex items-center gap-1">
            VOE<span className="text-violet-400">SMART</span>
            <span className="text-[7px] font-mono text-slate-500 px-1 py-0.2 rounded border border-white/5 bg-white/[0.01]">v2.0</span>
          </span>
        </div>

        {/* Windows style File menu actions */}
        <div className="hidden lg:flex items-center gap-4 text-[10px] text-slate-400 font-sans">
          <span className="hover:text-white transition-colors cursor-pointer">File</span>
          <span className="hover:text-white transition-colors cursor-pointer">Edit</span>
          <span className="hover:text-white transition-colors cursor-pointer">Selection</span>
          <span className="hover:text-white transition-colors cursor-pointer">View</span>
          <span className="hover:text-white transition-colors cursor-pointer">Run</span>
          <span className="hover:text-white transition-colors cursor-pointer">Terminal</span>
          <span className="hover:text-white transition-colors cursor-pointer text-violet-400 font-medium">Antigravity</span>
        </div>
      </div>

      {/* Center active search bar/document title */}
      <div className="hidden md:flex items-center gap-2 px-6 py-1 rounded bg-[#040408] border border-white/[0.02] text-[10px] font-mono text-slate-400 w-96 justify-center">
        <Command size={10} className="text-slate-600" />
        <span>voesmart-core-ai — workspace: ~/site-voesmartdev</span>
      </div>

      {/* Right side: Sync telemetry & window buttons */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-4 font-mono text-[9px] text-slate-500">
          <div className="flex items-center gap-1 text-emerald-400">
            <Wifi size={10} className="animate-pulse" />
            <span>CONNECTED</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-violet-400">
            <Shield size={10} />
            <span>Z-K AUTH: OK</span>
          </div>
        </div>

        {/* Window action simulator */}
        <div className="flex items-center gap-1.5 pl-3 border-l border-white/[0.04]">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 hover:bg-red-950 text-red-500 cursor-pointer"></div>
        </div>
      </div>

    </header>
  );
}
