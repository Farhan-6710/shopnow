import React from "react";
import { Bot } from "lucide-react";

const AiGlowButton = () => {
  return (
    <>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          from { background-position: 0% 50%; }
          to { background-position: 200% 50%; }
        }
        .animate-border-spin {
          animation: spin-slow 4s linear infinite;
        }
        /* Speed up the spin on hover */
        .group:hover .animate-border-spin {
          animation-duration: 1.5s;
        }
        .animate-text-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* COMPONENT CONTAINER */}
      <div className="relative group w-fit ml-3">
        
        {/* 1. ATMOSPHERE GLOW 
             - Added 'animate-pulse' for a subtle breathing effect.
             - Increased opacity on hover for a 'power up' feel.
        */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur-lg opacity-20 group-hover:opacity-50 transition duration-500 group-hover:duration-200 animate-pulse" />

        {/* 2. MAIN BUTTON CONTAINER
             - active:scale-95 adds a tactile 'click' feedback.
             - Removed focus rings as per request.
        */}
        <button className="relative overflow-hidden rounded-lg p-[1px] transition-transform active:scale-95 outline-none border-none">
          
          {/* STATIC BASE LINE 
              - This matches the exact positioning of the moving line.
              - It uses a solid cyan-500/30 or similar to act as the permanent track.
          */}
          <span className="absolute inset-0 bg-cyan-300 rounded-lg" />

          {/* 3. ROTATING BORDER (The Snake)
               - Conic gradient that spins behind the content.
               - This flows over the static cyan base line created above.
          */}
          <span className="absolute inset-[-1000%] animate-border-spin bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#06b6d4_50%,#d8b4fe_100%)]" />

          {/* 4. BUTTON CONTENT
               - bg-slate-950 ensures text is readable and the border looks crisp.
          */}
          <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-card px-6 py-2.5 text-sm font-medium text-foreground backdrop-blur-3xl transition-all duration-300 group-hover:bg-slate-900 gap-2">
            
            {/* Animated Icon: Floats up on hover */}
            <Bot className="w-5 h-5 text-cyan-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-cyan-300" />
            
            {/* Animated Text: Gradient flows on hover */}
            <span className="bg-gradient-to-r from-cyan-200 via-purple-200 to-cyan-200 bg-[length:200%_auto] bg-clip-text text-transparent font-semibold tracking-wide group-hover:animate-text-shimmer">
              AI Assistant
            </span>
          </span>
        </button>

      </div>
    </>
  );
};

export default AiGlowButton;