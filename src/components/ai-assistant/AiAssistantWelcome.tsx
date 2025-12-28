"use client";

import React from "react";
import { BotIcon } from "lucide-react";

const AiAssistantWelcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
        <BotIcon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Welcome to ShopNow Assistant
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        I&apos;m here to help you find exactly what you&apos;re looking for. Ask
        me about products, recommendations, or anything else!
      </p>
    </div>
  );
};

export default AiAssistantWelcome;
