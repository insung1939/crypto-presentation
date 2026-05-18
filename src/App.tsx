import { useEffect } from "react";
import { Deck } from "@/deck/Deck";
import { VotePage } from "@/vote/VotePage";

export default function App() {
  const isVote =
    typeof window !== "undefined" &&
    window.location.pathname.replace(/\/+$/, "").endsWith("/vote");

  useEffect(() => {
    document.body.classList.toggle("deck-mode", !isVote);
    return () => document.body.classList.remove("deck-mode");
  }, [isVote]);

  return isVote ? <VotePage /> : <Deck />;
}
