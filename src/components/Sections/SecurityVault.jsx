import React, { useState, useEffect } from 'react';
import TelemetryPanel from '../HUD/TelemetryPanel';
import DecryptText from '../HUD/DecryptText';
import { Lock, Unlock, ShieldAlert, Cpu, EyeOff, Radio, Server, Terminal } from 'lucide-react';

export default function SecurityVault({ forceDecryptAll = false }) {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [sysLog, setSysLog] = useState([]);
  const [pulseLine, setPulseLine] = useState([]);

  // Generate SVG telemetry line points
  useEffect(() => {
    const points = Array.from({ length: 30 }, (_, i) => ({
      x: (i * 10),
      y: 40 + Math.sin(i * 0.8) * 15 + Math.random() * 10
    }));
    setPulseLine(points);

    const interval = setInterval(() => {
      setPulseLine(prev => {
        const next = [...prev.slice(1)];
        const nextX = prev[prev.length - 1].x + 10;
        next.push({
          x: nextX,
          y: 40 + Math.sin(nextX * 0.8) * 15 + Math.random() * 10
        });
        // normalize X positions to loop smoothly
        return next.map((pt, idx) => ({ x: idx * 10, y: pt.y }));
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // System status log stream
  useEffect(() => {
    const logs = [
      '⚡ [SYS_INIT] VoeSmart Alien HUD Secure Core active...',
      '🛡️ [AUTH] ZK-SNARK Shield layer online (256-bit encryption)',
      '🛰️ [CONNECT] Active link to Deep-Space Neural Grid',
      '🔒 [ALERT] Core database obfuscated from client inspector',
    ];
    setSysLog(logs);

    const logInterval = setInterval(() => {
      const messages = [
        '🛡️ [SEC_SHIELD] Intercepted scraper request at port 443',
        '⚙️ [COMPILER] Compiling polymorphic runtime templates',
        '🧬 [NEURAL] Repelling gravity distortion anomalies...',
        '🛰️ [ORBITAL] Real-time telemetry synched with node-0x2A',
        '⚡ [CORE] Active load-balancing at 0.004ms response threshold',
        '🔒 [CYPHER] Dynamic data re-sharded across multi-sig rings'
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setSysLog(prev => [randomMsg, ...prev.slice(0, 4)]);
    }, 4000);

    return () => clearInterval(logInterval);
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'antigravity' || passcode === '26' || passcode === '1337') {
      setIsUnlocked(true);
      setSysLog(prev => ['🔓 [AUTH_SUCCESS] Complete core declassification granted.', ...prev]);
    } else {
      setSysLog(prev => ['🚨 [AUTH_FAIL] Unauthorized passcode signature detected!', ...prev]);
      setPasscode('');
    }
  };

  const decryptState = forceDecryptAll || isUnlocked;

  return (
    <section id="security" className="py-20 relative z-10 container mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 font-mono text-xs tracking-widest uppercase mb-4 animate-pulse">
          <EyeOff size={12} />
          PROTETOR DE DADOS ATIVO
        </div>
        <h2 className="text-3xl md:text-5xl font-hud text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-400 tracking-wider">
          Núcleo de Segurança Alien
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mt-4 font-body text-base">
          Temos 26 anos de história desenvolvendo códigos inquebráveis. Nosso site protege e oculta dados de curiosos, demonstrando robustez em performance de carregamento rápido sob zero vulnerabilidades.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Lock Panel & Biometric Passcode */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <TelemetryPanel title="CONTROL_LOCK" theme={decryptState ? 'green' : 'purple'} statusText={decryptState ? 'DECLASSIFIED' : 'RESTRICTED'}>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 mb-4 transition-all duration-500 ${decryptState ? 'border-emerald-400 bg-emerald-950/20 text-emerald-400 var(--glow-green)' : 'border-purple-400 bg-purple-950/20 text-purple-400 var(--glow-purple)'}`} style={decryptState ? { boxShadow: 'var(--glow-green)' } : { boxShadow: 'var(--glow-purple)' }}>
                {decryptState ? <Unlock size={28} className="animate-bounce" /> : <Lock size={28} />}
              </div>
              <h4 className="font-hud font-bold text-sm tracking-widest text-slate-100 mb-2">
                {decryptState ? 'ACESSO TOTAL CONCEDIDO' : 'DADOS CRIPTOGRAFADOS'}
              </h4>
              <p className="text-xs text-slate-400 mb-6 max-w-[200px] leading-relaxed">
                {decryptState 
                  ? 'Os algoritmos proprietários de AI e Engenharia Única estão revelados.' 
                  : 'Insira o código de autorização corporativa para revelar os bastidores.'}
              </p>

              {!decryptState && (
                <form onSubmit={handleAuth} className="w-full">
                  <div className="relative mb-3">
                    <input 
                      type="password" 
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="INSIRA: antigravity" 
                      className="w-full bg-slate-950/80 border border-purple-500/30 text-purple-400 placeholder-purple-800 rounded font-mono text-center text-xs py-2 px-3 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full neon-btn purple py-2 text-xs flex justify-center items-center gap-2"
                  >
                    <Terminal size={12} />
                    VALIDAR CREDENCIAL
                  </button>
                </form>
              )}

              {decryptState && (
                <button 
                  onClick={() => setIsUnlocked(false)} 
                  className="w-full neon-btn green py-2 text-xs"
                >
                  RE-ATIVAR SISTEMA DE DEFESA
                </button>
              )}
            </div>
          </TelemetryPanel>

          <TelemetryPanel title="REALTIME_DIAGNOSTIC" theme="purple" statusText="STREAMING">
            <div className="font-mono text-xs space-y-2 max-h-[160px] overflow-y-auto pr-2 scrollbar">
              {sysLog.map((log, index) => (
                <div key={index} className={`border-b border-slate-900/60 pb-1.5 leading-relaxed text-[10px] ${log.includes('🚨') || log.includes('🔒') ? 'text-purple-400' : 'text-emerald-400'}`}>
                  {log}
                </div>
              ))}
            </div>
          </TelemetryPanel>
        </div>

        {/* Right Column: Encrypted Shards (Decrypted on Hover or Clearance) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <TelemetryPanel title="SHARD_01: AI_ENGINE" theme={decryptState ? 'green' : 'cyan'} statusText="0x9A4B">
            <div className="flex justify-between items-start mb-3">
              <Cpu size={24} className={decryptState ? 'text-emerald-400' : 'text-cyan-400'} />
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 block">ENVELOPE</span>
                <span className="text-[10px] font-mono text-slate-300">POLYMORPHIC_MODEL</span>
              </div>
            </div>
            <h4 className="font-hud font-bold text-xs text-white mb-2 tracking-wider">
              <DecryptText text="AGENTE COGNITIVO V3" forceDecrypt={decryptState} />
            </h4>
            <p className="text-xs text-slate-400 mb-4 h-16 overflow-hidden leading-relaxed">
              <DecryptText 
                text="Engine de desenvolvimento automatizado que acelera o ciclo de compilação em 10x, prevendo vulnerabilidades no código antes mesmo de serem escritas." 
                forceDecrypt={decryptState}
                speed={20}
              />
            </p>
            <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>LATENCY: 0.02MS</span>
              <span className={decryptState ? 'text-emerald-400' : 'text-cyan-400'}>ENCRYPT_LEVEL: AES-GCM</span>
            </div>
          </TelemetryPanel>

          <TelemetryPanel title="SHARD_02: GRAVITY_CORE" theme={decryptState ? 'green' : 'cyan'} statusText="0x3C8F">
            <div className="flex justify-between items-start mb-3">
              <Radio size={24} className={decryptState ? 'text-emerald-400' : 'text-cyan-400'} />
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 block">FIELD</span>
                <span className="text-[10px] font-mono text-slate-300">CURSOR_MAGNETIC</span>
              </div>
            </div>
            <h4 className="font-hud font-bold text-xs text-white mb-2 tracking-wider">
              <DecryptText text="GRAVITATIONAL HUD LAYOUT" forceDecrypt={decryptState} />
            </h4>
            <p className="text-xs text-slate-400 mb-4 h-16 overflow-hidden leading-relaxed">
              <DecryptText 
                text="Interface inovadora baseada no antigravity. Controla renderizações responsivas que flutuam ao redor do mouse, otimizando o engajamento através de física quântica nativa." 
                forceDecrypt={decryptState}
                speed={20}
              />
            </p>
            <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>FPS: 60.0 (STABLE)</span>
              <span className={decryptState ? 'text-emerald-400' : 'text-cyan-400'}>REPULSION_RADIUS: 180PX</span>
            </div>
          </TelemetryPanel>

          <TelemetryPanel title="SHARD_03: HYPER_LOADER" theme={decryptState ? 'green' : 'cyan'} statusText="0x7D2E">
            <div className="flex justify-between items-start mb-3">
              <Server size={24} className={decryptState ? 'text-emerald-400' : 'text-cyan-400'} />
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 block">BANDWIDTH</span>
                <span className="text-[10px] font-mono text-slate-300">EDGE_CDN_ROUTING</span>
              </div>
            </div>
            <h4 className="font-hud font-bold text-xs text-white mb-2 tracking-wider">
              <DecryptText text="LANDINGS ULTRA RÁPIDAS" forceDecrypt={decryptState} />
            </h4>
            <p className="text-xs text-slate-400 mb-4 h-16 overflow-hidden leading-relaxed">
              <DecryptText 
                text="Nossa tecnologia de carregamento em 0.2 segundos com Zero Assets Blocking, consolidando o maior índice Lighthouse e Core Web Vitals do ecossistema de software." 
                forceDecrypt={decryptState}
                speed={20}
              />
            </p>
            <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>LIGHTHOUSE: 100/100</span>
              <span className={decryptState ? 'text-emerald-400' : 'text-cyan-400'}>LOAD_TIME: 0.18S</span>
            </div>
          </TelemetryPanel>

          <TelemetryPanel title="SHARD_04: SYSTEM_TELEMETRY" theme={decryptState ? 'green' : 'cyan'} statusText="0x1A2B">
            <div className="mb-3 h-[40px] relative overflow-hidden flex items-end">
              {/* Oscillation Wave SVG */}
              <svg className="w-full h-full" style={{ stroke: decryptState ? 'var(--accent-green)' : 'var(--accent-cyan)', fill: 'none' }}>
                <path d={`M ${pulseLine.map(p => `${p.x},${p.y}`).join(' L ')}`} strokeWidth="1.5" />
              </svg>
            </div>
            <h4 className="font-hud font-bold text-xs text-white mb-2 tracking-wider">
              <DecryptText text="26 ANOS DE MERCADO DE TECH" forceDecrypt={decryptState} />
            </h4>
            <p className="text-xs text-slate-400 mb-4 h-16 overflow-hidden leading-relaxed">
              <DecryptText 
                text="Nossa engenharia evolui desde os primórdios da internet. Duas décadas e meia escalando e blindando sistemas governamentais, financeiros e robóticos de ponta." 
                forceDecrypt={decryptState}
                speed={20}
              />
            </p>
            <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>EXPERIENCE: 26 YEARS</span>
              <span className={decryptState ? 'text-emerald-400' : 'text-cyan-400'}>CORE_ARCH: BLIND_SHELL</span>
            </div>
          </TelemetryPanel>

        </div>
      </div>
    </section>
  );
}
