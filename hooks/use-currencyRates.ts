import { useEffect, useState } from "react";

export const useCurrencyRates = () => {
  const currencyRateURL = "https://ve.dolarapi.com/v1/dolares";

  const [rates, setRates] = useState<object[] | null>(null);
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(currencyRateURL);
        const data = await response.json();
        setRates(data);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      }
    };

    fetchRates();
  }, []);

  return { rates };
};
