import React, { useState, useEffect } from 'react';
import DecryptText from '../HUD/DecryptText';
import TelemetryPanel from '../HUD/TelemetryPanel';
import { Cpu, Terminal, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const SUBHEADINGS = [
  'ENGENHARIA REVERSA DE ALTA ESCALA',
  'MODELOS AI AUTÔNOMOS E COGNITIVOS',
  'SISTEMAS ULTRA SEGUROS E IMPENETRÁVEIS',
  '26 ANOS DE AUTORIDADE TECNOLÓGICA'
];

export default function HeroSection({ isDecrypted }) {
  const [headingIndex, setHeadingIndex] = useState(0);
  const [subText, setSubText] = useState(SUBHEADINGS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadingIndex((prev) => {
        const next = (prev + 1) % SUBHEADINGS.length;
        setSubText(SUBHEADINGS[next]);
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative pt-32 pb-20 z-10 flex flex-col items-center justify-center min-h-screen container mx-auto px-4 md:px-8">
      
      {/* HUD Warning Strip */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded border border-cyan-500/20 bg-slate-950/60 font-mono text-[9px] tracking-widest text-cyan-400 mb-8 animate-pulse">
        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
        SYSTEM_DIAGNOSTIC: ACTIVE_GRID_ON_0x5F3E
      </div>

      {/* Primary Brand Pitch */}
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-hud font-black tracking-tight leading-tight text-white select-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">VOESMART</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            ENGINEERING
          </span>
        </h1>

        {/* Dynamic Telemetry Subheading with Glitch Effect */}
        <div className="h-8 mt-6 mb-8 flex justify-center items-center">
          <span className="font-mono text-xs sm:text-sm tracking-[0.2em] text-emerald-400 font-bold flex items-center gap-2">
            <Terminal size={14} className="animate-pulse" />
            [SYS_MODE: <DecryptText text={subText} forceDecrypt={isDecrypted} speed={15} />]
          </span>
        </div>

        <p className="text-slate-400 max-w-2xl mx-auto mb-12 font-body text-base leading-relaxed">
          Desenvolvemos landing pages e ecossistemas web imersivos de altíssima performance. Nossa tecnologia de ponta oculta dados críticos, garante segurança de nível governamental e entrega o carregamento mais rápido do mercado.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <a href="#contact">
            <button className="neon-btn flex items-center gap-2 group">
              INICIAR PROJETO
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
          <a href="#security">
            <button className="neon-btn green flex items-center gap-2">
              DESCRIPTOGRAFAR NÚCLEO
            </button>
          </a>
        </div>
      </div>

      {/* Grid of 3 Telemetry Summary Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-10">
        
        <TelemetryPanel title="VELOCITY_MATRIX" theme="cyan" statusText="0.18s">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded bg-cyan-950/30 text-cyan-400 border border-cyan-500/20">
              <Zap size={18} className="animate-pulse" />
            </div>
            <h4 className="font-hud font-bold text-xs tracking-wider text-white">LANDINGS ULTRA RÁPIDAS</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-body">
            Design centrado em otimização de ativos estáticos. Código compilado em Vite com performance 100/100 na auditoria Lighthouse do Google.
          </p>
        </TelemetryPanel>

        <TelemetryPanel title="SHIELD_METRIC" theme="green" statusText="SECURE">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded bg-emerald-950/30 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck size={18} />
            </div>
            <h4 className="font-hud font-bold text-xs tracking-wider text-white">OFUSCAÇÃO DE DADOS</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-body">
            Algoritmos defensivos que impedem inspeção indevida dos dados e injetam camadas de criptografia ZK (Zero-Knowledge) em tempo real.
          </p>
        </TelemetryPanel>

        <TelemetryPanel title="VETERAN_COMMAND" theme="purple" statusText="26_YRS">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded bg-purple-950/30 text-purple-400 border border-purple-500/20">
              <Cpu size={18} />
            </div>
            <h4 className="font-hud font-bold text-xs tracking-wider text-white">26 ANOS DE ESTRADA</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-body">
            Arquitetura resiliente moldada por mais de duas décadas de experiência lidando com sistemas de alta disponibilidade e escala.
          </p>
        </TelemetryPanel>

      </div>

    </section>
  );
}
