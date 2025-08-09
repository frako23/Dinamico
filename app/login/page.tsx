"use client";

import Link from "next/link";
import Image from "next/image";
import { Chrome, Wallet, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="min-h-[100svh] bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8 md:py-16">
        {/* Left side: Brand and illustration */}
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

        {/* Right side: Login card */}
        <section className="flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Inicia sesión</CardTitle>
              <CardDescription>
                Accede para sincronizar tus datos en dispositivos.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* Google OAuth button (UI only) */}
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full justify-center gap-2 bg-transparent"
                onClick={(e) => {
                  e.preventDefault();
                  // Sin lógica OAuth: solo UI
                }}
                aria-label="Continuar con Google"
              >
                <Chrome className="h-5 w-5" />
                <span>Continuar con Google</span>
              </Button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    o
                  </span>
                </div>
              </div>

              <Button
                asChild
                className="h-11 bg-emerald-600 hover:bg-emerald-700"
              >
                <Link href="/home">
                  Probar como invitado
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 text-xs text-muted-foreground">
              <p>
                Al continuar, aceptas nuestros{" "}
                <a
                  className="underline underline-offset-2 hover:text-foreground"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Términos
                </a>{" "}
                y{" "}
                <a
                  className="underline underline-offset-2 hover:text-foreground"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Política de privacidad
                </a>
                .
              </p>
              <p>La autenticación de Google se añadirá más adelante.</p>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
}
