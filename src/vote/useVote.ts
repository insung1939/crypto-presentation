import { useEffect, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { CompanyKey } from "./companies";

const CLIENT_KEY = "crypto_presentation_client_id";
const CHOICE_KEY = "crypto_presentation_choice";

function getClientId(): string {
  let id = localStorage.getItem(CLIENT_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(CLIENT_KEY, id);
  }
  return id;
}

export function useVote() {
  const [choice, setChoice] = useState<CompanyKey | null>(
    () => (localStorage.getItem(CHOICE_KEY) as CompanyKey | null) ?? null,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const stored = localStorage.getItem(CHOICE_KEY);
    if (stored && stored !== choice) setChoice(stored as CompanyKey);
  }, [choice]);

  return { choice, submitting, error, submit };
}
