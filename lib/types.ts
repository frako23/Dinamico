export type Transaction = {
  id: string
  type: "income" | "expense"
  amountBs: number
  amountUsd: number
  rate: number
  categoryId: string
  date: string // ISO
  note?: string
  accountId?: string
}

export type Category = {
  id: string
  name: string
  type: "income" | "expense"
  color: string
  icon: string // lucide icon name
}
