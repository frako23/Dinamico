import { useEffect, useState } from "react";
import { useCurrencyRates } from "./use-currencyRates";

export const useCalculation = () => {
  const { rate } = useCurrencyRates();
  const [bsValue, setBsValue] = useState<string>("");
  const [usdValue, setUsdValue] = useState<string>("");

  const handleBsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBsValue(value);

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && typeof rate === "number") {
      setUsdValue((numericValue / rate).toFixed(2));
    } else {
      setUsdValue("");
    }
  };

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsdValue(value);

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && typeof rate === "number") {
      setBsValue((numericValue * rate).toFixed(2));
    } else {
      setBsValue("");
    }
  };

  useEffect(() => {
    if (rate) {
      if (bsValue) {
        const usd = parseFloat(bsValue) / rate;
        setUsdValue(usd.toFixed(2));
      } else {
        setUsdValue("");
      }
    }
  }, [bsValue, rate]);

  useEffect(() => {
    if (rate) {
      if (usdValue) {
        const bs = parseFloat(usdValue) * rate;
        setBsValue(bs.toFixed(2));
      } else {
        setBsValue("");
      }
    }
  }, [usdValue, rate]);

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
