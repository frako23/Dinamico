"use client";

import { useMemo, useState, useEffect, use } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import {
  formatCurrency,
  monthLabel,
  startOfMonth,
  endOfMonth,
  addMonths,
} from "@/lib/format";
import { TransactionsList } from "../../components/transactions-list";
import { AddTransaction } from "../../components/transaction-add";
import { BottomNav } from "../../components/navigation-bottom";
import { useUserAccount } from "@/hooks/use-userAccount";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ThemeToggle from "@/components/ui/themeToggle";

export default function HomePage() {
  const [userId, setUserId] = useState<string | null>(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [accountId, setAccountId] = useState<string>("Efectivo");

  const { transactions, currency, getBalanceForRange } = useStore();

  const range = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return { start, end };
  }, [currentMonth]);

  const summary = useMemo(() => {
    return getBalanceForRange(range.start, range.end);
  }, [getBalanceForRange, range]);

  const monthTx = useMemo(() => {
    const s = range.start.getTime();
    const e = range.end.getTime();
    return transactions.filter((t) => {
      const d = new Date(t.date).getTime();
      return d >= s && d <= e;
    });
  }, [transactions, range]);

  const { data, loading, error } = useUserAccount(userId);

  return (
    <main className="mx-auto max-w-3xl pb-24">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">Dinámico</div>
          <div className="grid gap-1.5">
            <Select value={accountId} onValueChange={setAccountId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una cuenta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Banco Bs">Banco Bs</SelectItem>
                <SelectItem value="Banco $">Banco $</SelectItem>
                <SelectItem value="Efectivo $">Efectivo $</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            size="lg"
            variant="default"
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => setOpenAdd(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Añadir
          </Button>
          <ThemeToggle />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground">Saldo</div>
              <div
                className={cn(
                  "text-2xl font-semibold",
                  summary.balance >= 0 ? "text-emerald-00" : "text-red-600"
                )}
              >
                {formatCurrency(summary.balance, currency)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground">Ingresos</div>
              <div className="text-2xl font-semibold text-emerald-500">
                {formatCurrency(summary.income, currency)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground">Gastos</div>
              <div className="text-2xl font-semibold text-red-600">
                {formatCurrency(summary.expense, currency)}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 mt-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="all">Todo</TabsTrigger>
            <TabsTrigger value="income">Ingresos</TabsTrigger>
            <TabsTrigger value="expense">Gastos</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-3">
            <TransactionsList transactions={monthTx} filter="all" />
          </TabsContent>
          <TabsContent value="income" className="mt-3">
            <TransactionsList transactions={monthTx} filter="income" />
          </TabsContent>
          <TabsContent value="expense" className="mt-3">
            <TransactionsList transactions={monthTx} filter="expense" />
          </TabsContent>
        </Tabs>
      </section>

      <AddTransaction open={openAdd} onOpenChange={setOpenAdd} />

      <BottomNav />
    </main>
  );
}
