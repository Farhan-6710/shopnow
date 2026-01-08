"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  submitFeedbackRequest,
  selectFeedbackLoading,
  selectFeedbackError,
} from "@/redux/slices/feedbackSlice";
import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "../modals/Modal";
import dynamic from "next/dynamic";
import FeedbackFormSkeleton from "@/components/skeletons/FeedbackFormSkeleton";

const FeedbackForm = dynamic(
  () => import("@/components/ai-assistant/FeedbackForm"),
  {
    ssr: false,
    loading: () => <FeedbackFormSkeleton />,
  }
);

const AiAssistantFeedback: React.FC = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(selectFeedbackLoading);
  const error = useSelector(selectFeedbackError);

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

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
        title="Feedback"
        description="Help us improve your experience with ShopNow Assistant"
        className="max-w-md"
      >
        <FeedbackForm
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          feedbackMessage={feedbackMessage}
          setFeedbackMessage={setFeedbackMessage}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitFeedback}
          onCancel={() => setIsFeedbackModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default AiAssistantFeedback;
