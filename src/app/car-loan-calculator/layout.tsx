import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Loan Calculator — Monthly Auto Payment Estimator",
  description: "Free car loan calculator. Calculate monthly payments, total interest, and cost for auto financing.",
  keywords: ["car loan calculator", "auto loan calculator", "car payment calculator", "vehicle financing calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
