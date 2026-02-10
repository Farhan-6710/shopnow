"use client";

import React from "react";
import { BotIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Message } from "@/hooks/useAiAssistant";

interface AiAssistantChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement> | null;
  formatTime: (date: Date) => string;
  children?: React.ReactNode;
}

const AiAssistantChatArea = ({
  messages,
  isLoading,
  chatContainerRef,
  formatTime,
  children,
}: AiAssistantChatAreaProps) => {
  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50"
    >
      {children}

      {messages.map((message, index) => (
        <div
          key={message.id}
          className={cn(
            "flex gap-3",
            index === messages.length - 1 &&
              "animate-in fade-in slide-in-from-bottom-2 duration-300",
            message.role === "user" ? "flex-row-reverse" : "flex-row",
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
                  : "bg-muted text-muted-foreground",
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
              message.role === "user" ? "items-end" : "items-start",
            )}
          >
            <div
              className={cn(
                "px-4 py-2 rounded-2xl shadow-sm",
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : message.role === "system"
                    ? "bg-destructive/10 text-destructive border border-destructive/20 rounded-bl-sm"
                    : "bg-card text-card-foreground border border-border rounded-bl-sm",
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
      ))}

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
  );
};

export default AiAssistantChatArea;
