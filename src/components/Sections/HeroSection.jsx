import React, { useState, useEffect } from 'react';
import BlurDecrypt from '../HUD/BlurDecrypt';
import MinimalPanel from '../HUD/MinimalPanel';
import { Cpu, Terminal, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const SUBHEADINGS = [
  'ENGENHARIA REVERSA DE ALTA ESCALA',
  'MODELOS AI AUTÔNOMOS E COGNITIVOS',
  'SISTEMAS ULTRA SEGUROS E IMPENETRÁVEIS',
  '26 ANOS DE AUTORIDADE TECNOLÓGICA'
];

export default function HeroSection({ isDecrypted }) {
  const [subText, setSubText] = useState(SUBHEADINGS[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % SUBHEADINGS.length;
      setSubText(SUBHEADINGS[index]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative pt-40 pb-20 z-10 flex flex-col items-center justify-center min-h-screen container mx-auto px-6 md:px-12 text-center">
      
      {/* Floating status flag */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] font-mono text-[9px] tracking-[0.2em] text-slate-400 mb-8 animate-pulse">
        <span className="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
        SYSTEM_DIAGNOSTIC: SECURE_CORE_ONLINE
      </div>

      {/* Giant Fashionable Typography */}
      <div className="max-w-5xl">
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-header font-black tracking-tight leading-[0.9] text-white">
          VOESMART
          <br />
          <span className="outline-text block mt-2">
            ENGINEERING
          </span>
        </h1>

        {/* Dynamic Telemetry Subheading */}
        <div className="h-6 mt-8 mb-8 flex justify-center items-center">
          <span className="font-mono text-[10px] tracking-[0.25em] text-emerald-400 font-medium flex items-center gap-2">
            <Terminal size={12} className="animate-pulse" />
            [SYS_STATE: <BlurDecrypt text={subText} forceDecrypt={isDecrypted} />]
          </span>
        </div>

        <p className="text-slate-400 max-w-2xl mx-auto mb-12 font-body text-base font-light leading-relaxed">
          Desenvolvemos ecossistemas web e landing pages de altíssima performance. Nossa engenharia exclusiva garante blindagem completa dos dados e velocidades de carregamento líderes do ecossistema.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
          <a href="#contact">
            <button className="cosmic-btn violet flex items-center gap-2 group">
              INICIAR PROJETO
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </a>
          <a href="#security">
            <button className="cosmic-btn green flex items-center gap-2">
              DESCRIPTOGRAFAR NÚCLEO
            </button>
          </a>
        </div>
      </div>

      {/* Grid of 3 Floaty Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-12 text-left">
        
        <MinimalPanel title="SPEED_RATIO" accent="violet" statusText="0.18s">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="p-2.5 rounded-full bg-violet-950/20 text-violet-400 border border-violet-500/10">
              <Zap size={18} className="animate-pulse" />
            </div>
            <h4 className="font-header font-bold text-xs tracking-wider text-white">LANDINGS ULTRA RÁPIDAS</h4>
          </div>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Otimização estática em nível de compilador. Códigos leves gerados no ecossistema Vite com pontuação 100/100 na auditoria do Google Lighthouse.
          </p>
        </MinimalPanel>

        <MinimalPanel title="PRIVACY_PROTOCOL" accent="green" statusText="SECURE">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="p-2.5 rounded-full bg-emerald-950/20 text-emerald-400 border border-emerald-500/10">
              <ShieldCheck size={18} />
            </div>
            <h4 className="font-header font-bold text-xs tracking-wider text-white">OFUSCAÇÃO DE DADOS</h4>
          </div>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Sistemas defensivos que ocultam informações sensíveis e aplicam camadas de segurança Zero-Knowledge na transmissão de dados da sua empresa.
          </p>
        </MinimalPanel>

        <MinimalPanel title="VETERAN_HISTORY" accent="violet" statusText="26_YEARS">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="p-2.5 rounded-full bg-violet-950/20 text-violet-400 border border-violet-500/10">
              <Cpu size={18} />
            </div>
            <h4 className="font-header font-bold text-xs tracking-wider text-white">26 ANOS DE EXP</h4>
          </div>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Duas décadas e meia escalando softwares de altíssima escala e complexidade para governos, finanças e grandes corporações multinacionais.
          </p>
        </MinimalPanel>

      </div>

    </section>
  );
}
