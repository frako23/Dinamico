import { useEffect, useState } from "react";
import { useCurrencyRates } from "./use-currencyRates";

export const useCalculation = () => {
  const { rate } = useCurrencyRates();
  const [bsValue, setBsValue] = useState<number | null>(null);
  const [usdValue, setUsdValue] = useState<number | null>(null);

  const handleBsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (rate === null) return
    setBsValue(value);
      setUsdValue(parseFloat((value / rate).toFixed(2)));
  };

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setUsdValue(value);
    if (rate === null) return

    setBsValue(parseFloat((value * rate).toFixed(2)));
  };

  return {
    bsValue,
    setBsValue,
    usdValue,
    setUsdValue,
    rate: rate ?? undefined,
    handleBsChange,
    handleUsdChange,
  };
};
