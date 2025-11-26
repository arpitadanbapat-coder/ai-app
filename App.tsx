import React, { useState, useRef, useEffect } from 'react';
import { Message, ResearchLevel } from './types';
import { streamGeminiResponse } from './services/geminiService';
import { Icons, APP_NAME } from './constants';
import { Button } from './components/Button';
import { ResearchSelector } from './components/ResearchSelector';
import { MessageBubble } from './components/MessageBubble';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Greetings. I am Veritas. Select your research depth required for today's inquiry.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [researchLevel, setResearchLevel] = useState<ResearchLevel>(ResearchLevel.MODERATE);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Create placeholder for AI response
    const aiMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: aiMsgId,
      role: 'model',
      text: '', // Start empty for streaming
      isThinking: true,
      timestamp: Date.now()
    }]);

    await streamGeminiResponse(
      userMsg.text,
      messages, // Pass full history
      researchLevel,
      (partialText) => {
        setMessages(prev => prev.map(msg => 
          msg.id === aiMsgId 
            ? { ...msg, text: partialText, isThinking: false } 
            : msg
        ));
      },
      (fullText, sources) => {
        setMessages(prev => prev.map(msg => 
          msg.id === aiMsgId 
            ? { ...msg, text: fullText, sources: sources, isThinking: false } 
            : msg
        ));
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="flex flex-col h-screen w-full bg-obsidian text-gray-200 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-deep_teal/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-neon/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-obsidian/80 backdrop-blur-lg">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
               <Icons.Logo />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-[0.2em] text-white font-mono">{APP_NAME}</h1>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse shadow-[0_0_8px_#66FCF1]"></div>
                 <span className="text-[10px] uppercase text-neon/70 tracking-widest">System Online</span>
              </div>
            </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 relative z-10 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 scroll-smooth">
        <div className="max-w-4xl mx-auto min-h-full flex flex-col justify-end">
           {messages.length === 0 && (
             <div className="flex flex-col items-center justify-center h-[50vh] opacity-50">
               <Icons.Logo />
               <p className="mt-4 font-mono text-sm text-gray-500">Initiate Research Protocol</p>
             </div>
           )}
           
           {messages.map((msg) => (
             <MessageBubble key={msg.id} message={msg} />
           ))}
           <div ref={bottomRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="relative z-20 p-4 pb-8 bg-gradient-to-t from-obsidian via-obsidian to-transparent">
        <div className="max-w-4xl mx-auto">
          
          <ResearchSelector 
            currentLevel={researchLevel} 
            onSelect={setResearchLevel} 
            disabled={isLoading}
          />

          <form onSubmit={handleSend} className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLoading ? "Analyzing data streams..." : "Enter research query..."}
              disabled={isLoading}
              className="w-full bg-charcoal/50 border border-white/10 text-white rounded-2xl py-4 pl-6 pr-16 
                         focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 focus:bg-charcoal
                         placeholder:text-gray-600 transition-all shadow-lg backdrop-blur-md"
            />
            <div className="absolute right-2 top-2 bottom-2">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={!input.trim() || isLoading}
                className="h-full !px-4 !py-0 rounded-xl"
              >
                {isLoading ? '' : <Icons.Send />}
              </Button>
            </div>
          </form>
          
          <div className="text-center mt-3">
             <p className="text-[10px] text-gray-700 font-mono">
               Powered by Gemini 2.5 Flash & 3.0 Pro • 99.9% Target Precision
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
