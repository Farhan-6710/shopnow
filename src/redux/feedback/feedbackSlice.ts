import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FeedbackState {
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  isLoading: false,
  error: null,
};

export interface SubmitFeedbackPayload {
  topic: string;
  rating: string;
  message: string;
}

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    submitFeedbackRequest: (
      state,
      action: PayloadAction<SubmitFeedbackPayload>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    submitFeedbackSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    submitFeedbackFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  submitFeedbackRequest,
  submitFeedbackSuccess,
  submitFeedbackFailure,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
