import type { Category } from "./types"

export const defaultCategories: Category[] = [
  { id: "groceries", name: "Supermercado", type: "expense", color: "#059669", icon: "ShoppingCart" },
  { id: "restaurants", name: "Comida fuera", type: "expense", color: "#10b981", icon: "Utensils" },
  { id: "transport", name: "Transporte", type: "expense", color: "#14b8a6", icon: "Bus" },
  { id: "rent", name: "Renta", type: "expense", color: "#0ea5e9", icon: "Home" },
  { id: "health", name: "Salud", type: "expense", color: "#ef4444", icon: "HeartPulse" },
  { id: "fun", name: "Ocio", type: "expense", color: "#f59e0b", icon: "Gamepad2" },
  { id: "coffee", name: "Café", type: "expense", color: "#a16207", icon: "Coffee" },
  { id: "car", name: "Auto", type: "expense", color: "#2563eb", icon: "Car" },
  { id: "gifts", name: "Regalos", type: "expense", color: "#ec4899", icon: "Gift" },
  { id: "salary", name: "Salario", type: "income", color: "#059669", icon: "Briefcase" },
  { id: "freelance", name: "Freelance", type: "income", color: "#10b981", icon: "DollarSign" },
  { id: "other-income", name: "Otros ingresos", type: "income", color: "#14b8a6", icon: "PiggyBank" },
]
