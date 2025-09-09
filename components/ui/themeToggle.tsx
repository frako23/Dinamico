// components/ThemeToggle.tsx
import { useTheme } from "@/hooks/use-theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition"
    >
      {theme === "dark" ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
    </button>
  );
}
