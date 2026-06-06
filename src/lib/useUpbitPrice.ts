import { useEffect, useRef, useState } from "react";

export type UpbitInfo = {
  price: number;
  /** signed 24h change rate, e.g. -0.0054 */
  changeRate: number;
  change: "RISE" | "FALL" | "EVEN";
  /** recent daily closes (oldest → newest) for a sparkline */
  spark: number[];
};

/**
 * Polls Upbit's public quotation API (CORS-open) for live KRW prices.
 * `markets` must be a stable reference (define it at module scope).
 */
export function useUpbitPrice(markets: string[], intervalMs = 7000) {
  const [data, setData] = useState<Record<string, UpbitInfo>>({});
  const sparkRef = useRef<Record<string, number[]>>({});
  const key = markets.join(",");

  useEffect(() => {
    let cancelled = false;

    // Sparkline source — 14 daily closes, fetched once per market.
    markets.forEach(async (m) => {
      try {
        const res = await fetch(`https://api.upbit.com/v1/candles/days?market=${m}&count=14`);
        const candles = await res.json();
        if (cancelled || !Array.isArray(candles)) return;
        const spark = candles.map((c: { trade_price: number }) => c.trade_price).reverse();
        sparkRef.current[m] = spark;
        setData((prev) => (prev[m] ? { ...prev, [m]: { ...prev[m], spark } } : prev));
      } catch {
        /* offline / transient — ignore */
      }
    });

    const poll = async () => {
      try {
        const res = await fetch(`https://api.upbit.com/v1/ticker?markets=${key}`);
        const arr = await res.json();
        if (cancelled || !Array.isArray(arr)) return;
        setData((prev) => {
          const next = { ...prev };
          for (const t of arr) {
            next[t.market] = {
              price: t.trade_price,
              changeRate: t.signed_change_rate,
              change: t.change,
              spark: sparkRef.current[t.market] ?? prev[t.market]?.spark ?? [],
            };
          }
          return next;
        });
      } catch {
        /* keep last known values */
      }
    };

    poll();
    const id = setInterval(poll, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, intervalMs]);

  return data;
}
