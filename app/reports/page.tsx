"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { formatCurrency, monthLabel, startOfMonth, endOfMonth, addMonths } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ReportsPage() {
  const { categories, transactions, currency } = useStore()
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const range = useMemo(() => ({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) }), [currentMonth])

  const data = useMemo(() => {
    const s = range.start.getTime()
    const e = range.end.getTime()
    const byCat = new Map<string, number>()
    for (const t of transactions) {
      const d = new Date(t.date).getTime()
      if (d < s || d > e) continue
      if (t.type !== "expense") continue
      byCat.set(t.categoryId, (byCat.get(t.categoryId) || 0) + t.amount)
    }
    const rows = Array.from(byCat.entries()).map(([catId, value]) => {
      const cat = categories.find((c) => c.id === catId)
      return { id: catId, label: cat?.name || "Otra", value, color: cat?.color || "#9ca3af" }
    })
    const total = rows.reduce((sum, r) => sum + r.value, 0)
    return { rows, total }
  }, [transactions, categories, range])

  return (
    <main className="mx-auto max-w-3xl pb-24 px-4">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">Reportes</div>
        </div>
      </header>

      <section className="mt-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Mes anterior"
            onClick={() => setCurrentMonth((d) => addMonths(d, -1))}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="text-sm font-medium text-muted-foreground">{monthLabel(currentMonth)}</div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Mes siguiente"
            onClick={() => setCurrentMonth((d) => addMonths(d, 1))}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle>Gasto por categoría</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6 items-center">
            <Donut data={data.rows} total={data.total} />
            <div className="grid gap-2">
              {data.rows.length === 0 ? (
                <div className="text-sm text-muted-foreground">No hay datos en este periodo.</div>
              ) : (
                data.rows
                  .sort((a, b) => b.value - a.value)
                  .map((r) => (
                    <div key={r.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: r.color }} />
                        <span>{r.label}</span>
                      </div>
                      <div className="font-medium">{formatCurrency(r.value, currency)}</div>
                    </div>
                  ))
              )}
              <div className="border-t pt-2 mt-1 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-semibold">{formatCurrency(data.total, currency)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function Donut({ data, total }: { data: { label: string; value: number; color: string }[]; total: number }) {
  const size = 180
  const stroke = 28
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} role="img" aria-label="Gráfico de gasto por categoría">
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle r={radius} fill="transparent" stroke="#e5e7eb" strokeWidth={stroke} />
          {data.map((d, i) => {
            const fraction = total > 0 ? d.value / total : 0
            const dash = fraction * circumference
            const circle = (
              <circle
                key={i}
                r={radius}
                fill="transparent"
                stroke={d.color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
              />
            )
            offset += dash
            return circle
          })}
        </g>
      </svg>
      <div className="mt-2 text-sm text-muted-foreground">{total > 0 ? "Distribución" : "Sin datos"}</div>
    </div>
  )
}
