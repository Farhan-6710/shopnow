"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavigationWindow } from "@/components/shared/NavigationWindow";
import { NAVIGATION_WINDOW_ANIMATION as ANIM } from "@/constants/animations";

type NavigationContextType = {
  isNavigating: boolean;
  transitionTo: (path: string) => void;
};

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
  transitionTo: () => {},
});

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

export default function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const transitionTo = useCallback(
    (url: string) => {
      if (url === pathname) return;

      setIsNavigating(true);
      setTargetPath(url);

      setTimeout(() => {
        router.push(url);
      }, ANIM.ROUTER_PUSH_DELAY_MS);
    },
    [pathname, router]
  );

  useEffect(() => {
    if (isNavigating) {
      setIsNavigating(false);
      setTargetPath(null);
    }
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ isNavigating, transitionTo }}>
      {children}
      <NavigationWindow isNavigating={isNavigating} />
    </NavigationContext.Provider>
  );
}
