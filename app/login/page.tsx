"use client";

import { useRouter } from "next/navigation";
import { login, signup } from "./actions";
import Image from "next/image";
import { Wallet } from "lucide-react";
import OneTapComponent from "@/components/auth/OneTapComponent";

export default function LoginPage() {
  const router = useRouter();
  return (
    <main className="min-h-[100svh] bg-gradient-to-b from-emerald-50 to-white">
      <OneTapComponent />
      <div className="mx-auto max-w-lg grid grid-cols-1 gap-8 px-4 py-8 md:py-16">
        {/* Branding */}
        <section className="flex flex-col justify-center">
          {/* <div className="flex items-center gap-2 text-emerald-700">
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
          </p> */}
          <div className="mt-10 relative aspect-[1/1] w-full overflow-hidden rounded-xl border bg-white">
            <Image
              src="/dinamico_login.png"
              alt="Ilustración de finanzas personales con gráficos y móvil"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      </div>
    </main>
  );
}
