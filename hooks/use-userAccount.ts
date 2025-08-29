// hooks/useUserAccount.ts
import { useEffect, useState } from "react";

export function useUserAccount(user_id: string | null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user_id) return;

    const fetchUserAccount = async () => {
      try {
        const res = await fetch(`/api/userAccount?user_id=${user_id}`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Error desconocido");
        setData(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAccount();
  }, [user_id]);

  return { data, loading, error };
}
