// app/api/userAccount/route.ts
import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const supabase = createClient();
  console.log("Received request with params:", searchParams.toString());

  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return NextResponse.json(
      { error: "Falta el parámetro user_id" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("userAccounts")
    .select("*")
    .eq("user_id", user_id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
