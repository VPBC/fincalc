import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — Watch Your Money Grow",
  description: "Free compound interest calculator. See how savings grow over time with regular contributions and compound interest.",
  keywords: ["compound interest calculator", "investment calculator", "savings growth calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
