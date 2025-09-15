import { useEffect, useState } from "react";

type CurrencyRates = {
  fuente: string;
  nombre: string;
  compra: string | null;
  venta: string | null;
  promedio: number;
  fechaActualizacion: Date;
};

export const useCurrencyRates = () => {
  const currencyRateURL = "https://ve.dolarapi.com/v1/dolares";

  const [rate, setRate] = useState<number | null>(null);
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(currencyRateURL);
        const data = await response.json();
        setRate(data[0].promedio);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      }
    };

    fetchRates();
  }, []);

  return { rate };
};
