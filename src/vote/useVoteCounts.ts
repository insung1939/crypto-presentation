import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { CompanyKey, companies } from "./companies";

export type Counts = Record<CompanyKey, number>;
export type FreshSignal = { key: CompanyKey; at: number } | null;

const zeroCounts = (): Counts =>
  companies.reduce((acc, c) => ({ ...acc, [c.key]: 0 }), {} as Counts);

export function useVoteCounts() {
  const [counts, setCounts] = useState<Counts>(zeroCounts);
  const [fresh, setFresh] = useState<FreshSignal>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setReady(true);
      return;
    }

    let cancelled = false;

    const refetch = async () => {
      const { data } = await supabase.from("votes").select("choice");
      if (cancelled || !data) return;
      const next = zeroCounts();
      for (const row of data) {
        const k = row.choice as CompanyKey;
        if (k in next) next[k] += 1;
      }
      setCounts(next);
      setReady(true);
    };

    refetch();

    const channel = supabase
      .channel("votes-stream")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "votes" },
        (payload) => {
          const choice = payload.new?.choice as CompanyKey | undefined;
          if (!choice) return;
          setCounts((prev) =>
            choice in prev ? { ...prev, [choice]: prev[choice] + 1 } : prev,
          );
          setFresh({ key: choice, at: Date.now() });
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "votes" },
        () => {
          // Realtime DELETE payloads don't include the old row by default,
          // so just refetch the full count. Bulk deletes also collapse to
          // a few events, so this is cheap.
          refetch();
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return { counts, fresh, ready };
}
