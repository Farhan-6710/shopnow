"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { submitFeedbackRequest } from "@/redux/feedback/feedbackSlice";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
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
  const dispatch = useDispatch();
  const { isLoading: isSubmitting, error } = useSelector(
    (state: RootState) => state.feedback
  );

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  useEffect(() => {
    // If not loading and no error, and modal is open, it might mean success.
    // However, we don't have a clear "success" flag in the slice, only loading/error.
    // We'll rely on checking if submission finished successfully inside the effect isn't ideal without a flag.
    // For now, simpler: we keep correct local submit handling.
    // Wait, the saga handles success toast.
    // If we want to close the modal on success, we need to know.
    // A separate "isSuccess" in slice would be nice, but we can infer:
    // If we were submitting (local state? no, redux state) and now we are not, AND no error -> success.
    // But we need to track "wasSubmitting".
  }, [isSubmitting, error]);

  // Actually, let's keep it simple:
  // We can't close the modal easily purely from Redux state without a success flag or local wrapper.
  // BUT the user asked for using Redux.
  // Let's add a local effect to close modal on success.
  const [wasSubmitting, setWasSubmitting] = useState(false);

  useEffect(() => {
    if (wasSubmitting && !isSubmitting && !error) {
      // Success!
      // Defer state updates to avoid synchronous setState warning
      const timer = setTimeout(() => {
        setIsFeedbackModalOpen(false);
        setSelectedTopic("");
        setSelectedRating("");
        setFeedbackMessage("");
        setWasSubmitting(false);
      }, 0);
      return () => clearTimeout(timer);
    }
    if (wasSubmitting && !isSubmitting && error) {
      setTimeout(() => setWasSubmitting(false), 0);
    }
  }, [isSubmitting, error, wasSubmitting]);

  const handleSubmitFeedback = () => {
    if (!selectedTopic || !selectedRating || !feedbackMessage.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setWasSubmitting(true);
    dispatch(
      submitFeedbackRequest({
        topic: selectedTopic,
        rating: selectedRating,
        message: feedbackMessage,
      })
    );
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
                Overall Rating
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
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AiAssistantFeedback;
