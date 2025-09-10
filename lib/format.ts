export function formatCurrency(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("es-VE", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currencyDisplay: "symbol", // muestra el símbolo en lugar del código
    }).format(value);
  } catch {
    return new Intl.NumberFormat("es-VE", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currencyDisplay: "symbol",
    }).format(value);
  }
}

export function monthLabel(date: Date) {
  return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
}

export function formatDateShort(date: Date) {
  return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function addMonths(date: Date, count: number) {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}
