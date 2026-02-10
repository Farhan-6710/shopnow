"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useAiAssistant, type Message } from "@/hooks/useAiAssistant";
import AiAssistantHeader from "./AiAssistantHeader";
import AiAssistantChatArea from "./AiAssistantChatArea";
import AiAssistantWelcome from "./AiAssistantWelcome";
import AiAssistantFooter from "./AiAssistantFooter";

interface AiAssistantProps {
  className?: string;
  placeholder?: string;
  title?: string;
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
  onGetResponse?: (message: string) => Promise<string>;
  context?: unknown;
}

const AiAssistant = ({
  className,
  placeholder = "Ask me anything...",
  title = "AI Assistant",
  initialMessages,
  onSendMessage,
  onGetResponse,
  context,
}: AiAssistantProps) => {
  const {
    messages,
    setLocalMessages,
    inputValue,
    setInputValue,
    isLoading,
    chatContainerRef,
    inputRef,
    handleSubmit,
    formatTime,
  } = useAiAssistant({
    initialMessages,
    onSendMessage,
    onGetResponse,
    context,
  });

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background border border-border rounded-lg shadow-sm",
        className,
      )}
    >
      <AiAssistantHeader title={title} isLoading={isLoading} />

      <AiAssistantChatArea
        messages={messages}
        isLoading={isLoading}
        chatContainerRef={chatContainerRef as React.RefObject<HTMLDivElement>}
        formatTime={formatTime}
      >
        {messages.length === 0 && <AiAssistantWelcome />}
      </AiAssistantChatArea>

      <AiAssistantFooter
        inputValue={inputValue}
        isLoading={isLoading}
        messages={messages}
        setLocalMessages={setLocalMessages}
        placeholder={placeholder}
        inputRef={inputRef as React.RefObject<HTMLInputElement | null>}
        onInputChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AiAssistant;
export type { AiAssistantProps };
