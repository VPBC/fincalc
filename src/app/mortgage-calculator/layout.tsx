import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator — Monthly Payment & Amortization",
  description: "Free mortgage calculator. Calculate monthly payments, total interest, and amortization for home loans.",
  keywords: ["mortgage calculator", "home loan calculator", "mortgage payment calculator", "monthly mortgage payment"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
