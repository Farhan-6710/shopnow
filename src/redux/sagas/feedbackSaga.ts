import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  submitFeedbackRequest,
  submitFeedbackSuccess,
  submitFeedbackFailure,
  SubmitFeedbackPayload,
} from "@/redux/slices/feedbackSlice";
import { showToast } from "@/config/ToastConfig";
import { timeout } from "@/utils/timeout";

// API function
const submitFeedbackApi = async (payload: SubmitFeedbackPayload) => {
  const response = await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to submit feedback");
  }
  return data;
};

// Worker Saga
function* submitFeedbackSaga(action: PayloadAction<SubmitFeedbackPayload>) {
  try {
    // Wait for 400ms using the utility
    yield call(timeout, 400);

    yield call(submitFeedbackApi, action.payload);
    yield put(submitFeedbackSuccess());
    showToast({
      type: "success",
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit feedback";
    yield put(submitFeedbackFailure(message));
    showToast({
      type: "error",
      title: "Submission Failed",
      description:
        "Unable to submit feedback. Please check your network connection and try again.",
    });
  }
}

// Watcher Saga
export function* watchFeedback() {
  yield takeLatest(submitFeedbackRequest.type, submitFeedbackSaga);
}
