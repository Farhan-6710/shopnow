import { useSyncUserData } from "@/hooks/useSyncUserData";

// Component that handles all initial data fetching
export function DataSyncProvider({ children }: { children: React.ReactNode }) {
  useSyncUserData();
  return <>{children}</>;
}
