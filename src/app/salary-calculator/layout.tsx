import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Calculator — Convert Hourly to Annual & More",
  description: "Free salary calculator. Convert between hourly, weekly, biweekly, monthly, and annual salary instantly.",
  keywords: ["salary calculator", "hourly to salary", "annual salary calculator", "pay calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
