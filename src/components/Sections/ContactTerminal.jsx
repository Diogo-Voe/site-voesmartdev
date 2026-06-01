import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send } from 'lucide-react';

const INITIAL_WELCOME = [
  '⚡ INTERFACE TERMINAL VOESMART V2.0.0 ACTIVE...',
  '📡 ESTABLISHING ORBITAL TELEMETRY LINKS...',
  '🛡️ SECURE ENCRYPTED ENVELOPE ESTABLISHED (TLS 1.3)',
  '💬 Digite "help" para ver a lista de comandos ou envie uma mensagem.',
  ''
];

export default function ContactTerminal() {
  const [history, setHistory] = useState(INITIAL_WELCOME);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef(null);

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
        response.push('--------------------------------------------------');
        response.push('COMANDOS DISPONÍVEIS:');
        response.push('  about         - Sobre a história e 26 anos de mercado da VoeSmart');
        response.push('  tech          - Arquitetura de landing pages e AI da empresa');
        response.push('  clear         - Limpa o histórico do terminal');
        response.push('  msg <texto>   - Envia um ping/mensagem criptografada de contato');
        response.push('  decrypt       - Executa simulação de descriptografia total');
        response.push('--------------------------------------------------');
        break;
      case 'about':
        response.push('--------------------------------------------------');
        response.push('VOESMART.DEV - Engenharia de Software AI Avançada');
        response.push('Fundada por veteranos com 26 anos de mercado tecnológico.');
        response.push('Especialistas em arquiteturas distribuídas, segurança');
        response.push('defensiva extrema e interfaces imersivas de alta velocidade.');
        response.push('--------------------------------------------------');
        break;
      case 'tech':
        response.push('📡 STACK DE TECNOLOGIA VOESMART CORE:');
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
          response.push('📡 Conectando com a rede quantum de VoeSmart...');
          response.push('🛡️ Criptografando conteúdo com chave pública do servidor...');
          response.push('🚀 MENSAGEM ENVIADA COM SUCESSO!');
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
    <section id="contact" className="py-24 relative z-10 container mx-auto px-6 md:px-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/10 text-emerald-400 font-mono text-[9px] tracking-[0.2em] uppercase mb-5 animate-pulse">
          <Terminal size={11} />
          CANAL DE COMUNICAÇÃO SEGURO
        </div>
        <h2 className="text-3xl md:text-5xl font-header text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight">
          Terminal de Inquéritos
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mt-4 font-body font-light text-base leading-relaxed">
          Comunique-se diretamente com nossos engenheiros chefe. Digite comandos ou despache sua mensagem criptografada pelo terminal de comandos flutuante.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="cosmic-terminal">
          {/* Top Bar */}
          <div className="cosmic-terminal-header">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
            </div>
            <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase">
              voesmart@quantum-terminal: ~
            </span>
            <div></div>
          </div>

          {/* Console Area */}
          <div className="cosmic-terminal-body h-[300px] overflow-y-auto scrollbar flex flex-col" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
            <div className="flex-grow space-y-1">
              {history.map((line, index) => {
                let colorClass = 'text-slate-400';
                if (line.startsWith('>')) colorClass = 'text-violet-400 font-medium';
                else if (line.startsWith('🚨')) colorClass = 'text-red-400';
                else if (line.startsWith('🛡️') || line.startsWith('⚡') || line.startsWith('📡')) colorClass = 'text-emerald-400/80';
                else if (line.startsWith('-')) colorClass = 'text-slate-600';
                
                return (
                  <div key={index} className={`font-mono text-xs leading-relaxed ${colorClass}`}>
                    {line}
                  </div>
                );
              })}
              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Prompt Input */}
          <form onSubmit={handleSubmit} className="flex bg-[#04040a]/40 items-center px-5 py-4">
            <span className="font-mono text-xs text-violet-400 mr-2 font-bold">$</span>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite 'help' ou use 'msg <seu email>'..."
              className="flex-grow bg-transparent border-none text-emerald-400 placeholder-emerald-950 font-mono text-xs focus:outline-none focus:ring-0"
              autoComplete="off"
            />
            <button 
              type="submit" 
              className="text-violet-400 hover:text-emerald-400 transition-colors p-1"
            >
              <Send size={13} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
