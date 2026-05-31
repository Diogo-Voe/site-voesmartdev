import React from 'react';

export default function TelemetryPanel({ 
  title, 
  theme = 'cyan', // 'cyan', 'green', 'purple'
  statusText = 'SYS_OK', 
  isWarning = false,
  className = '', 
  children 
}) {
  const getThemeClass = () => {
    if (isWarning) return 'border-red-500'; // fallback red
    if (theme === 'green') return 'emerald';
    if (theme === 'purple') return 'purple';
    return '';
  };

  const getAccentColor = () => {
    if (isWarning) return 'var(--accent-red)';
    if (theme === 'green') return 'var(--accent-green)';
    if (theme === 'purple') return 'var(--accent-purple)';
    return 'var(--accent-cyan)';
  };

  return (
    <div className={`hud-panel ${getThemeClass()} ${className}`} style={isWarning ? { borderColor: 'var(--accent-red)' } : {}}>
      {/* HUD Header Bar */}
      <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-800" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {title && (
          <h3 className="text-xs font-hud font-bold tracking-widest flex items-center gap-2" style={{ color: getAccentColor() }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: getAccentColor() }}></span>
            {title}
          </h3>
        )}
        {statusText && (
          <div className="font-mono text-[9px] px-2 py-0.5 rounded border" style={{ 
            color: getAccentColor(),
            borderColor: isWarning ? 'rgba(255, 59, 48, 0.2)' : (theme === 'green' ? 'rgba(0, 255, 136, 0.2)' : 'rgba(0, 240, 255, 0.2)'),
            backgroundColor: 'rgba(0,0,0,0.3)'
          }}>
            {statusText}
          </div>
        )}
      </div>

      {/* Futuristic Notch Borders */}
      <div className="absolute top-2 right-6 w-12 h-[1px]" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
      <div className="absolute bottom-2 left-6 w-12 h-[1px]" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>

      {/* Decorative Grid Lines */}
      <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[2px] h-6" style={{ backgroundColor: getAccentColor() }}></div>
      <div className="absolute -right-[1px] top-1/2 -translate-y-1/2 w-[2px] h-6" style={{ backgroundColor: getAccentColor() }}></div>

      {/* Content */}
      <div className="relative z-10 text-sm text-slate-300 leading-relaxed font-body">
        {children}
      </div>
    </div>
  );
}
