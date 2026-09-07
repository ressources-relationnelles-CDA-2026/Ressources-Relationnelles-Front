"use client";

import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogOutPage() {
  const router = useRouter();
  const { logout } = useLogout();

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const success = await logout();

      if (success) {
        window.dispatchEvent(new Event("auth-change"));
      }

      router.push("/login");
    }, 1500);

    return () => clearTimeout(timeout);
  }, [logout, router]);

  return <FormMessage message="Vous allez être déconnecté." />;
}