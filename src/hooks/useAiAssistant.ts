"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
}

interface UseAiAssistantProps {
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
  onGetResponse?: (message: string) => Promise<string>;
  context?: unknown;
}

export const useAiAssistant = ({
  initialMessages = [],
  onSendMessage,
  onGetResponse,
  context,
}: UseAiAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "";

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

    if (onSendMessage) {
      onSendMessage(userMessage.content);
    }

    try {
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
                ...(context
                  ? [
                      {
                        role: "system",
                        content: `You are a helpful shopping assistant for an e-commerce store. Here are the available products you can help customers with:\n\n${JSON.stringify(
                          context,
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

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    chatContainerRef,
    inputRef,
    handleSubmit,
    formatTime,
  };
};

export type { Message };
