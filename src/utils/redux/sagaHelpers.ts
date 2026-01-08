// src/utils/redux/sagaHelpers.ts
import { call, put } from "redux-saga/effects";
import { showToast } from "@/config/ToastConfig";
import { isAuthenticated } from "@/utils/auth";

export interface ToastConfig {
  title: string;
  description: string;
}

/**
 * Check if user is authenticated (for use in sagas)
 */
export function* checkAuth() {
  const authenticated: boolean = yield call(isAuthenticated);
  return authenticated;
}

/**
 * Handle saga errors with toast notification
 */
export function* handleSagaError(
  error: unknown,
  failureAction: (message: string) => { type: string; payload: string },
  toast: ToastConfig
) {
  const message = error instanceof Error ? error.message : "Unknown error";
  yield put(failureAction(message));
  showToast({
    type: "error",
    title: toast.title,
    description: toast.description,
  });
}

/**
 * Show success toast
 */
export const showSuccessToast = (title: string, description: string) => {
  showToast({ type: "success", title, description });
};

/**
 * Show error toast
 */
export const showErrorToast = (title: string, description: string) => {
  showToast({ type: "error", title, description });
};

/**
 * Extract product IDs that need to be removed during sync
 * (items that were removed offline but NOT re-added)
 */
export const getItemsToRemove = (
  removedItems: Record<number, boolean>,
  currentIds: Set<number>
): number[] => {
  if (!removedItems) return [];
  return Object.keys(removedItems)
    .map(Number)
    .filter((id) => !currentIds.has(id));
};
