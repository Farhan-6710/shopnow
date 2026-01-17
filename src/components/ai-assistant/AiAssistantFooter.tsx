"use client";

import React from "react";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AiAssistantActionButtons from "./AiAssistantActionButtons";
import type { Message } from "@/hooks/useAiAssistant";

interface AiAssistantFooterProps {
  inputValue: string;
  isLoading: boolean;
  messages: Message[];
  setLocalMessages: (messages: Message[]) => void;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement | null> | null;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AiAssistantFooter: React.FC<AiAssistantFooterProps> = ({
  inputValue,
  isLoading,
  messages,
  setLocalMessages,
  placeholder,
  inputRef,
  onInputChange,
  onSubmit,
}) => {
  return (
    <div className="p-4 border-t border-border bg-card space-y-3">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
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

      {/* Action Buttons - Only show when there are messages */}
      {messages.length > 0 && <AiAssistantActionButtons setLocalMessages={setLocalMessages} />}
    </div>
  );
};

export default AiAssistantFooter;
