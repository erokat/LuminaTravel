import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, WifiOff, Globe, Sparkles } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { ChatAction, Message } from '../api/types';
import { askAI } from '../services/aiService';
import { CHAT_SCRIPTS, FAQ_DATA } from '../data/chatScripts';
import { hotels, tours } from '../data/mockData';

import { useSearchStore } from '../store/useSearchStore';

function Typewriter({ text, speed = 20, onComplete }: { text: string, speed?: number, onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!text) {
      if (onComplete) onComplete();
      return;
    }
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, speed, onComplete]);

  return <>{displayedText}</>;
}

export default function ChatAssistant() {
  const { messages, isOpen, setOpen, addMessage, isTyping, setTyping, updateMessageStatus, processOfflineQueue, addOfflineMessage } = useChatStore();
  const [inputValue, setInputValue] = useState('');
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      const pending = processOfflineQueue();
      pending.forEach(msg => handleResponse(msg.text));
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    
    // Immediate scroll
    scrollToBottom();
    // Scroll after render
    requestAnimationFrame(scrollToBottom);
    // Scroll after typical animation completes
    setTimeout(scrollToBottom, 300);
    setTimeout(scrollToBottom, 500);

  }, [messages, isTyping, isOpen]);

  const handleAction = (action: ChatAction, label?: string, silent: boolean = false) => {
    if (label) {
      addMessage({ role: 'user', text: label });
    }

    const performNav = (finalPath: string) => {
      const currentPath = location.pathname + location.search;
      if (finalPath === currentPath) return false;
      navigate(finalPath);
      return true;
    };

    if (action.type === 'navigate') {
      const path = action.filter 
        ? `${action.path}?filter=${encodeURIComponent(action.filter)}` 
        : action.path;
      if (performNav(path)) {
        if (!silent) {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            addMessage({ role: 'bot', text: 'С удовольствием. Мгновение — и я представлю вашему вниманию эту кулуарную коллекцию.' });
          }, 600);
        }
      }
    } else if (action.type === 'select_hotel') {
      if (performNav(`/hotels/${action.hotelId}`)) {
        if (!silent) {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            addMessage({ role: 'bot', text: 'Ваш выбор безупречен. Позвольте погрузить вас в атмосферу этого исключительного места.' });
          }, 600);
        }
      }
    } else if (action.type === 'select_tour') {
      if (performNav(`/tours/${action.tourId}`)) {
        if (!silent) {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            addMessage({ role: 'bot', text: 'Потрясающее направление. Мгновение — и я открою для вас его тайное великолепие.' });
          }, 600);
        }
      }
    } else if (action.type === 'scripted_next') {
      const step = CHAT_SCRIPTS[action.nextStep];
      if (step) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          addMessage({
            role: 'bot',
            text: step.text,
            options: step.options
          });
        }, 800);
      }
    }
  };

  const handleResponse = async (input: string) => {
    setTyping(true);
    
    // 1. Check FAQ
    const faq = FAQ_DATA.find(f => f.keywords.some(k => input.toLowerCase().includes(k)));
    if (faq) {
      setTimeout(() => {
        setTyping(false);
        addMessage({ role: 'bot', text: faq.answer });
      }, 1000);
      return;
    }

    // 2. Check for booking intent
    if (input.toLowerCase().includes('book') || input.toLowerCase().includes('plan')) {
      setTimeout(() => {
        setTyping(false);
        const step = CHAT_SCRIPTS['booking_start'];
        addMessage({ role: 'bot', text: step.text, options: step.options });
      }, 1000);
      return;
    }

    // Default to AI
    const history = messages.slice(-10).map(m => ({
      id: m.id,
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      text: m.text,
      functionCalls: m.functionCalls,
      reasoning_details: m.reasoning_details
    }));

    const currentPath = location.pathname + location.search;
    const aiResponse = await askAI(input, history, currentPath);
    
    console.log("[AI Response]", aiResponse);

    setTyping(false);
    addMessage({ 
      role: 'bot', 
      text: aiResponse.text,
      functionCalls: aiResponse.functionCalls,
      reasoning_details: aiResponse.reasoning_details
    });

    if (aiResponse.functionCalls) {
      console.log("[AI] Executing Function Calls:", aiResponse.functionCalls);
      // 1. Handle non-navigational calls immediately (Search Parameters)
      aiResponse.functionCalls.forEach(call => {
        if (!call || typeof call !== 'object') return;
        const args = call.args || {};

        if (call.name === 'setSearchParameters') {
          let { checkIn, checkOut, destination, adults, guests, children } = args;
          
          if (checkIn) {
            if (!checkOut) {
              const d = new Date(checkIn);
              d.setDate(d.getDate() + 7);
              checkOut = d.toISOString().split('T')[0];
            }
            useSearchStore.getState().setDates(checkIn, checkOut || '');
          } else if (checkOut) {
            useSearchStore.getState().setDates(useSearchStore.getState().checkIn || '', checkOut);
          }
          
          if (destination) {
            useSearchStore.getState().setDestination(destination);
          }
          
          const currentStore = useSearchStore.getState();
          const finalAdults = adults !== undefined ? Number(adults) : currentStore.adults;
          const finalChildren = children !== undefined ? Number(children) : currentStore.children;
          
          if (!isNaN(finalAdults) && !isNaN(finalChildren)) {
            console.log("[AI] Setting Guests:", { finalAdults, finalChildren });
            useSearchStore.getState().setGuests(finalAdults, finalChildren);
          }
        }
      });

      // 2. Execute navigation calls
      // Use a small delay for state propagation if needed, though Zustand is sync
      aiResponse.functionCalls.forEach(call => {
        if (!call || typeof call !== 'object') return;
        const args = call.args || {};

        console.log(`[AI-DEBUG] Processing call: ${call.name} with args:`, args);

        if (call.name === 'navigateToPage') {
          const rawPage = args.page;
          const page = typeof rawPage === 'string' ? rawPage.toLowerCase().trim() : '';
          const pathMap: Record<string, string> = {
            home: '/', main: '/', 'главная': '/', 'начало': '/',
            destinations: '/destinations', destination: '/destinations', 'направления': '/destinations',
            hotels: '/hotels', hotel: '/hotels', 'отели': '/hotels', 'отель': '/hotels',
            tours: '/tours', tour: '/tours', 'туры': '/tours', 'тур': '/tours',
            flights: '/flights', flight: '/flights', 'перелеты': '/flights', 'рейсы': '/flights'
          };
          const path = pathMap[page];
          if (path) {
            handleAction({ type: 'navigate', path }, undefined, true);
          } else {
            console.warn(`[AI-DEBUG] Unknown page: ${page}`);
          }
        } else if (call.name === 'navigateToDetail') {
          const { type, id } = args;
          console.log(`[AI-DEBUG] Attempting navigation with type: ${type}, id: ${id}`);
          if (type === 'hotel' && id) {
            handleAction({ type: 'select_hotel', hotelId: id }, undefined, true);
          } else if (type === 'tour' && id) {
            handleAction({ type: 'select_tour', tourId: id }, undefined, true);
          } else if (type === 'destination' && id) {
            handleAction({ type: 'navigate', path: `/destinations/${id}` }, undefined, true);
          } else {
            console.warn(`[AI-DEBUG] Failed to map navigateToDetail: ${type}/${id}`);
          }
        }
      });
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMsgText = inputValue;
    setInputValue('');

    if (!isOnline) {
      const offlineMsg: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'user',
        text: userMsgText,
        timestamp: Date.now(),
        status: 'pending'
      };
      addOfflineMessage(offlineMsg);
      return;
    }

    addMessage({ role: 'user', text: userMsgText });
    handleResponse(userMsgText);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-500",
          isOpen ? "bg-white text-black" : "bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] backdrop-blur-xl border border-[rgba(255,255,255,0.2)] text-white"
        )}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </motion.button>

      {/* Chat Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 right-0 w-full md:w-[450px] lg:w-[480px] h-full md:h-[75vh] bg-[#020202]/95 backdrop-blur-3xl z-[110] flex flex-col border-l md:border-t border-[rgba(255,255,255,0.1)] md:rounded-tl-[3.5rem] shadow-[-20px_0_60px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="p-8 border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <Bot className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h4 className="text-lg font-light tracking-tight">Lumina Concierge</h4>
                  <div className="flex items-center gap-1.5">
                    {isOnline ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    ) : (
                      <WifiOff className="w-3 h-3 text-red-500" />
                    )}
                    <span className="text-[10px] uppercase tracking-widest text-[rgba(255,255,255,0.4)] font-medium">
                      {isOnline ? 'System Online' : 'Standard Connection'}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)} 
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide min-h-0 flex flex-col"
            >
              <div className="flex-1 space-y-10 flex flex-col">
                {messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className={cn(
                      "flex gap-4 w-full",
                      msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm",
                      msg.role === 'user' ? "bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)]" : "bg-white"
                    )}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-5 h-5 text-black" />}
                    </div>
                    <div className={cn(
                      "flex flex-col max-w-[85%]",
                      msg.role === 'user' ? "items-end" : "items-start"
                    )}>
                      <div className={cn(
                        "relative group w-full",
                        msg.role === 'user' ? "text-right" : "text-left"
                      )}>
                        <div className={cn(
                          "inline-block px-6 py-4 rounded-2xl text-sm font-light leading-relaxed border transition-all break-words text-left",
                          msg.role === 'user' 
                            ? "bg-white text-black border-transparent rounded-tr-none shadow-lg" 
                            : "glass border-[rgba(255,255,255,0.05)] rounded-tl-none text-[rgba(255,255,255,0.9)]"
                        )}>
                          {msg.role === 'bot' && i === messages.length - 1 ? (
                            <Typewriter text={msg.text} />
                          ) : (
                            msg.text
                          )}
                          
                          {msg.status === 'pending' && (
                            <div className="mt-2 flex items-center gap-1 text-[10px] opacity-60">
                              <WifiOff className="w-2.5 h-2.5" />
                              <span>Will send when back online</span>
                            </div>
                          )}
                        </div>

                        {/* Rich Response Content */}
                        {msg.image && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 rounded-[2.5rem] overflow-hidden border border-[rgba(255,255,255,0.1)] relative group/img cursor-default shadow-2xl"
                          >
                            <img 
                              src={msg.image} 
                              className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-[3s]" 
                              alt="" 
                              draggable={false}
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            
                            {msg.price && (
                              <div className="absolute top-6 right-6 glass px-4 py-2 rounded-full text-xs font-medium z-20">
                                {msg.price}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                      <Bot className="w-5 h-5 text-black" />
                    </div>
                    <div className="glass px-6 py-4 rounded-2xl rounded-tl-none flex gap-2 items-center border border-[rgba(255,255,255,0.05)]">
                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-white rounded-full" />
                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-white rounded-full" />
                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Bot Options */}
              <AnimatePresence>
                {(() => {
                  const lastMsg = messages[messages.length - 1];
                  if (lastMsg && lastMsg.role === 'bot' && lastMsg.options) {
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-10 flex flex-wrap gap-3 justify-start"
                      >
                        {lastMsg.options.map((opt, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAction(opt.action, opt.label)}
                            className="px-6 py-3 rounded-full border border-[rgba(255,255,255,0.1)] glass hover:bg-white hover:text-black transition-all duration-300 text-[11px] font-medium tracking-wider uppercase flex items-center gap-2 shadow-xl"
                          >
                            <Sparkles className="w-3.5 h-3.5 opacity-50 transition-opacity" />
                            {opt.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    );
                  }
                  return null;
                })()}
              </AnimatePresence>
            </div>

          {/* Input Area */}
          <div className="p-8 border-t border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.6)] backdrop-blur-3xl">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative group"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isOnline ? "Describe your ideal journey..." : "Standard connection active..."}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-2xl py-5 pl-8 pr-16 text-sm font-light placeholder:text-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(255,255,255,0.3)] focus:bg-[rgba(255,255,255,0.08)] transition-all shadow-inner"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute right-3 top-3 w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-5 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity cursor-default">
                <Globe className="w-3.5 h-3.5 text-white" />
                <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-white">Lumina Elite Network</span>
              </div>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

