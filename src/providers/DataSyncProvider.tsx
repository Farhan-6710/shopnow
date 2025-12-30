import { useSyncUserData } from "@/hooks/useSyncUserData";

// Component that syncs user data when authenticated
export function DataSyncProvider({ children }: { children: React.ReactNode }) {
  useSyncUserData();
  return <>{children}</>;
}
