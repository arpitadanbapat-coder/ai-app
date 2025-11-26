import React from 'react';
import { Message, Role } from '../types';
import { Icons } from '../constants';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isThinking = message.isThinking;

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 group`}>
      <div className={`max-w-[85%] lg:max-w-[70%] flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1
          ${isUser ? 'bg-mist text-obsidian' : 'bg-charcoal border border-neon/30 text-neon'}
        `}>
          {isUser ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          ) : (
            <Icons.Logo />
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`
            px-6 py-4 rounded-2xl text-sm leading-relaxed tracking-wide shadow-lg backdrop-blur-md border
            ${isUser 
              ? 'bg-mist/10 border-mist/20 text-mist rounded-tr-sm' 
              : 'bg-charcoal/80 border-deep_teal/20 text-gray-200 rounded-tl-sm'}
            ${isThinking ? 'animate-pulse-slow' : ''}
          `}>
            {/* Plain text rendering with line breaks for simplicity in this format */}
            <div className="whitespace-pre-wrap font-sans">
              {message.text || (
                <span className="flex items-center gap-2 italic text-neon/70">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </span>
              )}
            </div>
          </div>

          {/* Sources / Grounding */}
          {!isUser && message.sources && message.sources.length > 0 && (
             <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                <p className="col-span-full text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Verified Sources</p>
                {message.sources.map((source, idx) => (
                  <a 
                    key={idx} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-black/40 border border-white/5 rounded hover:border-neon/40 hover:bg-neon/5 transition-all group/link"
                  >
                    <div className="text-neon/70 group-hover/link:text-neon"><Icons.Link /></div>
                    <span className="text-xs text-gray-400 truncate group-hover/link:text-gray-200">{source.title}</span>
                  </a>
                ))}
             </div>
          )}
          
          <span className="text-[10px] text-gray-600 mt-2 font-mono">
             {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        </div>
      </div>
    </div>
  );
};
