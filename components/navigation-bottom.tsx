"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PieChart, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddTransaction } from "./transaction-add";

export function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className=" fixed bottom-0 inset-x-0 backdrop-blur ">
        <div className="mx-auto max-w-3xl  px-6 py-2 flex items-center justify-between border-t z-40">
          <Link
            href="/"
            className={`flex flex-col items-center text-xs ${
              pathname === "/" ? "text-emerald-700" : "text-muted-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
            Inicio
          </Link>
          <Button
            className="rounded-full h-12 w-12 p-0 bg-emerald-600 hover:bg-emerald-700"
            onClick={() => setOpen(true)}
            aria-label="Añadir"
          >
            <Plus className="h-6 w-6 text-white" />
          </Button>
          <Link
            href="/reports"
            className={`flex flex-col items-center text-xs ${
              pathname?.startsWith("/reports")
                ? "text-emerald-700"
                : "text-muted-foreground"
            }`}
          >
            <PieChart className="h-5 w-5" />
            Reportes
          </Link>
          <Link
            href="/settings"
            className={`flex flex-col items-center text-xs ${
              pathname?.startsWith("/settings")
                ? "text-emerald-700"
                : "text-muted-foreground"
            }`}
          >
            <Settings className="h-5 w-5" />
            Ajustes
          </Link>
        </div>
      </nav>
      <AddTransaction open={open} onOpenChange={setOpen} />
    </>
  );
}
