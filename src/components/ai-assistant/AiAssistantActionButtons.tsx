"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "../modals/ConfirmationModal";
import AiAssistantFeedback from "./AiAssistantFeedback";
import { useDispatch } from "react-redux";
import { clearChat } from "@/redux/slices/chatSlice";
import { AppDispatch } from "@/redux/store";
import { Message } from "@/hooks/useAiAssistant";

interface AiAssistantActionButtonsProps {
  setLocalMessages: (messages: Message[]) => void;
}

const AiAssistantActionButtons = ({
  setLocalMessages,
}: AiAssistantActionButtonsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const handleClearChat = () => {
    setLocalMessages([]);
    dispatch(clearChat());
    setIsClearModalOpen(false);
  };

  return (
    <>
      <div className="flex gap-2">
        {/* Feedback Button */}
        <AiAssistantFeedback />

        {/* Clear Chat Button */}
        <Button
          variant="outline"
          size="md"
          onClick={() => setIsClearModalOpen(true)}
          className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      {/* Clear Chat Confirmation Modal */}
      <ConfirmationModal
        open={isClearModalOpen}
        onOpenChange={setIsClearModalOpen}
        title="Clear Chat History"
        description="Are you sure you want to clear all messages? This action cannot be undone."
        confirmLabel="Clear"
        cancelLabel="Cancel"
        onConfirm={handleClearChat}
        variant="destructive"
      />
    </>
  );
};

export default AiAssistantActionButtons;
