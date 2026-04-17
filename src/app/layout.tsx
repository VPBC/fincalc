import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "FinCalc — Free Financial Calculators",
    template: "%s | FinCalc",
  },
  description:
    "Free online financial calculators for mortgage payments, compound interest, loan payoff, retirement planning, salary conversion, and more.",
  keywords: [
    "mortgage calculator",
    "compound interest calculator",
    "loan calculator",
    "retirement calculator",
    "salary calculator",
    "financial calculator",
    "debt payoff calculator",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FinCalc",
  },
};

const calculators = [
  { href: "/mortgage-calculator", label: "Mortgage" },
  { href: "/compound-interest-calculator", label: "Compound Interest" },
  { href: "/loan-payoff-calculator", label: "Loan Payoff" },
  { href: "/retirement-calculator", label: "Retirement" },
  { href: "/salary-calculator", label: "Salary" },
  { href: "/debt-payoff-calculator", label: "Debt Payoff" },
  { href: "/car-loan-calculator", label: "Car Loan" },
  { href: "/tip-calculator", label: "Tip" },
  { href: "/net-worth-calculator", label: "Net Worth" },
  { href: "/savings-goal-calculator", label: "Savings Goal" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-emerald-700">
              FinCalc
            </Link>
            <nav className="hidden md:flex gap-4 text-sm">
              {calculators.slice(0, 5).map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="text-gray-600 hover:text-emerald-700 transition-colors"
                >
                  {c.label}
                </Link>
              ))}
              <span className="text-gray-400">+{calculators.length - 5} more</span>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-gray-200 bg-gray-50 mt-12">
          <div className="mx-auto max-w-5xl px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              {calculators.map((c) => (
                <Link key={c.href} href={c.href} className="text-gray-600 hover:text-emerald-700">
                  {c.label} Calculator
                </Link>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-400">
              &copy; {new Date().getFullYear()} FinCalc. Free financial calculators. For informational purposes only — not financial advice. Consult a qualified professional for financial decisions.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
