"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import { set } from "react-hook-form";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  newRate?: number;
};

export function AddTransaction({
  open = false,
  onOpenChange = () => {},
  newRate,
}: Props) {
  const isMobile = useIsMobile();
  const {
    categories,
    currency,
    addTransaction,
    editingId,
    transactionById,
    clearEditing,
    updateTransaction,
  } = useStore();

  const isEditing = !!editingId;
  const editing = transactionById(editingId || "");

  const [type, setType] = useState<"income" | "expense">("expense");
  const [amountUsd, setAmountUsd] = useState<string>("");
  const [amountBs, setAmountBs] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [accountId, setAccountId] = useState<string>("Banco Bs");
  const [rate, setRate] = useState<string>(newRate ? newRate.toString() : "");

  useEffect(() => {
    if (editing) {
      setType(editing.type);
      setAmountUsd(editing.amountUsd.toString());
      setAmountBs(editing.amountBs.toString());
      setCategoryId(editing.categoryId);
      setDate(editing.date.slice(0, 10));
      setNote(editing.note || "");
      setAccountId(editing.accountId || "Banco Bs");
      onOpenChange(true);
      setRate(editing.rate.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingId]);

  const cats = useMemo(
    () => categories.filter((c) => c.type === type),
    [categories, type]
  );

  function reset() {
    setType("expense");
    setAmountUsd("");
    setAmountBs("");
    setCategoryId("");
    setDate(new Date().toISOString().slice(0, 10));
    setNote("");
    setAccountId("Efectivo");
    setRate("");
  }

  useEffect(() => {
    if (open && !isEditing && !date) {
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [open, isEditing, date]);

  function closeAll() {
    onOpenChange(false);
    if (isEditing) clearEditing();
    reset();
  }

  function submit() {
    const valueUsd = Number.parseFloat(amountUsd);
    const valueBs = Number.parseFloat(amountBs);
    if (!valueUsd || !valueBs || !categoryId || !date) return;
    if (isEditing && editing) {
      updateTransaction(editing.id, {
        type,
        amountUsd: valueUsd,
        amountBs: valueBs,
        categoryId,
        date: new Date(date).toISOString(),
        note,
        accountId,
        rate: Number.parseFloat(rate) || 0,
      });
    } else {
      addTransaction({
        type,
        amountUsd: valueUsd,
        amountBs: valueBs,
        categoryId,
        date: new Date(date).toISOString(),
        note,
        accountId,
        rate: Number.parseFloat(rate) || 0,
      });
    }
    closeAll();
  }

  const content = (
    <div className="grid gap-3 p-4">
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={type === "expense" ? "default" : "outline"}
          className={type === "expense" ? "bg-red-600 hover:bg-red-700" : ""}
          onClick={() => setType("expense")}
        >
          Gasto
        </Button>
        <Button
          variant={type === "income" ? "default" : "outline"}
          className={
            type === "income" ? "bg-emerald-600 hover:bg-emerald-700" : ""
          }
          onClick={() => setType("income")}
        >
          Ingreso
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="grid gap-1.5">
          <Label htmlFor="amount">Monto ({currency})</Label>
          <Input
            id="amount"
            inputMode="decimal"
            placeholder="0.00"
            value={amountBs}
            onChange={(e) => setAmountBs(e.target.value)}
          />
          <div className="text-xs text-muted-foreground">
            {amountBs ? formatCurrency(Number(amountBs) || 0, currency) : " "}
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="amount">Monto (US$)</Label>
          <Input
            id="amount"
            inputMode="decimal"
            placeholder="0.00"
            value={amountUsd}
            onChange={(e) => setAmountUsd(e.target.value)}
          />
          <div className="text-xs text-muted-foreground">
            {amountUsd ? formatCurrency(Number(amountUsd) || 0, currency) : " "}
          </div>
        </div>

         <div className="grid gap-1">
          <Label htmlFor="rate">Tasa</Label>
          <Input
            id="rate"
            inputMode="decimal"
            placeholder="0.00"
            value={rate}
            disabled
          />
          <div className="text-xs text-muted-foreground">
            {rate ? formatCurrency(Number(rate) || 0, "VES") : " "}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        <div className="grid gap-1.5 col-span-3">
          <Label>Categoría</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent>
              {cats.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5 col-span-2">
          <Label>Cuenta</Label>
          <Select value={accountId} onValueChange={setAccountId}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Banco Bs">Banco Bs</SelectItem>
              <SelectItem value="Banco $">Banco $</SelectItem>
              <SelectItem value="Efectivo $">Efectivo $</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5 col-span-2">
          <Label htmlFor="date">Fecha</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="note">Nota</Label>
        <Textarea
          id="note"
          rows={3}
          placeholder="Escribe una nota (opcional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          onClick={submit}
        >
          {isEditing ? "Guardar" : "Añadir"}
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={closeAll}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer
        open={open || isEditing}
        onOpenChange={(o) => (o ? onOpenChange(o) : closeAll())}
      >
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>
              {isEditing ? "Editar movimiento" : "Nuevo movimiento"}
            </DrawerTitle>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open || isEditing}
      onOpenChange={(o) => (o ? onOpenChange(o) : closeAll())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar movimiento" : "Nuevo movimiento"}
          </DialogTitle>
          <DialogDescription>
            Registra un {type === "income" ? "ingreso" : "gasto"} en Dinámico.
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
