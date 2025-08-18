// components/OneTapComponent.tsx
"use client";
import Script from "next/script";
import { useRouter } from "next/navigation";

// ... (types and other imports)

type CredentialResponse = {
  credential: string;
  select_by?: string;
  clientId?: string;
};

const generateNonce = (): string => {
  const nonce = btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))
  );
  return nonce;
};

const OneTapComponent = () => {
  const router = useRouter();

  const handleGoogleCallback = async (response: CredentialResponse) => {
    try {
      const nonce = localStorage.getItem("google-auth-nonce");
      localStorage.removeItem("google-auth-nonce"); // Clean up immediately

      if (!nonce) {
        throw new Error("Nonce not found. Possible security issue.");
      }

      const res = await fetch("/api/auth/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.credential, nonce }),
      });

      const data = await res.json();

      if (res.ok) {
        router.refresh();
      } else {
        console.error("Authentication failed:", data.error);
      }
    } catch (error) {
      console.error("Error logging in with Google One Tap", error);
    }
  };

  const initializeGoogleOneTap = async () => {
    const nonce = generateNonce();
    localStorage.setItem("google-auth-nonce", nonce);

    if (
      typeof window !== "undefined" &&
      (window as any).google &&
      (window as any).google.accounts &&
      (window as any).google.accounts.id
    ) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleGoogleCallback,
        nonce: nonce, // Pass the raw nonce here
        use_fedcm_for_prompt: true,
      });

      (window as any).google.accounts.id.prompt();
    } else {
      console.error("Google One Tap script not loaded yet.");
    }
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
