import { useEffect, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { CompanyKey, companyMap } from "./companies";

const CLIENT_KEY = "crypto_presentation_client_id";
const CHOICE_KEY = "crypto_presentation_choice";

/** A stored choice from an older ballot (e.g. "samsung") may no longer be a
 *  valid option. Treat anything not in the current company map as no vote. */
function readStoredChoice(): CompanyKey | null {
  const stored = localStorage.getItem(CHOICE_KEY) as CompanyKey | null;
  if (stored && stored in companyMap) return stored;
  if (stored) localStorage.removeItem(CHOICE_KEY);
  return null;
}

function getClientId(): string {
  let id = localStorage.getItem(CLIENT_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(CLIENT_KEY, id);
  }
  return id;
}

export function useVote() {
  const [choice, setChoice] = useState<CompanyKey | null>(readStoredChoice);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reconcile with server on mount: if the server has no record of our
  // client_id (admin wiped the votes table), clear local state so the
  // user can vote again. Network errors leave local state untouched.
  useEffect(() => {
    if (!choice) return;
    const supabase = getSupabase();
    if (!supabase) return;
    const clientId = localStorage.getItem(CLIENT_KEY);
    if (!clientId) return;

    let cancelled = false;
    (async () => {
      const { data, error: queryError } = await supabase
        .from("votes")
        .select("choice")
        .eq("client_id", clientId)
        .maybeSingle();
      if (cancelled) return;
      if (queryError) return; // offline / transient — keep local state
      if (data === null) {
        localStorage.removeItem(CHOICE_KEY);
        setChoice(null);
      }
    })();
    return () => {
      cancelled = true;
    };
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (next: CompanyKey) => {
    setError(null);
    if (choice) return;
    if (!isSupabaseConfigured()) {
      setError("Supabase가 설정되지 않았습니다 (.env 확인)");
      return;
    }
    const supabase = getSupabase();
    if (!supabase) {
      setError("Supabase 클라이언트 초기화 실패");
      return;
    }
    setSubmitting(true);
    const client_id = getClientId();
    const { error: insertError } = await supabase
      .from("votes")
      .insert({ choice: next, client_id });
    setSubmitting(false);
    if (insertError) {
      if (insertError.code === "23505") {
        localStorage.setItem(CHOICE_KEY, next);
        setChoice(next);
      } else {
        setError(insertError.message);
      }
      return;
    }
    localStorage.setItem(CHOICE_KEY, next);
    setChoice(next);
  };

  return { choice, submitting, error, submit };
}
