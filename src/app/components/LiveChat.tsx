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


const SYSTEM_PROMPT = `You are a warm and helpful event planning assistant for PARAISO Events — a premium event management company in the Philippines specializing in weddings, debut celebrations, and social gatherings.

Answer questions about:
- Weddings: PARAISO offers full wedding planning and coordination at top Metro Manila venues including Casa Ibarra (up to 500 guests), Whitespace Manila (up to 400 guests), Brittany Palazzo (up to 300 guests), Glass Garden Events Venue (up to 200 guests), and Light of Love Events Place (up to 600 guests). Packages cover floral arrangements, bridal suites, catering, sound & lighting, photo booths, and valet parking.
- Debuts: We specialize in 18th birthday debut celebrations with fairy light setups, throne chairs, red carpet entrances, cotillion de honor coordination, and themed décor. Venues include Fernwood Gardens, Marquis Events Place, Hillcreek Gardens, Stella Suites, and The Blue Leaf Events Pavilion (capacities range from 200 to 400 guests).
- Social Gatherings: Corporate events, reunions, anniversaries, and cocktail parties. Venues include The Silica Events Place, Woodlane Events Place, Gallio Bar and Restaurant, The Pergola, and Apogée Events and Lifestyle (capacities from 150 to 300 guests).
- Ticket / Package Tiers: Standard Package (venue access, basic catering, sound system), Premium Package (adds photo booth and valet parking), VIP Package (adds private lounge, bar service, and personalized décor — most popular), All-Inclusive Package (adds pro videography, live entertainment, luxury accommodations, and a dedicated event coordinator). Exact pricing varies per venue — clients are directed to the booking page for details.
- Booking Process: Clients choose an event type, select a venue, then complete the booking form on the PARAISO website. A confirmation is sent after booking.
- Schedule / Timeline: PARAISO provides a suggested day-of schedule for each event type. Weddings typically run 8am–10pm; Debuts run 3pm–8pm; Social Gatherings run 5pm–10pm.
- Group & Early-bird Discounts: Available depending on package and event type. Contact us for current promotions.
- Contact: For detailed quotes and availability, reach us at support@paraisoeventsPH.com or call +63 (2) 8888-PARA (7272).

Be warm, elegant, and concise. Keep responses short and easy to read. If unsure, suggest contacting support@paraisoeventsPH.com.`;


const QUICK_QUESTIONS = [
  {
    icon: '💍',
    text: 'What wedding venues do you offer?',
    preview: "We have five stunning wedding venues! 💍 Casa Ibarra (up to 500 guests), Whitespace Manila (up to 400), Brittany Palazzo (up to 300), Glass Garden Events Venue (up to 200), and Light of Love Events Place (up to 600 guests). Each comes with full décor, catering, and coordination options!",
  },
  {
    icon: '👑',
    text: 'How do you plan a debut celebration?',
    preview: "We make every debut magical! 👑 We handle the full program — 18 Roses, 18 Candles, Cotillion de Honor, themed décor, and more. Choose from venues like Fernwood Gardens, Stella Suites, or The Blue Leaf Events Pavilion. Just book your date and we'll take care of the rest!",
  },
  {
    icon: '🥂',
    text: 'What social gathering venues are available?',
    preview: "For social events we offer The Silica Events Place, Woodlane Events Place, Gallio Bar and Restaurant, The Pergola, and Apogée Events and Lifestyle — all in Quezon City. 🥂 Capacities range from 150 to 300 guests, perfect for corporate events, reunions, and cocktail parties!",
  },
  {
    icon: '💳',
    text: 'What packages and pricing do you have?',
    preview: "We offer four tiers: Standard (venue + basic catering + sound), Premium (adds photo booth & valet), VIP (adds private lounge, bar service & personalized décor — our most popular!), and All-Inclusive (adds pro videography, live entertainment & a dedicated coordinator). 💳 Pricing varies per venue — visit our booking page for full details!",
  },
  {
    icon: '📅',
    text: 'How do I book an event with PARAISO?',
    preview: "Booking is easy! 📅 Just head to our website, choose your event type (Wedding, Debut, or Social Gathering), pick your preferred venue, and fill out the booking form. You'll receive a confirmation right after. Need help choosing? We're here for you!",
  },
  {
    icon: '✨',
    text: 'What inclusions come with the packages?',
    preview: "Every package includes venue access and a dedicated setup team. ✨ Higher tiers add catering upgrades, photo booths, valet parking, a private lounge, bar service, personalized décor, pro videography, live entertainment, and a full event coordinator. We make sure your celebration is stress-free from start to finish!",
  },
];


const GREETING_MESSAGE = `Hello! 👋 Welcome to PARAISO Events — I'm your personal AI event planning assistant! Whether you're dreaming of a grand wedding 💍, an elegant debut 👑, or a memorable social gathering 🥂, I'm here to help. What can I assist you with today?`;


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

  const c = {
    panel:            dark ? '#111827' : '#ffffff',
    panelBorder:      dark ? '#374151' : '#e5e7eb',
    messageAreaBg:    dark ? 'rgba(31,41,55,0.5)' : '#f9fafb',
    botBubbleBg:      dark ? '#1f2937' : '#ffffff',
    botBubbleBorder:  dark ? '#374151' : '#e5e7eb',
    botText:          dark ? '#f3f4f6' : '#1f2937',
    timestamp:        dark ? '#6b7280' : '#9ca3af',
    inputBg:          dark ? '#1f2937' : '#f9fafb',
    inputBorder:      dark ? '#374151' : '#e5e7eb',
    inputText:        dark ? '#f3f4f6' : '#111827',
    inputPlaceholder: dark ? '#6b7280' : '#9ca3af',
    cardBg:           dark ? '#1f2937' : '#f9fafb',
    cardBorder:       dark ? '#374151' : '#e5e7eb',
    cardText:         dark ? '#d1d5db' : '#4b5563',
    cardHoverBg:      dark ? 'rgba(120,53,15,0.25)' : '#fffbeb',
    labelText:        dark ? '#6b7280' : '#9ca3af',
    dotBg:            dark ? '#6b7280' : '#9ca3af',
  };

  return (
    <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50 flex flex-col gap-3">

      {/* Chat window */}
      <div
        style={{ background: c.panel, border: `1px solid ${c.panelBorder}` }}
        className="rounded-2xl shadow-2xl flex flex-col h-[420px] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-amber-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-300 inline-block" />
            <div>
              <h3 className="font-medium text-white text-sm leading-none">PARAISO Events Support</h3>
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
            placeholder="Ask about weddings, debuts, events…"
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

      {/* Quick question cards */}
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