// db.ts
import Dexie, { type EntityTable } from "dexie";

interface Transaction {
  id: number;
  created_at: string;
  subcategory: string;
  exchangeRate: number;
  usdAmount: number;
  bsAmount: number;
  transactionType: "income" | "expense";
  walletBalanceAfter: number;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
  icon: string;
}

const db = new Dexie("DinamicoDB") as Dexie & {
  transactions: EntityTable<Transaction, "id">;
  categories: EntityTable<Category, "id">;
  subcategories: EntityTable<Subcategory, "id">;
};

db.version(1).stores({
  transactions: "++id, created_at, subcategory, transactionType",
  categories: "++id, name, icon, color",
  subcategories: "++id, name, categoryId, icon",
});

export type { Transaction, Category, Subcategory };
export { db };
