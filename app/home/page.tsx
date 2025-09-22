"use client";

import { useState, useEffect } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { monthLabel, addMonths, formatCurrency } from "@/lib/format";
import { useUserAccount } from "@/hooks/use-userAccount";
import { HomeContent } from "@/components/home-content";
import { useCurrencyRates } from "@/hooks/use-currencyRates";
import { Input } from "@/components/ui/input";
import { useCalculation } from "@/hooks/use-calculation";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { rate } = useCurrencyRates();
  const {
    bsValue,
    setBsValue,
    usdValue,
    setUsdValue,
    handleBsChange,
    handleUsdChange,
  } = useCalculation();
  const [userId, setUserId] = useState<string | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [accountId, setAccountId] = useState<string>("Efectivo");
  const [editing, setEditing] = useState<"bs" | "usd" | null>(null);
  const { transactions, currency, getBalanceForRange } = useStore();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const { data, loading, error } = useUserAccount(userId);

  return (
    <main className="mx-auto max-w-3xl pb-24">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-transparent border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight flex flex-col">
            <span>Dinámico</span>
            <span className="text-sm">Bs {rate?.toFixed(2)}</span>
          </div>

          <div className="flex gap-2 items-end w-48">
            {/* <Select value={accountId} onValueChange={setAccountId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una cuenta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Banco Bs">Banco Bs</SelectItem>
                <SelectItem value="Banco $">Banco $</SelectItem>
                <SelectItem value="Efectivo $">Efectivo $</SelectItem>
              </SelectContent>
            </Select> */}
            <div className="grid gap-1">
              <Label htmlFor="amount">Monto (VES)</Label>
              <Input
                id="amount"
                inputMode="decimal"
                placeholder="0.00"
                value={bsValue ?? 0}
                onChange={handleBsChange}
              />
              <div className="text-xs text-muted-foreground">
                {bsValue ? formatCurrency(Number(bsValue) || 0, "VES") : " "}
              </div>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="amount">Monto (US$)</Label>
              <Input
                id="amount"
                inputMode="decimal"
                placeholder="0.00"
                value={usdValue ?? 0}
                onChange={handleUsdChange}
              />
              <div className="text-xs text-muted-foreground">
                {usdValue
                  ? formatCurrency(Number(usdValue) || 0, currency)
                  : " "}
              </div>
            </div>
          </div>

          {/* <Button
            size="lg"
            variant="default"
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => setOpenAdd(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Añadir
          </Button> */}
        </div>
      </header>

      <section className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Mes anterior"
            onClick={() => setCurrentMonth((d) => addMonths(d, -1))}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="text-sm font-medium text-muted-foreground">
            {monthLabel(currentMonth)}
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Mes siguiente"
            onClick={() => setCurrentMonth((d) => addMonths(d, 1))}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {mounted && (
        <HomeContent
          currentMonth={currentMonth}
          accountId={accountId}
          setAccountId={setAccountId}
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
          rate={rate ?? undefined}
        />
      )}
    </main>
  );
}
