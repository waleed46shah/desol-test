"use client";

import { createContext, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUserId } from "@/utils/auth.utils";

interface AuthContextType {
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = () => {
    const userId = getUserId();
    return userId !== null;
  };

  useEffect(() => {
    const isAuthenticated = checkAuth();
    const isAuthPage = pathname.startsWith("/auth");

    if (!isAuthenticated && !isAuthPage) {
      router.push("/auth");
    } else if (isAuthenticated && isAuthPage) {
      router.push("/");
    }
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
