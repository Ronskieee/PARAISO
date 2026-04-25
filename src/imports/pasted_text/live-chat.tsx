import { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface LiveChatProps {
  onClose: () => void;
}

const SYSTEM_PROMPT = `You are a helpful support assistant for PARAISO Conference — a premium tropical-themed conference experience. Answer questions about:
- Registration: Register online via the website. Early bird registration ends 30 days before the event. Group discounts available for 5+ attendees (10% off for 5–9, 20% off for 10+).
- Schedule: 3-day conference with keynotes, breakout sessions, workshops, and evening networking events. Runs 9am–6pm daily.
- Speakers: Industry leaders in tech, wellness, sustainability, and creative industries. Full speaker lineup is available on the website.
- Tickets: Standard ($299), VIP ($599 — includes front-row seating + exclusive dinner). Early Bird offers 20% off all ticket types.
- Venue: Beachfront resort in Boracay, Philippines. Shuttle service from Caticlan Airport is included with VIP tickets.
- Group discounts: 10% off for groups of 5–9, 20% off for groups of 10 or more.
- Contact: For other inquiries, direct attendees to support@paraisoconf.com or call +63 (2) 8123-4567.
Be warm, concise, and helpful. Keep responses short and scannable. If unsure about something, suggest contacting support@paraisoconf.com.`;

const QUICK_QUESTIONS = [
  {
    icon: '📋',
    text: 'How do I register for the conference?',
    preview: "You can register online through the PARAISO website! 🌴 Early bird registration closes 30 days before the event — grab it for 20% off. Group discounts are also available for 5+ attendees.",
  },
  {
    icon: '🎟️',
    text: 'Where can I get tickets and what do they cost?',
    preview: "Tickets are available on the PARAISO website! 🎟️ Standard tickets are $299 and VIP tickets are $599 (includes front-row seating + exclusive dinner). Early Bird pricing gives you 20% off both tiers.",
  },
  {
    icon: '🎤',
    text: 'Who are the featured speakers at PARAISO?',
    preview: "PARAISO brings together industry leaders in tech, wellness, sustainability, and creative industries. 🎤 The full speaker lineup is available on the official website — check it out for all the names and sessions!",
  },
  {
    icon: '📅',
    text: 'What does the conference schedule look like?',
    preview: "PARAISO is a 3-day conference running 9am–6pm daily. 📅 Each day features keynotes, breakout sessions, hands-on workshops, and evening networking events. It's a packed and exciting experience!",
  },
  {
    icon: '📍',
    text: 'Where is the venue and how do I get there?',
    preview: "The conference is held at a beachfront resort in Boracay, Philippines! 🌊 VIP ticket holders receive complimentary shuttle service from Caticlan Airport. Standard attendees can arrange their own transfer from the airport.",
  },
  {
    icon: '👥',
    text: 'Are there group discounts available?',
    preview: "Yes! 👥 Groups of 5–9 people get 10% off, and groups of 10 or more receive 20% off. Register together on the website to apply the discount automatically.",
  },
];

const GREETING_MESSAGE = `Hello! 👋 Welcome to PARAISO Conference — I'm your personal AI assistant, here to help you with everything you need to know. Whether it's tickets, schedules, speakers, or the venue, just ask away. How may I help you today? 🌴`;

// Reactively tracks the `dark` class on <html> so the component re-renders on every theme toggle
function useDarkMode(): boolean {
  const isDark = () => document.documentElement.classList.contains('dark');
  const [dark, setDark] = useState<boolean>(isDark);

  useEffect(() => {
    setDark(isDark());
    const observer = new MutationObserver(() => setDark(isDark()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return dark;
}

export function LiveChat({ onClose }: LiveChatProps) {
  const dark = useDarkMode();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: GREETING_MESSAGE,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<
    { role: string; content: string }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const askClaude = async (
    userText: string,
    updatedHistory: { role: string; content: string }[]
  ) => {
    setIsTyping(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: updatedHistory,
        }),
      });

      const data = await response.json();
      const reply =
        data.content?.find(
          (b: { type: string; text?: string }) => b.type === 'text'
        )?.text || "Sorry, I couldn't get a response. Please try again.";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setConversationHistory((prev) => [
        ...prev,
        { role: 'assistant', content: reply },
      ]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Something went wrong. Please try again shortly.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (text?: string) => {
    const messageText = text ?? inputText;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    const updatedHistory = [
      ...conversationHistory,
      { role: 'user', content: messageText },
    ];
    setConversationHistory(updatedHistory);
    askClaude(messageText, updatedHistory);
  };

  const handleQuickQuestion = (questionText: string, previewAnswer: string) => {
    if (isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: questionText,
      sender: 'user',
      timestamp: new Date(),
    };

    const previewMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: previewAnswer,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, previewMessage]);
    setConversationHistory((prev) => [
      ...prev,
      { role: 'user', content: questionText },
      { role: 'assistant', content: previewAnswer },
    ]);
  };

  // All colors derived from the live `dark` boolean — guaranteed to update on toggle
  const c = {
    panel:           dark ? '#111827' : '#ffffff',
    panelBorder:     dark ? '#374151' : '#e5e7eb',
    messageAreaBg:   dark ? 'rgba(31,41,55,0.5)' : '#f9fafb',
    botBubbleBg:     dark ? '#1f2937' : '#ffffff',
    botBubbleBorder: dark ? '#374151' : '#e5e7eb',
    botText:         dark ? '#f3f4f6' : '#1f2937',
    timestamp:       dark ? '#6b7280' : '#9ca3af',
    inputBg:         dark ? '#1f2937' : '#f9fafb',
    inputBorder:     dark ? '#374151' : '#e5e7eb',
    inputText:       dark ? '#f3f4f6' : '#111827',
    inputPlaceholder:dark ? '#6b7280' : '#9ca3af',
    cardBg:          dark ? '#1f2937' : '#f9fafb',
    cardBorder:      dark ? '#374151' : '#e5e7eb',
    cardText:        dark ? '#d1d5db' : '#4b5563',
    cardHoverBg:     dark ? 'rgba(120,53,15,0.25)' : '#fffbeb',
    labelText:       dark ? '#6b7280' : '#9ca3af',
    dotBg:           dark ? '#6b7280' : '#9ca3af',
  };

  return (
    <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50 flex flex-col gap-3">

      {/* ── Chat window ── */}
      <div
        style={{ background: c.panel, border: `1px solid ${c.panelBorder}` }}
        className="rounded-2xl shadow-2xl flex flex-col h-[420px] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-amber-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-300 inline-block" />
            <div>
              <h3 className="font-medium text-white text-sm leading-none">PARAISO Support</h3>
              <p className="text-white/80 text-xs mt-0.5">AI-powered · replies instantly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div
          style={{ background: c.messageAreaBg }}
          className="flex-1 overflow-y-auto p-3 flex flex-col gap-2"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'user' ? (
                <div className="max-w-[82%] px-3 py-2 rounded-2xl rounded-br-sm text-sm leading-relaxed bg-amber-600 text-white">
                  <p>{message.text}</p>
                  <p className="text-[10px] mt-1 text-white/60">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    background: c.botBubbleBg,
                    border: `1px solid ${c.botBubbleBorder}`,
                    color: c.botText,
                  }}
                  className="max-w-[82%] px-3 py-2 rounded-2xl rounded-bl-sm text-sm leading-relaxed"
                >
                  <p>{message.text}</p>
                  <p style={{ color: c.timestamp }} className="text-[10px] mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div
                style={{ background: c.botBubbleBg, border: `1px solid ${c.botBubbleBorder}` }}
                className="px-4 py-3 rounded-2xl rounded-bl-sm"
              >
                <div className="flex gap-1 items-center">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      style={{ background: c.dotBg, animationDelay: `${delay}ms` }}
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input row */}
        <div
          style={{ background: c.panel, borderTop: `1px solid ${c.panelBorder}` }}
          className="px-3 py-2.5 flex gap-2 items-center flex-shrink-0"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message…"
            style={{
              background: c.inputBg,
              border: `1px solid ${c.inputBorder}`,
              color: c.inputText,
            }}
            className="flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !inputText.trim()}
            className="w-8 h-8 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      {/* ── Quick question cards ── */}
      <div
        style={{ background: c.panel, border: `1px solid ${c.panelBorder}` }}
        className="rounded-2xl shadow-xl p-3"
      >
        <p style={{ color: c.labelText }} className="text-xs mb-2 px-0.5">
          Common questions — tap to ask:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q.text}
              onClick={() => handleQuickQuestion(q.text, q.preview)}
              disabled={isTyping}
              style={{ background: c.cardBg, border: `1px solid ${c.cardBorder}` }}
              className="flex items-start gap-2 p-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed text-left transition-all"
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = '#f59e0b';
                el.style.background = c.cardHoverBg;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = c.cardBorder;
                el.style.background = c.cardBg;
              }}
            >
              <span className="text-base leading-none mt-0.5 flex-shrink-0">{q.icon}</span>
              <span style={{ color: c.cardText }} className="text-xs leading-snug">
                {q.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}