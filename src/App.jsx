import React, { useState, useEffect, useRef } from 'react';
import HUDNavbar from './components/Navigation/HUDNavbar';
import TelemetryFooter from './components/Navigation/TelemetryFooter';
import AntiGravityCanvas from './components/Background/AntiGravityCanvas';
import { 
  FileCode, 
  Terminal as TerminalIcon, 
  Folder, 
  MessageSquare, 
  ChevronRight, 
  Cpu, 
  ShieldCheck, 
  FileJson, 
  FileText, 
  HelpCircle,
  CornerDownLeft,
  User,
  Unlock,
  Lock,
  Eye,
  CheckCircle2,
  Hourglass
} from 'lucide-react';

const FILE_CONTENTS = {
  'Welcome.md': {
    name: 'Welcome.md',
    type: 'markdown',
    icon: <FileText size={12} className="text-violet-400" />,
    lines: [
      '# VOESMART.DEV // CORE',
      '## ENGENHARIA DE SOFTWARE AI AVANÇADA & ARQUITETURA ÚNICA',
      '',
      '========================================================================',
      '💎 AUTORIDADE: 26 ANOS DE MERCADO DESENVOLVENDO SISTEMAS DE ELITE',
      '🚀 SPEED: LANDING PAGES ULTRA RÁPIDAS QUE COMPILAM EM 0.18 SEGUNDOS',
      '🛡️ SECURITY: BLINDAGEM COMPLETA E OFUSCAÇÃO DE DADOS EM NÍVEL Z-K',
      '========================================================================',
      '',
      '### SOBRE A VOESMART',
      'Evoluímos junto com os primórdios da internet. Duas décadas e meia escalando',
      'sistemas críticos, fintechs, bancos e soluções inteligentes com IA nativa.',
      'Nossa engenharia exclusiva é focada em velocidade extrema (100/100 Lighthouse)',
      'e blindagem completa para impedir vazamentos de dados proprietários.',
      '',
      '### DIRETRIZES DE ENGENHARIA',
      '1. COMPILADORES MODULARES: Códigos sem excessos em React e Vite.',
      '2. AI AGENTS INTEGRADOS: Inteligência distribuída em tempo real.',
      '3. ZERO-KNOWLEDGE PROOF: O usuário final navega com segurança absoluta.',
      '',
      '💡 Clique nos arquivos da barra esquerda para auditar nossos códigos fonte!',
      '💬 Utilize o painel lateral direito para interagir com o agente Antigravity.'
    ]
  },
  'QuantumEngine.js': {
    name: 'QuantumEngine.js',
    type: 'code',
    icon: <FileCode size={12} className="text-cyan-400" />,
    lines: [
      '// VoeSmart Neural Acceleration Core v3.0',
      'import { GravityLens } from "antigravity-core";',
      '',
      'export const neuralCore = {',
      '  established: 2000,',
      '  experienceYears: 26,',
      '  performanceRatio: 1.0, // 100/100 Lighthouse',
      '  compileThreshold: "0.18s",',
      '  algorithms: [',
      '    "Polymorphic AI Models",',
      '    "Cognitive Agents",',
      '    "Zero-Assets Routing"',
      '  ]',
      '};',
      '',
      'export function accelerateSystem(payload) {',
      '  const lens = new GravityLens({ radius: 200 });',
      '  console.log("VoeSmart AI accelerating core metrics...");',
      '  ',
      '  return neuralCore.algorithms.map(alg => {',
      '    return lens.warp(`Active: ${alg}`);',
      '  });',
      '}'
    ]
  },
  'ZeroKnowledgeShield.py': {
    name: 'ZeroKnowledgeShield.py',
    type: 'code',
    icon: <FileCode size={12} className="text-emerald-400" />,
    lines: [
      '# VoeSmart Zero-Knowledge Security Shell v2.4',
      'import hashlib',
      'import hmac',
      '',
      'class DataSecurityShield:',
      '    def __init__(self, client_payload):',
      '        self.shield_active = True',
      '        self.experience = 26 # Years of tech authority',
      '        self.cipher_key = hashlib.sha256(b"antigravity").hexdigest()',
      '        self.obfuscated = True',
      '        ',
      '    def protect_sensitive_data(self, client_view):',
      '        if not self.shield_active:',
      '            raise PermissionError("Defenses offline!")',
      '            ',
      '        if client_view.inspect_mode_active:',
      '            # Dynamic character scrambling applied to DOM',
      '            return "[SYSTEM_LOCK: SENSITIVE_DATA_OBFUSCATED]"',
      '            ',
      '        return hmac.new(',
      '            self.cipher_key.encode(),',
      '            client_view.data.encode(),',
      '            hashlib.sha512',
      '        ).hexdigest()'
    ]
  },
  'VoeSmartTimeline.json': {
    name: 'VoeSmartTimeline.json',
    type: 'json',
    icon: <FileJson size={12} className="text-amber-400" />,
    lines: [
      '{',
      '  "VoeSmart": {',
      '    "marketHistory": "26 Years of command",',
      '    "milestones": {',
      '      "2000": "Fundação com foco em infraestruturas distribuídas",',
      '      "2008": "Expansão para arquiteturas de altíssima escala e Fintechs",',
      '      "2016": "Integração pioneira de machine learning e redes generativas",',
      '      "2026": "Lançamento do VoeSmart AI Core com orquestração Antigravity"',
      '    },',
      '    "coreValues": [',
      '      "Performance 100/100 (Google Lighthouse)",',
      '      "Blindagem completa de dados contra scrapers",',
      '      "Compilação estática rápida (0.18 segundos)"',
      '    ]',
      '  }',
      '}'
    ]
  },
  'ContactTerminal.sh': {
    name: 'ContactTerminal.sh',
    type: 'terminal',
    icon: <TerminalIcon size={12} className="text-rose-400" />,
    lines: []
  }
};

