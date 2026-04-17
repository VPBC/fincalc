import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retirement Calculator — How Much Do I Need to Retire?",
  description: "Free retirement calculator. Calculate your retirement savings goal based on age, income, and desired lifestyle.",
  keywords: ["retirement calculator", "retirement savings calculator", "how much to retire", "401k calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
