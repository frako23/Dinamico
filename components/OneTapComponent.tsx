"use client";
import Script from "next/script";
// Types for Google One Tap
type accounts = {
  id: {
    initialize: (options: {
      client_id: string;
      callback: (response: CredentialResponse) => void;
      nonce: string;
      use_fedcm_for_prompt: boolean;
    }) => void;
    prompt: () => void;
  };
};

type CredentialResponse = {
  credential: string;
  select_by: string;
  clientId?: string;
};
import { useRouter } from "next/navigation";
import { createClientInstance } from "@/utils/supabase/client";
declare const google: { accounts: accounts };

const generateNonce = async (): Promise<[string, string]> => {
  const nonce = btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))
  );
  const encoder = new TextEncoder();
  const encodedNonce = encoder.encode(nonce);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedNonce = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return [nonce, hashedNonce];
};

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn("Supabase key missing. OneTapComponent will not render.");
}

const OneTapComponent = () => {
  const supabase = createClientInstance();
  const router = useRouter();
  const initializeGoogleOneTap = async () => {
    const [nonce, hashedNonce] = await generateNonce();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting session", error);
    }
    if (data.session) {
      router.push("/");
      return;
    }
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: async (response: CredentialResponse) => {
        try {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: response.credential,
            nonce,
          });
          if (error) throw error;
          router.push("/");
        } catch (error) {
          console.error("Error logging in with Google One Tap", error);
        }
      },
      nonce: hashedNonce,
      use_fedcm_for_prompt: true,
    });
    google.accounts.id.prompt();
  };
  return (
    <Script
      onReady={() => {
        void initializeGoogleOneTap();
      }}
      src="https://accounts.google.com/gsi/client"
    />
  );
};
export default OneTapComponent;
