"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";

interface FeedbackFormProps {
  selectedTopic: string;
  setSelectedTopic: (value: string) => void;
  selectedRating: string;
  setSelectedRating: (value: string) => void;
  feedbackMessage: string;
  setFeedbackMessage: (value: string) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const FeedbackForm = ({
  selectedTopic,
  setSelectedTopic,
  selectedRating,
  setSelectedRating,
  feedbackMessage,
  setFeedbackMessage,
  isSubmitting,
  onSubmit,
  onCancel,
}: FeedbackFormProps) => {
  return (
    <motion.div
      className="feedback-form space-y-6 pt-2"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <h2 className="text-xl font-semibold text-center">Share Your Feedback</h2>

      {/* Dropdowns Row */}
      <motion.div
        className="grid grid-cols-2 gap-4"
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        }}
      >
        {/* Topic Dropdown */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="feedback-topic"
            className="text-sm font-medium text-foreground"
          >
            Topic
          </label>
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger id="feedback-topic" className="w-full">
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
          <label
            htmlFor="feedback-rating"
            className="text-sm font-medium text-foreground"
          >
            Overall Rating
          </label>
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger id="feedback-rating" className="w-full">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">⭐⭐⭐⭐⭐ Excellent</SelectItem>
              <SelectItem value="good">⭐⭐⭐⭐ Good</SelectItem>
              <SelectItem value="average">⭐⭐⭐ Average</SelectItem>
              <SelectItem value="poor">⭐⭐ Poor</SelectItem>
              <SelectItem value="very-poor">⭐ Very Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Feedback Textarea */}
      <motion.div
        className="flex flex-col gap-2"
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        }}
      >
        <label
          htmlFor="feedback-message"
          className="text-sm font-medium text-foreground"
        >
          Your Feedback
        </label>
        <textarea
          id="feedback-message"
          value={feedbackMessage}
          onChange={(e) => setFeedbackMessage(e.target.value)}
          placeholder="Tell us what you think... (optional but appreciated)"
          className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none"
          rows={4}
          maxLength={500}
          aria-describedby="feedback-char-count"
        />
        <p id="feedback-char-count" className="text-xs text-muted-foreground">
          {feedbackMessage.length}/500 characters
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex gap-3"
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        }}
      >
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting} className="flex-1">
          {isSubmitting ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Sending...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackForm;
