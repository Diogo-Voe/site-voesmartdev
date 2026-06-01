import React, { useState, useEffect } from 'react';
import MinimalPanel from '../HUD/MinimalPanel';
import BlurDecrypt from '../HUD/BlurDecrypt';
import { Lock, Unlock, EyeOff, Cpu, Radio, Server, ShieldCheck, Terminal } from 'lucide-react';

export default function SecurityVault({ forceDecryptAll = false }) {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [sysLog, setSysLog] = useState([]);
  const [wavePoints, setWavePoints] = useState([]);

  // Generate SVG telemetry wave points
  useEffect(() => {
    const points = Array.from({ length: 40 }, (_, i) => ({
      x: (i * 8),
      y: 30 + Math.cos(i * 0.4) * 12 + Math.random() * 6
    }));
    setWavePoints(points);

    const interval = setInterval(() => {
      setWavePoints(prev => {
        const next = [...prev.slice(1)];
        const nextX = prev[prev.length - 1].x + 8;
        next.push({
          x: nextX,
          y: 30 + Math.cos(nextX * 0.4) * 12 + Math.random() * 6
        });
        return next.map((pt, idx) => ({ x: idx * 8, y: pt.y }));
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  // System status log stream
  useEffect(() => {
    const logs = [
      '⚡ [SYS_OK] VoeSmart Cosmic Shield active...',
      '🔒 [AUTH] Z-K Cryptographic layers initialized...',
      '📡 [NEURAL] Synchronized with Deep-Space Mesh Grid...',
      '🛡️ [SHIELD] Defensive shell repelling scraper requests...',
    ];
    setSysLog(logs);

    const logInterval = setInterval(() => {
      const messages = [
        '🛡️ [SEC_SHIELD] Intercepted diagnostic query from client CLI',
        '⚡ [COMPILER] Compiled zero-assets rendering templates',
        '🧬 [GRAVITY] Calculated cursor repulsion coordinates',
        '📡 [ORBITAL] Updated cloud node latency to 0.003ms',
        '🔒 [CYPHER] Dynamic data re-sharded across multi-sig rings'
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setSysLog(prev => [randomMsg, ...prev.slice(0, 3)]);
    }, 5000);

    return () => clearInterval(logInterval);
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'antigravity' || passcode === '26' || passcode === '1337') {
      setIsUnlocked(true);
      setSysLog(prev => ['🔓 [AUTH_OK] Full biometric access granted.', ...prev]);
    } else {
      setSysLog(prev => ['🚨 [AUTH_ERR] Invalid credential signature.', ...prev]);
      setPasscode('');
    }
  };

  const decryptState = forceDecryptAll || isUnlocked;

  return (
    <section id="security" className="py-24 relative z-10 container mx-auto px-6 md:px-12">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-950/10 text-violet-400 font-mono text-[9px] tracking-[0.2em] uppercase mb-5 animate-pulse">
          <EyeOff size={11} />
          PROTETOR DE DADOS ATIVO
        </div>
        <h2 className="text-3xl md:text-5xl font-header text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight">
          Cofre de Segurança
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mt-4 font-body font-light text-base leading-relaxed">
          Temos 26 anos de história desenvolvendo códigos impenetráveis. Nosso ecossistema oculta e blinda dados confidenciais, proporcionando interfaces seguras e rápidas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Biometric Lock Controls */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <MinimalPanel title="BIOMETRIC_LOCK" accent={decryptState ? 'green' : 'violet'} statusText={decryptState ? 'OPEN' : 'LOCKED'}>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-700 mb-4 ${
                decryptState 
                  ? 'border-emerald-500/30 bg-emerald-950/10 text-emerald-400 var(--glow-green)' 
                  : 'border-violet-500/25 bg-violet-950/10 text-violet-400 var(--glow-violet)'
              }`} style={decryptState ? { boxShadow: 'var(--glow-green)' } : { boxShadow: 'var(--glow-violet)' }}>
                {decryptState ? <Unlock size={24} className="animate-bounce" /> : <Lock size={24} />}
              </div>
              <h4 className="font-header font-bold text-xs tracking-wider text-slate-100 mb-2">
                {decryptState ? 'ACESSO BIO CONCEDIDO' : 'NÚCLEO CRIPTOGRAFADO'}
              </h4>
              <p className="text-[11px] text-slate-400 mb-6 max-w-[220px] font-light leading-relaxed">
                {decryptState 
                  ? 'Nossos modelos neurais de AI e Engenharia Única estão revelados.' 
                  : 'Digite o código de acesso corporativo para remover a segurança visual.'}
              </p>

              {!decryptState && (
                <form onSubmit={handleAuth} className="w-full">
                  <input 
                    type="password" 
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="DIGITE: antigravity" 
                    className="w-full bg-[#050510]/80 border border-white/5 text-violet-400 placeholder-violet-900 rounded-full font-mono text-center text-xs py-2.5 px-4 mb-3 focus:outline-none focus:border-violet-500/30 transition-colors"
                  />
                  <button 
                    type="submit" 
                    className="w-full cosmic-btn violet py-2 text-[10px] flex justify-center items-center gap-2"
                  >
                    <Terminal size={11} />
                    AUTENTICAR CHAVE
                  </button>
                </form>
              )}

              {decryptState && (
                <button 
                  onClick={() => setIsUnlocked(false)} 
                  className="w-full cosmic-btn green py-2 text-[10px]"
                >
                  RE-ATIVAR SISTEMA DE DEFESA
                </button>
              )}
            </div>
          </MinimalPanel>

          <MinimalPanel title="LOG_STREAM" accent="violet" statusText="LIVE">
            <div className="font-mono text-[10px] space-y-2 max-h-[140px] overflow-y-auto pr-2 scrollbar">
              {sysLog.map((log, index) => (
                <div key={index} className={`border-b border-white/[0.02] pb-1.5 leading-relaxed ${
                  log.includes('🔓') || log.includes('⚡') ? 'text-emerald-400' : 'text-violet-400'
                }`}>
                  {log}
                </div>
              ))}
            </div>
          </MinimalPanel>
        </div>

        {/* Right Column: Encrypted Shards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <MinimalPanel title="SEC_01: AI_ENGINE" accent={decryptState ? 'green' : 'violet'} statusText="0x9A4B">
            <div className="flex justify-between items-start mb-4">
              <Cpu size={22} className={decryptState ? 'text-emerald-400' : 'text-violet-400'} />
              <span className="text-[9px] font-mono text-slate-500">POLYMORPHIC_AI</span>
            </div>
            <h4 className="font-header font-bold text-xs text-white mb-2 tracking-wider">
              <BlurDecrypt text="AGENTE COGNITIVO V3" forceDecrypt={decryptState} />
            </h4>
            <p className="text-xs text-slate-400 font-light mb-4 h-16 overflow-hidden leading-relaxed">
              <BlurDecrypt 
                text="Engine de desenvolvimento inteligente que prevê e resolve gargalos estruturais no código antes mesmo de serem compilados." 
                forceDecrypt={decryptState}
              />
            </p>
            <div className="border-t border-white/[0.02] pt-3 flex justify-between items-center text-[9px] font-mono text-slate-500">
              <span>LATENCY: 0.02MS</span>
              <span className={decryptState ? 'text-emerald-400 font-medium' : 'text-violet-400'}>AES-GCM</span>
            </div>
          </MinimalPanel>

          <MinimalPanel title="SEC_02: GRAVITY" accent={decryptState ? 'green' : 'violet'} statusText="0x3C8F">
            <div className="flex justify-between items-start mb-4">
              <Radio size={22} className={decryptState ? 'text-emerald-400' : 'text-violet-400'} />
              <span className="text-[9px] font-mono text-slate-500">GRAVITY_LENS</span>
            </div>
            <h4 className="font-header font-bold text-xs text-white mb-2 tracking-wider">
              <BlurDecrypt text="GRAVITATIONAL PORTAL" forceDecrypt={decryptState} />
            </h4>
            <p className="text-xs text-slate-400 font-light mb-4 h-16 overflow-hidden leading-relaxed">
              <BlurDecrypt 
                text="Algoritmo de lente gravitacional nativa. Distorce coordenadas estelares ao redor da movimentação do cursor gerando imersão total." 
                forceDecrypt={decryptState}
              />
            </p>
            <div className="border-t border-white/[0.02] pt-3 flex justify-between items-center text-[9px] font-mono text-slate-500">
              <span>STABLE_FPS: 60.0</span>
              <span className={decryptState ? 'text-emerald-400 font-medium' : 'text-violet-400'}>WARP_ON</span>
            </div>
          </MinimalPanel>

          <MinimalPanel title="SEC_03: HYPER_SPEED" accent={decryptState ? 'green' : 'violet'} statusText="0x7D2E">
            <div className="flex justify-between items-start mb-4">
              <Server size={22} className={decryptState ? 'text-emerald-400' : 'text-violet-400'} />
              <span className="text-[9px] font-mono text-slate-500">EDGE_COMPILE</span>
            </div>
            <h4 className="font-header font-bold text-xs text-white mb-2 tracking-wider">
              <BlurDecrypt text="LANDINGS INSTANTÂNEAS" forceDecrypt={decryptState} />
            </h4>
            <p className="text-xs text-slate-400 font-light mb-4 h-16 overflow-hidden leading-relaxed">
              <BlurDecrypt 
                text="Redes neurais compiladas para carregamento na borda da nuvem (Edge CDN) em menos de 0.2 segundos com zero assets blocking." 
                forceDecrypt={decryptState}
              />
            </p>
            <div className="border-t border-white/[0.02] pt-3 flex justify-between items-center text-[9px] font-mono text-slate-500">
              <span>LIGHTHOUSE: 100%</span>
              <span className={decryptState ? 'text-emerald-400 font-medium' : 'text-violet-400'}>LOAD_TIME: 0.18S</span>
            </div>
          </MinimalPanel>

          <MinimalPanel title="SEC_04: OSCILLATOR" accent={decryptState ? 'green' : 'violet'} statusText="0x1A2B">
            <div className="mb-4 h-[30px] relative overflow-hidden flex items-end">
              <svg className="w-full h-full" style={{ stroke: decryptState ? 'var(--accent-green)' : 'var(--accent-violet)', fill: 'none' }}>
                <path d={`M ${wavePoints.map(p => `${p.x},${p.y}`).join(' L ')}`} strokeWidth="1" />
              </svg>
            </div>
            <h4 className="font-header font-bold text-xs text-white mb-2 tracking-wider">
              <BlurDecrypt text="26 ANOS DE AUTORIDADE" forceDecrypt={decryptState} />
            </h4>
            <p className="text-xs text-slate-400 font-light mb-4 h-16 overflow-hidden leading-relaxed">
              <BlurDecrypt 
                text="Mais de duas décadas blindando plataformas robóticas, sistemas financeiros distribuídos e portais integrados com inteligência artificial." 
                forceDecrypt={decryptState}
              />
            </p>
            <div className="border-t border-white/[0.02] pt-3 flex justify-between items-center text-[9px] font-mono text-slate-500">
              <span>EST: 2000_Q1</span>
              <span className={decryptState ? 'text-emerald-400 font-medium' : 'text-violet-400'}>EXPERIENCE: 26Y</span>
            </div>
          </MinimalPanel>

        </div>
      </div>
    </section>
  );
}
