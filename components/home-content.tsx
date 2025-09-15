"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionsList } from "@/components/transactions-list";
import { AddTransaction } from "@/components/transaction-add";
import { useStore } from "@/lib/store";
import { formatCurrency, startOfMonth, endOfMonth } from "@/lib/format";
import { cn } from "@/lib/utils";

export function HomeContent({
  currentMonth,
  accountId,
  setAccountId,
  openAdd,
  setOpenAdd,
  rate,
}: {
  currentMonth: Date;
  accountId: string;
  setAccountId: (id: string) => void;
  openAdd: boolean;
  setOpenAdd: (v: boolean) => void;
  rate?: number;
}) {
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

  return (
    <>
      <section className="px-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground">Saldo</div>
              <div
                className={cn(
                  "text-2xl font-semibold",
                  summary.balance >= 0 ? "text-emerald-500" : "text-red-600"
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

      <AddTransaction open={openAdd} onOpenChange={setOpenAdd} newRate={rate} />
    </>
  );
}
