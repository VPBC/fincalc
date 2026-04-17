import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Net Worth Calculator — What Are You Worth?",
  description: "Free net worth calculator. Add up assets and liabilities to see your total financial picture.",
  keywords: ["net worth calculator", "personal net worth", "financial health calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
