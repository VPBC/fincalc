import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tip Calculator — Split Bills & Calculate Tips",
  description: "Free tip calculator. Calculate tips and split bills evenly for any group size.",
  keywords: ["tip calculator", "bill splitter", "restaurant tip calculator", "gratuity calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
