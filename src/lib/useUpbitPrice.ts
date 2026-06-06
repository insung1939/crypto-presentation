import { useEffect, useSyncExternalStore } from "react";

export type UpbitInfo = {
  price: number;
  /** signed 24h change rate, e.g. -0.0054 */
  changeRate: number;
  change: "RISE" | "FALL" | "EVEN";
  /** recent daily closes (oldest → newest) for a sparkline */
  spark: number[];
};

type Snapshot = Record<string, UpbitInfo>;

const MARKETS = ["KRW-BTC", "KRW-ETH"];
const CACHE_KEY = "upbit_cache_v1";
const INTERVAL = 7000;

/* ───────── singleton store ───────── */

function hydrate(): Snapshot {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") return parsed as Snapshot;
    }
  } catch {
    /* ignore */
  }
  return {};
}

let state: Snapshot = hydrate();
const sparkCache: Record<string, number[]> = Object.fromEntries(
  Object.entries(state).map(([k, v]) => [k, v.spark ?? []]),
);
const listeners = new Set<() => void>();
let started = false;

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota / private mode */
  }
}

async function fetchSparks() {
  await Promise.all(
    MARKETS.map(async (m) => {
      try {
        const res = await fetch(`https://api.upbit.com/v1/candles/days?market=${m}&count=14`);
        const candles = await res.json();
        if (!Array.isArray(candles)) return;
        const spark = candles.map((c: { trade_price: number }) => c.trade_price).reverse();
        sparkCache[m] = spark;
        if (state[m]) state = { ...state, [m]: { ...state[m], spark } };
      } catch {
        /* ignore */
      }
    }),
  );
  emit();
  persist();
}

async function poll() {
  try {
    const res = await fetch(`https://api.upbit.com/v1/ticker?markets=${MARKETS.join(",")}`);
    const arr = await res.json();
    if (!Array.isArray(arr)) return;
    const next: Snapshot = { ...state };
    for (const t of arr) {
      next[t.market] = {
        price: t.trade_price,
        changeRate: t.signed_change_rate,
        change: t.change,
        spark: sparkCache[t.market] ?? state[t.market]?.spark ?? [],
      };
    }
    state = next;
    emit();
    persist();
  } catch {
    /* keep last known values */
  }
}

/** Begin polling Upbit. Idempotent — safe to call from multiple mounts. */
export function startUpbitPolling() {
  if (started || typeof window === "undefined") return;
  started = true;
  fetchSparks();
  poll();
  window.setInterval(poll, INTERVAL);
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): Snapshot {
  return state;
}

/**
 * Read the live Upbit prices. Data is prefetched into a shared store the
 * moment the deck mounts (see startUpbitPolling), so this returns cached
 * values instantly and then updates live.
 */
export function useUpbitPrice(): Snapshot {
  useEffect(() => {
    startUpbitPolling();
  }, []);
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
