"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase/client";
import OneTapComponent from "@/components/OneTapComponent";
import Image from "next/image";
import { Wallet } from "lucide-react";
import { User } from "@supabase/supabase-js";

export default function LoginPage() {
  const router = useRouter();
  async function ensureProfileExists(user: User) {
    const { data: existingProfile, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!existingProfile && !error) {
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          email: user.email,
          created_at: new Date().toISOString(),
          // Puedes agregar más campos si tu tabla los requiere
        },
      ]);

      if (insertError) {
        console.error("Error al insertar perfil:", insertError.message);
      } else {
        console.log("Perfil creado exitosamente");
      }
    }
  }

  useEffect(() => {
    // Redirección si ya hay sesión activa
    supabase.auth.getSession().then(async ({ data }) => {
      const session = data.session;
      if (session) {
        await ensureProfileExists(session.user);
        router.push("/home");
      }
    });

    // Escuchar cambios de sesión
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          console.log("Usuario autenticado:", session);
          const user = session?.user;
          if (user) {
            const { data, error } = await supabase
              .from("profiles")
              .select("id")
              .eq("id", user.id)
              .single();

            if (!data && !error) {
              await supabase.from("profiles").insert({
                id: user.id,
                username: user.user_metadata?.name || user.email,
                avatar_url: user.user_metadata?.avatar_url || "",
                full_name: user.user_metadata?.full_name || "",
              });
            }
          }
          console.log("Sesión iniciada:", session);
          await ensureProfileExists(session.user);
          router.push("/home");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <main className="min-h-[100svh] bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-lg grid grid-cols-1 gap-8 px-4 py-8 md:py-16">
        {/* Branding */}
        <section className="hidden md:flex flex-col justify-center">
          <div className="flex items-center gap-2 text-emerald-700">
            <div className="h-9 w-9 rounded-lg bg-emerald-600/10 flex items-center justify-center">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Dinámico</span>
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight">
            Controla tus gastos de forma simple y rápida
          </h1>
          <p className="mt-3 text-muted-foreground">
            Registra ingresos y gastos, visualiza reportes y toma mejores
            decisiones financieras.
          </p>
          <div className="mt-10 relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-white">
            <Image
              src="/placeholder-mlgof.png"
              alt="Ilustración de finanzas personales con gráficos y móvil"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      </div>
      <OneTapComponent />
    </main>
  );
}
