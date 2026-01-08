// src/utils/auth.ts
import { createClient } from "@/utils/supabase/client";

/**
 * Check if the current user is authenticated
 * @returns Promise<boolean> - true if user has an active session
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return !!session;
};
