import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savings Goal Calculator — Monthly Savings Needed",
  description: "Free savings goal calculator. How much to save monthly to reach your target.",
  keywords: ["savings goal calculator", "savings plan calculator", "how much to save per month"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
