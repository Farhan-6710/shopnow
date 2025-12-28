"use client";

import React, { useState, useRef, useEffect } from "react";
import { SendIcon, BotIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
}

interface AiAssistantProps {
  /** Additional className for the container */
  className?: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Title for the assistant */
  title?: string;
  /** Initial messages */
  initialMessages?: Message[];
  /** Callback when a message is sent */
  onSendMessage?: (message: string) => void;
  /** Custom message handler for AI responses */
  onGetResponse?: (message: string) => Promise<string>;
  /** Products context for AI to reference */
  productsContext?: any;
}

const AiAssistant: React.FC<AiAssistantProps> = ({
  className,
  placeholder = "Ask me anything...",
  title = "AI Assistant",
  initialMessages = [],
  onSendMessage,
  onGetResponse,
  productsContext,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "";

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Callback for external handling
    if (onSendMessage) {
      onSendMessage(userMessage.content);
    }

    try {
      // Use custom handler if provided, otherwise use OpenRouter API
      if (onGetResponse) {
        const aiResponse = await onGetResponse(userMessage.content);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // Call OpenRouter API
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey.trim()}`,
              "Content-Type": "application/json",
              "HTTP-Referer": window.location.origin,
              "X-Title": "Shop Now AI Assistant",
            },
            body: JSON.stringify({
              model: "deepseek/deepseek-chat",
              messages: [
                ...(productsContext
                  ? [
                      {
                        role: "system",
                        content: `You are a helpful shopping assistant for an e-commerce store. Here are the available products you can help customers with:\n\n${JSON.stringify(
                          productsContext,
                          null,
                          2
                        )}\n\nUse this information to answer customer questions about products, prices, availability, and recommendations. Be friendly and helpful.`,
                      },
                    ]
                  : []),
                ...messages.map((m) => ({
                  role: m.role === "system" ? "user" : m.role,
                  content: m.content,
                })),
                { role: "user", content: userMessage.content },
              ],
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            `API Error ${response.status}: ${
              errorData.error?.message || response.statusText
            }`
          );
        }

        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.choices[0].message.content,
          role: "assistant",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Error: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`,
        role: "system",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background border border-border rounded-lg shadow-sm",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
          <BotIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <p className="text-xs text-muted-foreground">
            {isLoading ? "Typing..." : "Online"}
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <BotIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Welcome to AI Assistant
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Ask me anything! I&apos;m here to help you with your shopping
              experience.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-1",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : message.role === "system"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {message.role === "user" ? (
                  <UserIcon className="w-4 h-4" />
                ) : (
                  <BotIcon className="w-4 h-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={cn(
                  "flex flex-col gap-1 max-w-[80%]",
                  message.role === "user" ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "px-4 py-2 rounded-2xl shadow-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : message.role === "system"
                      ? "bg-destructive/10 text-destructive border border-destructive/20 rounded-bl-sm"
                      : "bg-card text-card-foreground border border-border rounded-bl-sm"
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
                    {message.content}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground px-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground shrink-0">
              <BotIcon className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm bg-card border border-border">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-card">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 px-4 py-3 text-sm bg-background border border-input rounded-xl focus:outline-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="h-10.5 w-10.5 shrink-0 rounded-xl p-0"
          >
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AiAssistant;
export type { Message, AiAssistantProps };
