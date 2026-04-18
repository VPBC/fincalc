import type { Metadata } from "next";

export const metadata: Metadata = { title: "About FinCalc" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose prose-gray">
      <h1>About FinCalc</h1>
      <p>FinCalc provides free, accurate financial calculators for everyday money decisions. From mortgage payments to retirement planning, our tools help you understand your finances in seconds.</p>
      <h2>Our Calculators</h2>
      <p>We offer calculators for mortgages, compound interest, loan payoff, retirement planning, salary conversion, debt payoff, car loans, tips, net worth, and savings goals — with more coming soon.</p>
      <h2>How We Work</h2>
      <p>All calculations run entirely in your browser using standard financial formulas — the same math your bank uses. Nothing is sent to a server. Your financial data stays on your device.</p>
      <h2>Not Financial Advice</h2>
      <p>FinCalc is an educational tool, not a financial advisor. Always consult qualified professionals before making significant financial decisions.</p>
    </div>
  );
}
