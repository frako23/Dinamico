import {
  ShoppingCart,
  Utensils,
  Bus,
  Home,
  Wallet,
  PiggyBank,
  Gift,
  Briefcase,
  HeartPulse,
  Gamepad2,
  Coffee,
  Car,
  DollarSign,
  type LucideIcon,
} from "lucide-react"

const map: Record<string, LucideIcon> = {
  ShoppingCart,
  Utensils,
  Bus,
  Home,
  Wallet,
  PiggyBank,
  Gift,
  Briefcase,
  HeartPulse,
  Gamepad2,
  Coffee,
  Car,
  DollarSign,
}

export function getCategoryIcon(name: string): LucideIcon {
  return map[name] || Wallet
}
