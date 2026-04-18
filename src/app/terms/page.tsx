import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose prose-gray">
      <h1>Terms of Use</h1>
      <p><strong>Last updated:</strong> April 18, 2026</p>
      <h2>Not Financial Advice</h2>
      <p>FinCalc provides financial calculators for informational and educational purposes only. Results are estimates based on the inputs you provide and standard financial formulas. They do not constitute financial, tax, legal, or investment advice.</p>
      <h2>Consult a Professional</h2>
      <p>Before making any financial decision based on these calculators, consult a qualified financial advisor, tax professional, or other appropriate expert.</p>
      <h2>No Warranty</h2>
      <p>Calculators are provided &ldquo;as is&rdquo; without warranty. While we use standard financial formulas, actual results may differ based on fees, taxes, market conditions, and other factors not modeled here.</p>
      <h2>Limitation of Liability</h2>
      <p>FinCalc is not liable for any financial decisions made based on calculator results, including but not limited to investment losses, incorrect tax estimates, or inaccurate loan projections.</p>
    </div>
  );
}
