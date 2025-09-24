"use client";

import type React from "react";
import { StoreProvider } from "@/lib/store";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/utils/supabase/client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <StoreProvider>{children}</StoreProvider>
    </SessionContextProvider>
  );
}
