export type CompanyKey = "x" | "google" | "samsung" | "apple" | "meta";

export type Company = {
  key: CompanyKey;
  name: string;
  tagline: string;
  /** Brand accent — used for halos, bar gradients, glow shadows. Must be
   *  legible on a light background; not used for body text. */
  color: string;
};

// Final vote pool = X vs Apple only (tournament finalists).
// The Supabase `votes.choice` check constraint still allows all 5 keys,
// so no DB migration is needed — we simply expose two options here.
export const companies: Company[] = [
  { key: "x", name: "X", tagline: "금융 슈퍼앱 전환", color: "#111827" },
  { key: "apple", name: "Apple", tagline: "소비자 접점 통제", color: "#0071e3" },
];

export const companyMap: Record<CompanyKey, Company> = companies.reduce(
  (acc, c) => ({ ...acc, [c.key]: c }),
  {} as Record<CompanyKey, Company>,
);
