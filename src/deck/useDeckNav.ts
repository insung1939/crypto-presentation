import { useCallback, useEffect, useState } from "react";

type Args = {
  total: number;
  stepsFor: (slide: number) => number;
};

const parseHash = (): { slide: number; step: number } => {
  const m = window.location.hash.match(/^#\/(\d+)(?:\.(\d+))?$/);
  if (!m) return { slide: 0, step: 0 };
  return { slide: Math.max(0, parseInt(m[1], 10) - 1), step: parseInt(m[2] ?? "0", 10) };
};

const writeHash = (slide: number, step: number) => {
  const next = step > 0 ? `#/${slide + 1}.${step}` : `#/${slide + 1}`;
  if (window.location.hash !== next) {
    history.replaceState(null, "", next);
  }
};

export function useDeckNav({ total, stepsFor }: Args) {
  const initial = parseHash();
  const [slide, setSlide] = useState(Math.min(initial.slide, total - 1));
  const [step, setStep] = useState(initial.step);

  useEffect(() => {
    writeHash(slide, step);
  }, [slide, step]);

  useEffect(() => {
    const onHash = () => {
      const p = parseHash();
      setSlide(Math.min(p.slide, total - 1));
      setStep(p.step);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [total]);

  const next = useCallback(() => {
    const maxStep = stepsFor(slide);
    if (step < maxStep) {
      setStep((s) => s + 1);
    } else if (slide < total - 1) {
      setSlide((i) => i + 1);
      setStep(0);
    }
  }, [slide, step, total, stepsFor]);

  const prev = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else if (slide > 0) {
      const target = slide - 1;
      setSlide(target);
      setStep(stepsFor(target));
    }
  }, [slide, step, stepsFor]);

  const goto = useCallback(
    (i: number) => {
      setSlide(Math.max(0, Math.min(i, total - 1)));
      setStep(0);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          goto(0);
          break;
        case "End":
          e.preventDefault();
          goto(total - 1);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goto, total]);

  return { slide, step, next, prev, goto };
}