const INITIAL_CHAT = [
  { sender: 'agent', message: 'Saudações! Sou o agente neural Antigravity da VoeSmart.dev. Gerencio este ambiente de desenvolvimento de alta escala em tempo real.' },
  { sender: 'agent', message: 'Temos 26 anos de mercado construindo landing pages e sistemas blindados rápidos. Como posso ajudar com seu projeto de software hoje?' }
];

export default function App() {
  const [activeFile, setActiveFile] = useState('Welcome.md');
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState(INITIAL_CHAT);
  const [isThinking, setIsThinking] = useState(false);
  
  // Custom cursor position
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorAuraPos, setCursorAuraPos] = useState({ x: -100, y: -100 });
  const chatEndRef = useRef(null);

  // Shell Terminal states for ContactTerminal.sh
  const [terminalHistory, setTerminalHistory] = useState([
    '⚡ VoeSmart Encrypted Inquiry Shell active...',
    '📡 Estabelecendo canal seguro (TLS 1.3)...',
    '💬 Use "msg <seu texto>" para enviar e-mails diretos ou "help".',
    ''
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const termEndRef = useRef(null);

  // Auto scroll chat and terminal
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, isThinking]);

  useEffect(() => {
    termEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  // Chasing mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // LERP aura trailing
  useEffect(() => {
    let frame;
    const updateAura = () => {
      setCursorAuraPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return { x: prev.x + dx * 0.12, y: prev.y + dy * 0.12 };
      });
      frame = requestAnimationFrame(updateAura);
    };
    updateAura();
    return () => cancelAnimationFrame(frame);
  }, [mousePos]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatLog(prev => [...prev, { sender: 'user', message: userMsg }]);
    setChatInput('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const query = userMsg.toLowerCase();
      let response = '';

      if (query.includes('quem') || query.includes('voesmart') || query.includes('historia')) {
        response = 'A VoeSmart.dev é formada por engenheiros veteranos com 26 anos de mercado tecnológico. Criamos ecossistemas corporativos blindados e landing pages que carregam instantaneamente (0.18s).';
      } else if (query.includes('velocidade') || query.includes('rapida') || query.includes('lighthouse')) {
        response = 'Nossas landing pages utilizam compilação enxuta em Vite + Vanilla CSS, eliminando gargalos de renderização para garantir 100/100 no Google Lighthouse em qualquer dispositivo.';
      } else if (query.includes('seguranca') || query.includes('dados') || query.includes('ofuscador')) {
        response = 'Protegemos os dados proprietários por meio de criptografia Zero-Knowledge e ofuscação visual. Se algum scraper tentar varrer o site, os dados são embaralhados instantaneamente!';
      } else if (query.includes('contato') || query.includes('email') || query.includes('contratar')) {
        response = 'Excelente! Você pode falar conosco abrindo o arquivo "ContactTerminal.sh" na barra esquerda do painel e enviando sua mensagem direta na linha de comando.';
      } else if (query.includes('antigravity') || query.includes('ide')) {
        response = 'O conceito Antigravity representa nossa engenharia fluida, limpa e autônoma, onde os dados de desenvolvimento e as interfaces se moldam perfeitamente às ações do usuário.';
      } else {
        response = `Recebido! Entendi seu ping sobre "${userMsg}". Nossa equipe de engenharia com 26 anos de experiência está pronta para escalar sua ideia. Para enviar sua proposta oficial, recomendo preencher o "ContactTerminal.sh" à esquerda!`;
      }

      setChatLog(prev => [...prev, { sender: 'agent', message: response }]);
    }, 1500);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const trimmed = terminalInput.trim();
    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let res = [`$ ${trimmed}`];

    if (command === 'help') {
      res.push('------------------------------------------------');
      res.push('COMANDOS DISPONÍVEIS:');
      res.push('  about       - Sobre os 26 anos de mercado da VoeSmart');
      res.push('  tech        - Arquitetura de landing pages e AI');
      res.push('  msg <texto> - Envia email direto de contato');
      res.push('  clear       - Limpa a tela do terminal');
      res.push('------------------------------------------------');
    } else if (command === 'about') {
      res.push('VoeSmart.dev - Fundada em 2000.');
      res.push('26 Anos liderando desenvolvimento corporativo seguro de alta performance.');
    } else if (command === 'tech') {
      res.push('Stack VoeSmart: React/Vite SPA, Vanilla CSS, Zero-Assets Compiling, AI Agents.');
    } else if (command === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (command === 'msg') {
      if (!args) {
        res.push('🚨 ERRO: Sintaxe incorreta. Use: msg <sua mensagem>');
      } else {
        res.push('📡 Conectando ao canal seguro VoeSmart...');
        res.push('🛡️ Criptografando conteúdo via ZK-routing...');
        res.push('🚀 PROPOSTA ENVIADA COM SUCESSO!');
        res.push(`  [CONTEÚDO]: "${args}"`);
        res.push('  Nossos engenheiros chefes retornarão em instantes.');
      }
    } else {
      res.push(`🚨 Comando inválido: "${command}". Digite "help".`);
    }

    setTerminalHistory(prev => [...prev, ...res, '']);
    setTerminalInput('');
  };

  const activeFileData = FILE_CONTENTS[activeFile];
  const fileLines = activeFileData.lines;

  // Render code line syntax coloring
  const formatCodeLine = (line, index) => {
    if (activeFile === 'Welcome.md') {
      if (line.startsWith('#')) return <span className="text-violet-400 font-bold text-sm select-none">{line}</span>;
      if (line.startsWith('=')) return <span className="text-slate-600 select-none">{line}</span>;
      if (line.includes('💎') || line.includes('🚀') || line.includes('🛡️')) return <span className="text-emerald-400 font-medium">{line}</span>;
      return <span className="text-slate-300 font-light">{line}</span>;
    }

    // Highlighting parser
    let tokens = [];
    const keywords = ['import', 'from', 'export', 'const', 'function', 'return', 'new', 'class', 'def', 'if', 'not', 'raise', 'import', 'b', 'b"', 'class', 'import'];
    const parts = line.split(/(\s+|,|\.|\(|\)|\{|\}|\[|\]|;|"|')/);

    let inString = false;
    let stringChar = '';
    let stringBuffer = '';

    parts.forEach((p, k) => {
      if (!p) return;
      if (p === '"' || p === "'") {
        if (!inString) {
          inString = true;
          stringChar = p;
          stringBuffer = p;
        } else if (stringChar === p) {
          inString = false;
          stringBuffer += p;
          tokens.push(<span key={k} className="token-string">{stringBuffer}</span>);
          stringBuffer = '';
        } else {
          stringBuffer += p;
        }
        return;
      }

      if (inString) {
        stringBuffer += p;
        return;
      }

      if (keywords.includes(p.trim())) {
        tokens.push(<span key={k} className="token-keyword">{p}</span>);
      } else if (!isNaN(p.trim()) && p.trim() !== '') {
        tokens.push(<span key={k} className="token-number">{p}</span>);
      } else if (p.startsWith('//') || p.startsWith('#')) {
        tokens.push(<span key={k} className="token-comment">{p}</span>);
      } else if (p.trim() === 'console' || p.trim() === 'accelerateSystem' || p.trim() === 'protect_sensitive_data') {
        tokens.push(<span key={k} className="token-function">{p}</span>);
      } else if (p.trim() === 'DataSecurityShield' || p.trim() === 'GravityLens') {
        tokens.push(<span key={k} className="token-class">{p}</span>);
      } else {
        tokens.push(<span key={k} className="code-text">{p}</span>);
      }
    });

    if (inString) {
      tokens.push(<span key="str-err" className="token-string">{stringBuffer}</span>);
    }

    return <div className="flex">{tokens}</div>;
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-violet-500/30 selection:text-violet-200 overflow-hidden font-sans">
      
      {/* 🌀 Gravitational Particle Background */}
      <AntiGravityCanvas />

      {/* 🌌 Extreme low opacity morphing nebula */}
      <div className="cosmic-ide-nebula w-[40vw] h-[40vw] bg-violet-500/5 top-20 left-20 blur-[100px]" />
      <div className="cosmic-ide-nebula w-[35vw] h-[35vw] bg-emerald-500/5 bottom-20 right-20 blur-[100px]" />

      {/* 🎯 Cosmic cursor aura */}
      <div className="cosmic-cursor hidden md:block" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} />
      <div className="cosmic-cursor-aura hidden md:block" style={{ left: `${cursorAuraPos.x}px`, top: `${cursorAuraPos.y}px` }} />

      {/* Main IDE Container */}
      <div className="ide-wrapper">
        
        {/* TOPBAR */}
        <HUDNavbar isDecrypted={isDecrypted} setIsDecrypted={setIsDecrypted} />

        {/* CONTAINER SPLIT */}
        <div className="ide-main-container">
          
          {/* COLUMN 1: LEFT WORKSPACE EXP */}
          <aside className="ide-sidebar select-none">
            <div className="sidebar-title">VoeSmart Workspace</div>
            
            <div className="px-4 py-3 flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              <Folder size={11} className="text-violet-400" />
              <span>voesmart-core-ai</span>
            </div>

            <div className="flex-grow">
              {Object.keys(FILE_CONTENTS).map((fName) => {
                const fData = FILE_CONTENTS[fName];
                const isActive = activeFile === fName;
                return (
                  <div 
                    key={fName}
                    onClick={() => {
                      setActiveFile(fName);
                      // Auto-reset decrypt state on file change to show security protection
                      setIsDecrypted(false);
                    }}
                    className={`file-tree-node cursor-pointer ${isActive ? 'active' : ''}`}
                  >
                    {fData.icon}
                    <span>{fData.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Quick Metrics Badge */}
            <div className="p-4 border-t border-white/[0.02] font-mono text-[9px] text-slate-500 space-y-1 bg-black/10">
              <div className="flex justify-between">
                <span>ESTABLISHED:</span>
                <span className="text-slate-300">2000</span>
              </div>
              <div className="flex justify-between">
                <span>EXP_MARKET:</span>
                <span className="text-violet-400">26 YEARS</span>
              </div>
              <div className="flex justify-between">
                <span>AUDIT_SHELL:</span>
                <span className="text-emerald-400">SECURE</span>
              </div>
            </div>
          </aside>

          {/* COLUMN 2: MIDDLE EDITOR VIEWPORT */}
          <main className="ide-editor-panel relative">
            
            {/* Editor tab bar */}
            <div className="editor-tabbar select-none">
              <div className="editor-tab active">
                {activeFileData.icon}
                <span>{activeFileData.name}</span>
              </div>
            </div>

            {/* Actual code display viewport */}
            <div className="editor-viewport scrollbar">
              {activeFileData.type === 'terminal' ? (
                /* ContactTerminal.sh Shell Frame */
                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-1 font-mono text-xs overflow-y-auto max-h-[calc(100vh-180px)] pr-2 scrollbar">
                    {terminalHistory.map((line, index) => {
                      let col = 'text-emerald-400';
                      if (line.startsWith('$')) col = 'text-cyan-400 font-bold';
                      else if (line.startsWith('🚨')) col = 'text-red-400';
                      else if (line.startsWith('⚡') || line.startsWith('📡')) col = 'text-violet-400';
                      return (
                        <div key={index} className={col}>
                          {line}
                        </div>
                      );
                    })}
                    <div ref={termEndRef} />
                  </div>
                  
                  {/* Prompt terminal submit */}
                  <form onSubmit={handleTerminalSubmit} className="flex border-t border-white/[0.04] pt-3 items-center mt-3">
                    <span className="font-mono text-xs text-violet-400 mr-2">$</span>
                    <input 
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Digite 'help' ou preencha: msg <mensagem>..."
                      className="flex-grow bg-transparent border-none text-emerald-400 placeholder-emerald-950 font-mono text-xs focus:outline-none focus:ring-0"
                      autoFocus
                    />
                    <button type="submit" className="text-violet-400 hover:text-emerald-400 transition-colors">
                      <CornerDownLeft size={14} />
                    </button>
                  </form>
                </div>
              ) : (
                /* Code display lines */
                <div className="relative">
                  
                  {/* Dynamic security laser scanning sweep */}
                  {!isDecrypted && activeFileData.type !== 'markdown' && (
                    <div className="absolute inset-0 editor-blur-overlay flex items-center justify-center select-none z-20">
                      <div className="text-center p-6 border border-white/5 rounded-xl bg-[#030307]/80 backdrop-blur-md max-w-sm">
                        <Lock size={20} className="text-violet-400 mx-auto mb-3 animate-pulse" />
                        <h4 className="font-header font-bold text-xs tracking-wider text-white mb-2">CÓDIGO PROTEGIDO (Z-K)</h4>
                        <p className="text-[10px] text-slate-400 font-light mb-4 leading-relaxed">
                          Nossos algoritmos exclusivos e dados estão ofuscados por segurança. Clique no botão de bypass para auditar o código.
                        </p>
                        <button 
                          onClick={() => setIsDecrypted(true)}
                          className="px-4 py-2 rounded-full border border-violet-500/20 bg-violet-950/20 hover:bg-violet-950/40 text-violet-400 hover:text-white transition-all text-[9px] font-sans tracking-widest flex items-center gap-1.5 mx-auto"
                        >
                          <Unlock size={10} />
                          DECRIPTAR_SITE
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Laser line overlay during scanner sweep */}
                  {isDecrypted && activeFileData.type !== 'markdown' && (
                    <div 
                      className="absolute left-0 w-full h-[1px] laser-sweep z-20 pointer-events-none"
                      style={{
                        animation: 'laser-scan 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                      }}
                    />
                  )}

                  {/* Rendered lines */}
                  <div className="space-y-1">
                    {fileLines.map((line, idx) => (
                      <div key={idx} className="code-line">
                        <span className="line-number">{idx + 1}</span>
                        <div className="flex-grow">
                          {formatCodeLine(line, idx)}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>

            {/* Neon background keyframe animation */}
            <style>{`
              @keyframes laser-scan {
                0% { top: 0%; opacity: 0; }
                10% { opacity: 0.8; }
                90% { opacity: 0.8; }
                100% { top: 100%; opacity: 0; }
              }
            `}</style>

          </main>

          {/* COLUMN 3: RIGHT AI AGENT COMMAND PANEL */}
          <aside className="ide-agent-panel select-none">
            
            {/* Agent profile title */}
            <div className="agent-profile">
              <div className="agent-avatar">
                AG
                <span className="agent-status-dot"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold font-sans text-white tracking-wide">VoeSmart Antigravity</span>
                <span className="text-[8px] font-mono text-emerald-400 tracking-wider">ACTIVE_AGENT: ONLINE</span>
              </div>
            </div>

            {/* Chat message history logs */}
            <div className="agent-chat-history scrollbar select-text">
              {chatLog.map((chat, idx) => (
                <div 
                  key={idx} 
                  className={`chat-bubble ${chat.sender === 'agent' ? 'agent' : 'user'}`}
                >
                  <div className="font-sans text-[11px] leading-relaxed">
                    {chat.message}
                  </div>
                </div>
              ))}
              
              {/* Thinking simulation */}
              {isThinking && (
                <div className="chat-bubble agent flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Running developer task threads */}
            <div className="agent-task-queue">
              <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                <span>Active Task Threads</span>
                <span className="text-violet-400">4 ACTIVE</span>
              </div>
              
              <div className="task-item">
                <CheckCircle2 size={10} className="text-emerald-400" />
                <span>INIT_NEURAL_CORE (0.18s)</span>
              </div>
              <div className="task-item">
                <CheckCircle2 size={10} className="text-emerald-400" />
                <span>INJECT_ZK_SHIELD_AUTH</span>
              </div>
              <div className="task-item">
                <CheckCircle2 size={10} className="text-emerald-400" />
                <span>LOAD_26Y_TECH_ASSETS</span>
              </div>
              <div className="task-item">
                {isThinking ? (
                  <Hourglass size={10} className="text-violet-400 animate-spin" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full border border-slate-600 animate-pulse"></div>
                )}
                <span className={isThinking ? 'text-violet-400' : 'text-slate-400'}>
                  {isThinking ? 'COMPILING_CLIENT_QUERY' : 'AWAITING_HUMAN_PROMPT'}
                </span>
              </div>
            </div>

            {/* Interactive Chat Prompt footer */}
            <div className="agent-chat-input-wrapper">
              <form onSubmit={handleChatSubmit} className="agent-chat-input-form select-text">
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Pergunte à IA (ex: 'segurança', 'velocidade', 'anos')..."
                  className="agent-chat-input"
                />
                <button type="submit" className="text-violet-400 hover:text-white transition-colors pl-1">
                  <CornerDownLeft size={14} />
                </button>
              </form>
            </div>

          </aside>

        </div>

        {/* BOTTOMBAR STATUS STATUS */}
        <TelemetryFooter />

      </div>

    </div>
  );
}
