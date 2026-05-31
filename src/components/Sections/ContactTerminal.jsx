import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, ShieldAlert, Cpu } from 'lucide-react';

const INITIAL_WELCOME = [
  '⚡ INTERFACE TERMINAL VOESMART V1.9.27 ACTIVE...',
  '🛰️ ESTABLISHING ORBITAL TELEMETRY LINKS...',
  '🛡️ SECURE ENCRYPTED ENVELOPE ESTABLISHED (TLS 1.3)',
  '💬 Digite "help" para ver a lista de comandos ou envie uma mensagem.',
  ''
];

export default function ContactTerminal() {
  const [history, setHistory] = useState(INITIAL_WELCOME);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let response = [];
    response.push(`> ${trimmed}`);

    switch (command) {
      case 'help':
        response.push('==================================================');
        response.push('COMANDOS DISPONÍVEIS:');
        response.push('  about         - Sobre a história e 26 anos de mercado da VoeSmart');
        response.push('  tech          - Arquitetura de landing pages e AI da empresa');
        response.push('  clear         - Limpa o histórico do terminal');
        response.push('  msg <texto>   - Envia um ping/mensagem criptografada de contato');
        response.push('  decrypt       - Executa simulação de descriptografia total');
        response.push('==================================================');
        break;
      case 'about':
        response.push('--------------------------------------------------');
        response.push('VOESMART.DEV - Engenharia de Software AI Avançada');
        response.push('Fundada por veteranos com 26 anos de mercado tecnológico.');
        response.push('Especialistas em arquiteturas distribuídas, segurança');
        response.push('defensiva extrema e interfaces imersivas de alta velocidade.');
        response.push('Missão: Desenvolver softwares únicos e landing pages');
        response.push('incomparáveis que encantam e convertem com segurança.');
        response.push('--------------------------------------------------');
        break;
      case 'tech':
        response.push('⚙️ STACK DE TECNOLOGIA VOESMART CORE:');
        response.push('  - Front-end: Vanilla CSS modular, React + Vite SPA');
        response.push('  - AI Core: Modelos Generativos avançados e Agentes Autônomos');
        response.push('  - Speed: Otimização de Assets, 100/100 Core Web Vitals');
        response.push('  - Security: Ofuscação de dados e comunicação em ZK-Routing');
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'decrypt':
        response.push('🔓 DECLASSIFY TRIGGERED...');
        response.push('  [████████████████] 100% Core Descriptografado.');
        response.push('  VoeSmart.dev é o ápice da engenharia brasileira.');
        break;
      case 'msg':
        if (!args) {
          response.push('🚨 ERRO: Sintaxe incorreta. Use: msg <sua mensagem ou email>');
        } else {
          response.push('🛰️ Conectando com a rede quantum de VoeSmart...');
          response.push('🛡️ Criptografando conteúdo com chave pública do servidor...');
          response.push('🚀 MENSAGEM DESPACHADA COM SUCESSO!');
          response.push(`  [CONTEÚDO]: "${args}"`);
          response.push('  (Nosso agente neural retornará a resposta em instantes).');
        }
        break;
      default:
        response.push(`🚨 Comando não reconhecido: "${command}". Digite "help" para ajuda.`);
    }

    setHistory((prev) => [...prev, ...response, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    executeCommand(inputValue);
    setInputValue('');
  };

  return (
    <section id="contact" className="py-20 relative z-10 container mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-4 animate-pulse">
          <Terminal size={12} />
          COMANDO DE CANAL ATIVO
        </div>
        <h2 className="text-3xl md:text-5xl font-hud text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 tracking-wider">
          Terminal de Contato
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mt-4 font-body">
          Interaja com nosso núcleo de comunicações digitais. Envie uma mensagem direta usando a linha de comando abaixo para falar com nossos engenheiros chefes.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="terminal-window">
          {/* Terminal Top Bar */}
          <div className="terminal-header">
            <div className="terminal-dots">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
            </div>
            <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              voesmart@core-terminal: ~
            </div>
            <div></div> {/* spacer */}
          </div>

          {/* Terminal Console Stream */}
          <div className="terminal-body h-[320px] overflow-y-auto scrollbar flex flex-col bg-slate-950/90" style={{ borderBottom: '1px solid rgba(0, 240, 255, 0.15)' }}>
            <div className="flex-grow space-y-1">
              {history.map((line, index) => {
                let colorClass = 'text-emerald-400';
                if (line.startsWith('>')) colorClass = 'text-cyan-400 font-bold';
                else if (line.startsWith('🚨')) colorClass = 'text-red-400 font-bold';
                else if (line.startsWith('🛡️') || line.startsWith('⚡')) colorClass = 'text-purple-400';
                else if (line.startsWith('=')) colorClass = 'text-slate-600';
                
                return (
                  <div key={index} className={`font-mono text-xs leading-relaxed ${colorClass}`}>
                    {line}
                  </div>
                );
              })}
              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Terminal Prompt Form */}
          <form onSubmit={handleSubmit} className="flex bg-slate-950/90 items-center px-4 py-3">
            <span className="font-mono text-xs text-cyan-400 mr-2 font-bold">$</span>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite 'help' ou envie mensagem com 'msg <conteúdo>'..."
              className="flex-grow bg-transparent border-none text-emerald-400 placeholder-emerald-900 font-mono text-xs focus:outline-none focus:ring-0"
              autoComplete="off"
              autoFocus
            />
            <button 
              type="submit" 
              className="text-cyan-400 hover:text-emerald-400 transition-colors p-1"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
