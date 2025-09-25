"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

// Define the type for google.accounts if needed:
type GoogleAccounts = {
  id: {
    initialize: (options: any) => void;
    prompt: () => void;
  };
};

// Declare google with the correct type:
declare const google: { accounts: GoogleAccounts };

// Define CredentialResponse type based on Google One Tap documentation
type CredentialResponse = {
  credential: string;
  select_by?: string;
  clientId?: string;
};

const generateNonce = async (): Promise<string[]> => {
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

const OneTapComponent = () => {
  const router = useRouter();

  const initializeGoogleOneTap = async () => {
    console.warn("Initializing Google One Tap");
    const [nonce, hashedNonce] = await generateNonce();
    console.warn("Nonce: ", nonce, hashedNonce);

    // check if there's already an existing session before initializing the one-tap UI
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting session", error);
    }
    // Ya no redirigimos automáticamente a /home si hay sesión
    console.warn(
      "Initializing Google One Tap with client ID: ",
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    );

    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: async (response: CredentialResponse) => {
        try {
          // send id token returned in response.credential to supabase
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: response.credential,
            nonce,
          });

          if (error) throw error;
          console.warn("Session data: ", data);
          console.warn("Successfully logged in with Google One Tap");
        } catch (error) {
          console.error("Error logging in with Google One Tap", error);
        }
      },
      nonce: hashedNonce,
      // with chrome's removal of third-party cookies, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
      use_fedcm_for_prompt: true,
    });
    google.accounts.id.prompt(); // Display the One Tap UI
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
