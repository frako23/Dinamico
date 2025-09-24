import { ExpenseTransaction } from "@/types/types";
import {
  fetchExpenses,
  insertExpense,
} from "@/utils/supabase/supabase-expense";
import { useEffect, useState } from "react";
import { useSession } from '@supabase/auth-helpers-react';


export function useExpenses() {
  const session = useSession();
  const userId = session?.user?.id;
  const [expenses, setExpenses] = useState<ExpenseTransaction[]>([]);

  useEffect(() => {
    if (userId) {
      fetchExpenses(userId).then(setExpenses).catch(console.error);
    }
  }, [userId]);

  const addExpense = async (
    tx: Omit<ExpenseTransaction, "id" | "created_at">
  ) => {
    const newTx = await insertExpense(tx);
    setExpenses((prev) => [newTx, ...prev]);
  };

  return { expenses, addExpense };
}
