"use client";

import { Fragment, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateShort } from "@/lib/format";
import { useStore } from "@/lib/store";
import { getCategoryIcon } from "@/lib/icons";
import type { Transaction } from "@/lib/types";
import { Trash2, Edit } from "lucide-react";

type Props = {
  transactions?: Transaction[];
  filter?: "all" | "income" | "expense";
};

export function TransactionsList({ transactions = [], filter = "all" }: Props) {
  const { categories, currency, deleteTransaction, setEditing } = useStore();

  const items = useMemo(() => {
    return (transactions || [])
      .filter((t) => (filter === "all" ? true : t.type === filter))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filter]);

  const grouped = useMemo(() => {
    const map = new Map<string, { total: number; items: Transaction[] }>();
    for (const t of items) {
      const key = formatDateShort(new Date(t.date));
      const prev = map.get(key) || { total: 0, items: [] };
      map.set(key, {
        total: prev.total + (t.type === "income" ? t.amount : -t.amount),
        items: [...prev.items, t],
      });
    }
    return Array.from(map.entries());
  }, [items]);

  if (!items.length) {
    return (
      <div className="text-sm text-muted-foreground text-center py-10">
        Sin movimientos para este periodo.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {grouped.map(([date, group]) => (
        <Fragment key={date}>
          <div className="flex items-center justify-between text-xs text-muted-foreground pl-1">
            <span>{date}</span>
            <span
              className={group.total >= 0 ? "text-emerald-500" : "text-red-600"}
            >
              {formatCurrency(group.total, currency)}
            </span>
          </div>
          <Card className="divide-y">
            {group.items.map((t) => {
              const cat = categories.find((c) => c.id === t.categoryId);
              const Icon = getCategoryIcon(cat?.icon || "Wallet");
              return (
                <div key={t.id} className="flex items-center gap-3 p-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border bg-white"
                    style={{ borderColor: cat?.color || "#e5e7eb" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: cat?.color || "#111827" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium truncate">
                        {cat?.name || "Categoría"}
                      </div>
                      <div
                        className={
                          t.type === "income"
                            ? "text-emerald-500"
                            : "text-red-600"
                        }
                      >
                        {(t.type === "income" ? "+" : "-") +
                          formatCurrency(t.amount, currency)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.note ? (
                        <span className="truncate">{t.note}</span>
                      ) : (
                        <span className="opacity-70">Sin nota</span>
                      )}
                      {t.accountId ? (
                        <Badge variant="secondary" className="ml-2">
                          {t.accountId}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Editar"
                      onClick={() => setEditing(t.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Eliminar"
                      onClick={() => deleteTransaction(t.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </Card>
        </Fragment>
      ))}
    </div>
  );
}
