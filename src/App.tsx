import { Deck } from "@/deck/Deck";
import { VotePage } from "@/vote/VotePage";

export default function App() {
  const isVote =
    typeof window !== "undefined" &&
    window.location.pathname.replace(/\/+$/, "").endsWith("/vote");
  return isVote ? <VotePage /> : <Deck />;
}
