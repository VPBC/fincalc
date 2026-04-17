import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinCalc — Free Financial Calculators for Every Money Decision",
  description:
    "Calculate mortgage payments, compound interest, loan payoff dates, retirement savings, salary conversions, and more. Free, instant, no sign-up.",
};

const calculators = [
  {
    href: "/mortgage-calculator",
    title: "Mortgage Calculator",
    description: "Calculate monthly payments, total interest, and amortization for home loans at any rate and term.",
    icon: "🏠",
  },
  {
    href: "/compound-interest-calculator",
    title: "Compound Interest Calculator",
    description: "See how your money grows with compound interest over time. Compare different rates and contribution amounts.",
    icon: "📈",
  },
  {
    href: "/loan-payoff-calculator",
    title: "Loan Payoff Calculator",
    description: "Find out when you'll be debt-free. See how extra payments shorten your loan and save on interest.",
    icon: "💳",
  },
  {
    href: "/retirement-calculator",
    title: "Retirement Calculator",
    description: "How much do you need to retire? Calculate your retirement savings goal based on your age and lifestyle.",
    icon: "🏖️",
  },
  {
    href: "/salary-calculator",
    title: "Salary Calculator",
    description: "Convert between hourly, weekly, biweekly, monthly, and annual salary. See take-home after estimated taxes.",
    icon: "💰",
  },
  {
    href: "/debt-payoff-calculator",
    title: "Debt Payoff Calculator",
    description: "Compare debt avalanche vs. snowball methods. Find the fastest and cheapest way to become debt-free.",
    icon: "🎯",
  },
  {
    href: "/car-loan-calculator",
    title: "Car Loan Calculator",
    description: "Calculate monthly payments, total cost, and interest for auto financing at any term and rate.",
    icon: "🚗",
  },
  {
    href: "/tip-calculator",
    title: "Tip Calculator",
    description: "Calculate tips and split bills evenly. Works for any group size with custom tip percentages.",
    icon: "🧾",
  },
  {
    href: "/net-worth-calculator",
    title: "Net Worth Calculator",
    description: "Add up your assets and liabilities to calculate your total net worth. Track your financial health.",
    icon: "📊",
  },
  {
    href: "/savings-goal-calculator",
    title: "Savings Goal Calculator",
    description: "How much do you need to save each month to reach your goal? Calculate timelines and required contributions.",
    icon: "🎯",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Free Financial Calculators</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Make smarter money decisions with instant, accurate financial calculations. No sign-up. No fees. Just answers.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        {calculators.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="block p-6 rounded-lg border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{calc.icon}</span>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{calc.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{calc.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-16 prose prose-gray max-w-none">
        <h2>Why Use FinCalc?</h2>
        <p>
          Financial decisions are too important for guesswork. FinCalc gives you instant, accurate
          calculations for mortgages, loans, investments, and everyday money questions so you can
          make informed choices with confidence.
        </p>
        <h3>Trusted Formulas</h3>
        <p>
          All calculators use standard financial formulas — the same math your bank uses.
          Mortgage calculations use the standard amortization formula. Compound interest uses
          the time-value-of-money equation. No shortcuts, no approximations.
        </p>
        <h3>Your Data Stays Private</h3>
        <p>
          All calculations happen in your browser. We don&apos;t store your financial data,
          don&apos;t require an account, and don&apos;t sell your information. Your numbers
          are yours alone.
        </p>
      </section>
    </div>
  );
}
