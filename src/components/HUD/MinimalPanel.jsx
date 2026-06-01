import React from 'react';

export default function MinimalPanel({ 
  title, 
  accent = 'violet', // 'violet', 'green'
  statusText = '', 
  className = '', 
  children 
}) {
  const getAccentColor = () => {
    if (accent === 'green') return 'var(--accent-green)';
    return 'var(--accent-violet)';
  };

  const getGlowColor = () => {
    if (accent === 'green') return 'rgba(0, 255, 136, 0.05)';
    return 'rgba(139, 92, 246, 0.05)';
  };

  return (
    <div 
      className={`glass-plate relative overflow-hidden group ${className}`}
      style={{
        background: `radial-gradient(circle at 0% 0%, ${getGlowColor()} 0%, rgba(8, 8, 20, 0.4) 100%)`,
      }}
    >
      {/* Decorative top gradient separator (extremely subtle) */}
      <div 
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/30 to-transparent group-hover:via-violet-500/25 transition-all duration-700"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${getAccentColor()}15 50%, transparent 100%)`
        }}
      ></div>

      {/* Header bar */}
      {(title || statusText) && (
        <div className="flex justify-between items-center mb-5 border-b border-white/[0.03] pb-3">
          {title && (
            <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: getAccentColor() }}></span>
              {title}
            </span>
          )}
          {statusText && (
            <span className="font-mono text-[8px] tracking-widest text-slate-500 uppercase">
              {statusText}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-sm text-slate-300 leading-relaxed font-body">
        {children}
      </div>
    </div>
  );
}
