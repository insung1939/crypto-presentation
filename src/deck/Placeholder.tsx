import { Reveal } from "@/motion/Reveal";

type Props = {
  note?: string;
  bullets?: string[];
};

export function Placeholder({ note, bullets }: Props) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Reveal>
        <div className="inline-flex items-center gap-3 rounded-full border border-dashed border-[var(--color-fg-dim)] px-5 py-2 text-[1.1rem] text-[var(--color-fg-muted)]">
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          콘텐츠 대기 중 — 사용자가 자료 전달 후 채울 영역
        </div>
      </Reveal>

      {note && (
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-[60ch] text-[1.6rem] leading-snug text-[var(--color-fg-muted)] text-pretty">
            {note}
          </p>
        </Reveal>
      )}

      {bullets && bullets.length > 0 && (
        <ul className="mt-10 space-y-4">
          {bullets.map((b, i) => (
            <Reveal key={i} delay={0.2 + i * 0.08}>
              <li className="flex items-start gap-4 text-[1.5rem] text-[var(--color-fg)]">
                <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                <span>{b}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
