import React from 'react';
import { GitBranch, RefreshCw, AlertCircle, Zap, ShieldCheck } from 'lucide-react';

export default function TelemetryFooter() {
  return (
    <footer className="h-6 min-h-6 bg-violet-950/10 border-t border-white/[0.03] flex items-center justify-between px-4 font-mono text-[9px] text-slate-500 select-none">
      
      {/* Left side: Branch & build speed */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer">
          <GitBranch size={10} className="text-violet-400" />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <RefreshCw size={10} className="animate-spin" style={{ animationDuration: '8s' }} />
          <span>Syncing workspace...</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-slate-400 pl-3 border-l border-white/[0.04]">
          <AlertCircle size={10} className="text-slate-600" />
          <span>0 Errors</span>
          <span>0 Warnings</span>
        </div>
      </div>

      {/* Right side: Line indicators & tech metrics */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-1.5 text-emerald-400">
          <Zap size={10} />
          <span>Vite Build: 136ms</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-violet-400 pl-3 border-l border-white/[0.04]">
          <ShieldCheck size={10} />
          <span>Lighthouse: 100/100</span>
        </div>
        <span className="hidden sm:inline">Ln 1, Col 1</span>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="bg-violet-950/20 text-violet-400 px-2 py-0.5 rounded font-sans font-medium text-[8px]">
          REACT SPA
        </span>
      </div>

    </footer>
  );
}
