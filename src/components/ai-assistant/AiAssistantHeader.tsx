"use client";

import React from "react";
import { BotIcon } from "lucide-react";

interface AiAssistantHeaderProps {
  title: string;
  isLoading: boolean;
}

const AiAssistantHeader: React.FC<AiAssistantHeaderProps> = ({
  title,
  isLoading,
}) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
        <BotIcon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">
          {isLoading ? "Typing..." : "Active"}
          {!isLoading && (
            <span className="ml-1 text-green-500 animate-pulse">●</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default AiAssistantHeader;
