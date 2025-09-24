import { Category } from "@/lib/db";
import { ExpenseTransaction, SubCategory, UserAccount } from "@/types/types";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Transacciones
export async function fetchExpenses(userId: string) {
  const { data, error } = await supabase
    .from("expense_transaction")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as ExpenseTransaction[];
}

export async function insertExpense(
  tx: Omit<ExpenseTransaction, "id" | "created_at">
) {
  const { data, error } = await supabase
    .from("expense_transaction")
    .insert([tx])
    .select();

  if (error) throw error;
  return data?.[0] as ExpenseTransaction;
}

export async function updateExpense(
  id: number,
  patch: Partial<ExpenseTransaction>
) {
  const { error } = await supabase
    .from("expense_transaction")
    .update(patch)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteExpense(id: number) {
  const { error } = await supabase
    .from("expense_transaction")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// Categorías y subcategorías
export async function fetchCategories() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  return data as Category[];
}

export async function fetchSubCategories() {
  const { data, error } = await supabase.from("subCategories").select("*");
  if (error) throw error;
  return data as SubCategory[];
}

// Cuentas del usuario
export async function fetchUserAccounts(userId: string) {
  const { data, error } = await supabase
    .from("userAccounts")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data as UserAccount[];
}
