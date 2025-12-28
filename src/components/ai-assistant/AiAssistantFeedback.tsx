"use client";

import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Modal from "../atoms/Modal";

const AiAssistantFeedback: React.FC = () => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async () => {
    if (!selectedTopic || !selectedRating || !feedbackMessage.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Send feedback to API
      console.log({
        topic: selectedTopic,
        rating: selectedRating,
        message: feedbackMessage,
      });

      // Reset form
      setSelectedTopic("");
      setSelectedRating("");
      setFeedbackMessage("");
      setIsFeedbackModalOpen(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Feedback Button */}
      <Button
        variant="outline"
        size="md"
        onClick={() => setIsFeedbackModalOpen(true)}
        className="flex-1 w-full hover:bg-primary/10"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Feedback
      </Button>

      {/* Feedback Modal */}
      <Modal
        open={isFeedbackModalOpen}
        onOpenChange={setIsFeedbackModalOpen}
        title="Share Your Feedback"
        description="Help us improve your experience with ShopNow Assistant"
        className="max-w-md"
      >
        <div className="space-y-6 py-4">
          {/* Dropdowns Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Topic Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Topic
              </label>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assistant-helpful">
                    Helpful Response
                  </SelectItem>
                  <SelectItem value="assistant-not-helpful">
                    Needs Improvement
                  </SelectItem>
                  <SelectItem value="product-accuracy">Product Info</SelectItem>
                  <SelectItem value="ui-ux">UI/UX</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rating Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Rating
              </label>
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">
                    ⭐⭐⭐⭐⭐ Excellent
                  </SelectItem>
                  <SelectItem value="good">⭐⭐⭐⭐ Good</SelectItem>
                  <SelectItem value="average">⭐⭐⭐ Average</SelectItem>
                  <SelectItem value="poor">⭐⭐ Poor</SelectItem>
                  <SelectItem value="very-poor">⭐ Very Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Feedback Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Your Feedback
            </label>
            <textarea
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              placeholder="Tell us what you think... (optional but appreciated)"
              className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none"
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              {feedbackMessage.length}/500 characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsFeedbackModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitFeedback}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AiAssistantFeedback;
