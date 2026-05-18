export type CompanyKey = "x" | "google" | "samsung" | "apple" | "meta";

export type Company = {
  key: CompanyKey;
  name: string;
  tagline: string;
  /** Brand accent — used for halos, bar gradients, glow shadows. Must be
   *  legible on a light background; not used for body text. */
  color: string;
};

export const companies: Company[] = [
  { key: "x", name: "X.corp", tagline: "SNS + 송금 + 투자 · 슈퍼앱", color: "#1a1a2a" },
  { key: "google", name: "Google", tagline: "블록체인 인프라 (Cloud)", color: "#4285F4" },
  { key: "samsung", name: "Samsung", tagline: "Blockchain SDK · DApp", color: "#1428A0" },
  { key: "apple", name: "Apple", tagline: "Apple Pay × BitPay 간접결제", color: "#1d1d1f" },
  { key: "meta", name: "Meta", tagline: "Libra/Diem · 좌초된 실험", color: "#0866FF" },
];

export const companyMap: Record<CompanyKey, Company> = companies.reduce(
  (acc, c) => ({ ...acc, [c.key]: c }),
  {} as Record<CompanyKey, Company>,
);
