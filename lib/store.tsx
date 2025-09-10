"use client";

import type React from "react";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import type { Category, Transaction } from "./types";
import { defaultCategories } from "./default-categories";

type State = {
  transactions: Transaction[];
  categories: Category[];
  currency: string;
  editingId?: string;
};

type Store = State & {
  addTransaction: (input: Omit<Transaction, "id">) => void;
  updateTransaction: (
    id: string,
    patch: Partial<Omit<Transaction, "id">>
  ) => void;
  deleteTransaction: (id: string) => void;
  setCurrency: (c: string) => void;
  resetAll: () => void;
  getBalanceForRange: (
    start: Date,
    end: Date
  ) => { income: number; expense: number; balance: number };
  setEditing: (id?: string) => void;
  transactionById: (id: string) => Transaction | undefined;
  clearEditing: () => void;
};

const KEY = "dinamico:v1";

function initState(): State {
  if (typeof window === "undefined")
    return {
      transactions: [],
      categories: [],
      currency: "Bs",
      editingId: undefined,
    };

  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}

  // datos de ejemplo solo en cliente
  const now = new Date();
  const iso = (d: Date) => d.toISOString();
  const sample: Transaction[] = [
    {
      id: "t1",
      type: "income",
      amount: 25000,
      categoryId: "salary",
      date: "2025-09-01T00:00:00.000Z",
      note: "Nómina",
      accountId: "Banco",
    },
    {
      id: "t2",
      type: "expense",
      amount: 1200,
      categoryId: "coffee",
      date: "2025-09-10T12:00:00.000Z",
      note: "Cappuccino",
      accountId: "Tarjeta",
    },
  ];

  return {
    transactions: sample,
    categories: defaultCategories,
    currency: "Bs",
    editingId: undefined,
  };
}

type Listener = () => void;

class LocalStore {
  private state: State;
  private listeners = new Set<Listener>();
  constructor() {
    this.state = initState();
  }
  getState() {
    return this.state;
  }
  setState(next: Partial<State>) {
    this.state = { ...this.state, ...next };
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(KEY, JSON.stringify(this.state));
      }
    } catch (e) {
      console.error("Error guardando en localStorage:", e);
    }
    this.emit();
  }

  emit() {
    for (const l of this.listeners) l();
  }
  subscribe(l: Listener) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }
}

const StoreContext = createContext<LocalStore | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<LocalStore>(new LocalStore());
  if (!ref.current) ref.current = new LocalStore();
  return (
    <StoreContext.Provider value={ref.current}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): Store {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Store not found");
  const state = useSyncExternalStore(
    store.subscribe.bind(store),
    store.getState.bind(store),
    store.getState.bind(store)
  );

  const persist = useCallback(
    (patch: Partial<State>) => {
      store.setState(patch);
    },
    [store]
  );

  const addTransaction = useCallback(
    (input: Omit<Transaction, "id">) => {
      const id = crypto?.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
      persist({ transactions: [{ id, ...input }, ...state.transactions] });
    },
    [persist, state.transactions]
  );

  const updateTransaction = useCallback(
    (id: string, patch: Partial<Omit<Transaction, "id">>) => {
      persist({
        transactions: state.transactions.map((t) =>
          t.id === id ? { ...t, ...patch } : t
        ),
      });
    },
    [persist, state.transactions]
  );

  const deleteTransaction = useCallback(
    (id: string) => {
      persist({ transactions: state.transactions.filter((t) => t.id !== id) });
    },
    [persist, state.transactions]
  );

  const setCurrency = useCallback(
    (c: string) => persist({ currency: c }),
    [persist]
  );

  const resetAll = useCallback(() => {
    persist({
      transactions: [],
      categories: defaultCategories,
      currency: "VES",
      editingId: undefined,
    });
  }, [persist]);

  const getBalanceForRange = useCallback(
    (start: Date, end: Date) => {
      const s = start.getTime();
      const e = end.getTime();
      let income = 0;
      let expense = 0;
      for (const t of state.transactions) {
        const d = new Date(t.date).getTime();
        if (d < s || d > e) continue;
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
      }
      return { income, expense, balance: income - expense };
    },
    [state.transactions]
  );

  const setEditing = useCallback(
    (id?: string) => persist({ editingId: id }),
    [persist]
  );
  const clearEditing = useCallback(
    () => persist({ editingId: undefined }),
    [persist]
  );
  const transactionById = useCallback(
    (id: string) => state.transactions.find((t) => t.id === id),
    [state.transactions]
  );

  return useMemo(
    () => ({
      ...state,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      setCurrency,
      resetAll,
      getBalanceForRange,
      setEditing,
      transactionById,
      clearEditing,
    }),
    [
      state,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      setCurrency,
      resetAll,
      getBalanceForRange,
      setEditing,
      transactionById,
      clearEditing,
    ]
  );
}
