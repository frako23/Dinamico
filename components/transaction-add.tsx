"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import { useIsMobile } from "@/hooks/use-mobile"
import { useStore } from "@/lib/store"
import { formatCurrency } from "@/lib/format"

type Props = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AddTransaction({ open = false, onOpenChange = () => {} }: Props) {
  const isMobile = useIsMobile()
  const { categories, currency, addTransaction, editingId, transactionById, clearEditing, updateTransaction } =
    useStore()

  const isEditing = !!editingId
  const editing = transactionById(editingId || "")

  const [type, setType] = useState<"income" | "expense">("expense")
  const [amount, setAmount] = useState<string>("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [note, setNote] = useState<string>("")
  const [accountId, setAccountId] = useState<string>("Efectivo")

  useEffect(() => {
    if (editing) {
      setType(editing.type)
      setAmount(editing.amount.toString())
      setCategoryId(editing.categoryId)
      setDate(editing.date.slice(0, 10))
      setNote(editing.note || "")
      setAccountId(editing.accountId || "Efectivo")
      onOpenChange(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingId])

  const cats = useMemo(() => categories.filter((c) => c.type === type), [categories, type])

  function reset() {
    setType("expense")
    setAmount("")
    setCategoryId("")
    setDate(new Date().toISOString().slice(0, 10))
    setNote("")
    setAccountId("Efectivo")
  }

  useEffect(() => {
    if (open && !isEditing && !date) {
      setDate(new Date().toISOString().slice(0, 10))
    }
  }, [open, isEditing, date])

  function closeAll() {
    onOpenChange(false)
    if (isEditing) clearEditing()
    reset()
  }

  function submit() {
    const value = Number.parseFloat(amount)
    if (!value || !categoryId || !date) return
    if (isEditing && editing) {
      updateTransaction(editing.id, {
        type,
        amount: value,
        categoryId,
        date: new Date(date).toISOString(),
        note,
        accountId,
      })
    } else {
      addTransaction({ type, amount: value, categoryId, date: new Date(date).toISOString(), note, accountId })
    }
    closeAll()
  }

  const content = (
    <div className="grid gap-3 p-4">
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={type === "expense" ? "default" : "outline"}
          className={type === "expense" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
          onClick={() => setType("expense")}
        >
          Gasto
        </Button>
        <Button
          variant={type === "income" ? "default" : "outline"}
          className={type === "income" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
          onClick={() => setType("income")}
        >
          Ingreso
        </Button>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="amount">Monto ({currency})</Label>
        <Input
          id="amount"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="text-xs text-muted-foreground">
          {amount ? formatCurrency(Number(amount) || 0, currency) : " "}
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label>Categoría</Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
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

      <div className="grid gap-1.5">
        <Label>Cuenta</Label>
        <Select value={accountId} onValueChange={setAccountId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una cuenta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Efectivo">Efectivo</SelectItem>
            <SelectItem value="Tarjeta">Tarjeta</SelectItem>
            <SelectItem value="Banco">Banco</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="date">Fecha</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
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
        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={submit}>
          {isEditing ? "Guardar" : "Añadir"}
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent" onClick={closeAll}>
          Cancelar
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open || isEditing} onOpenChange={(o) => (o ? onOpenChange(o) : closeAll())}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{isEditing ? "Editar movimiento" : "Nuevo movimiento"}</DrawerTitle>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open || isEditing} onOpenChange={(o) => (o ? onOpenChange(o) : closeAll())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar movimiento" : "Nuevo movimiento"}</DialogTitle>
          <DialogDescription>Registra un {type === "income" ? "ingreso" : "gasto"} en Dinámico.</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}
