"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserId } from "@/utils/auth.utils";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!getUserId()) {
      router.push("/auth");
    }
  }, [router]);

  return <>{children}</>;
}
