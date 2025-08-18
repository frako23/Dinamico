// app/api/auth/callback/route.ts
import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { token, nonce } = await request.json(); // Receive both token and nonce
    const supabase = await createClient();

    try {
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token,
            nonce, // Pass the received nonce to Supabase
        });

        if (error) {
            console.error("Error signing in with Google One Tap:", error.message);
            return NextResponse.json({ error: error.message }, { status: 401 });
        }

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error("Server error during sign-in:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}