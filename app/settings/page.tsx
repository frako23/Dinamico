"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/themeToggle";

export default function SettingsPage() {
  const { currency, setCurrency, resetAll } = useStore();

  return (
    <main className="mx-auto max-w-3xl pb-24 px-4">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-transparent border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">Ajustes</div>
        </div>
      </header>

      <section className="mt-4 grid gap-4">
        <Card>
          <div>
            <CardHeader>
              <CardTitle>Moneda</CardTitle>
            </CardHeader>
            <CardContent className="max-w-xs">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bs">VEF (Bs)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="ARS">ARS ($)</SelectItem>
                  <SelectItem value="CLP">CLP ($)</SelectItem>
                  <SelectItem value="COP">COP ($)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </div>
          <div>
            <CardHeader>
              <CardTitle>Tema</CardTitle>
            </CardHeader>
            <CardContent className="max-w-xs">
              <ThemeToggle />
            </CardContent>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Datos</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button variant="destructive" onClick={resetAll}>
              Restablecer todo
            </Button>
            <p className="text-xs text-muted-foreground">
              Esto borrará todas las transacciones y restaurará las categorías
              por defecto.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
