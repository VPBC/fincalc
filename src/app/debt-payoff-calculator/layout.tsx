import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debt Payoff Calculator — Avalanche vs Snowball",
  description: "Free debt payoff calculator. Compare strategies and find your debt-free date.",
  keywords: ["debt payoff calculator", "debt free calculator", "debt snowball calculator", "debt avalanche"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
