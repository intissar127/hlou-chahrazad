"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WHATSAPP_NUMBER = "21696507299"; // ⚠️ remplace par ton numéro (sans +)

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Aslama ! Comment puis-je vous aider aujourd'hui ? 🍰",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const updatedMessages = [
      ...messages,
      { role: "user" as const, content: userMessage },
    ];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: updatedMessages,
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Désolé, une erreur est survenue. 🙏" },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connexion impossible pour le moment. 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppLink = () => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    const text = lastUserMessage
      ? `Bonjour, je continue notre échange : "${lastUserMessage.content}"`
      : "Bonjour, j'aimerais avoir plus d'informations 🍰";

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[320px] h-[460px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-[#1c1917] text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-sm">
              Hlou Chahrazad Assistant 🍰
            </span>
            <button onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9FAFB]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  msg.role === "user"
                    ? "bg-[#25D366] text-white ml-auto"
                    : "bg-white border border-gray-200 text-[#374151]"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="bg-white border border-gray-200 text-[#374151] px-3 py-2 rounded-xl text-sm w-fit">
                ...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Lien WhatsApp */}

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-xs font-medium text-[#25D366] py-2 border-t border-gray-100 hover:bg-gray-50 transition-colors"
          >
            Continuer la conversation sur WhatsApp
          </a>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Écrivez un message..."
              className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#25D366]"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="w-9 h-9 flex items-center justify-center bg-[#25D366] rounded-full text-white disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-[60px] h-[60px] bg-[#25D366] rounded-full shadow-lg text-white hover:scale-105 active:scale-95 transition-all"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
