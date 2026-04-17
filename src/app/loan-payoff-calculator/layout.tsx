import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Payoff Calculator — When Will I Be Debt-Free?",
  description: "Free loan payoff calculator. See how extra payments shorten your loan and save on interest.",
  keywords: ["loan payoff calculator", "extra payment calculator", "loan amortization calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
