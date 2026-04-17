"use client";

import { useState, useMemo } from "react";
import CalculatorShell, { NumberInput, SelectInput, ResultCard } from "@/components/CalculatorShell";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContrib, setMonthlyContrib] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [compound, setCompound] = useState("12");

  const n = parseInt(compound);
  const r = rate / 100;

  const result = useMemo(() => {
    const compoundGrowth = principal * Math.pow(1 + r / n, n * years);
    let contribGrowth = 0;
    if (r > 0) {
      contribGrowth = monthlyContrib * ((Math.pow(1 + r / 12, 12 * years) - 1) / (r / 12));
    } else {
      contribGrowth = monthlyContrib * 12 * years;
    }
    const totalValue = compoundGrowth + contribGrowth;
    const totalContributions = principal + monthlyContrib * 12 * years;
    const totalInterest = totalValue - totalContributions;
    return { totalValue, totalContributions, totalInterest };
  }, [principal, monthlyContrib, r, n, years]);

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  // Year-by-year for display
  const milestones = useMemo(() => {
    const points = [];
    for (const y of [5, 10, 15, 20, 25, 30]) {
      if (y > years) break;
      const cv = principal * Math.pow(1 + r / n, n * y);
      const cc = r > 0 ? monthlyContrib * ((Math.pow(1 + r / 12, 12 * y) - 1) / (r / 12)) : monthlyContrib * 12 * y;
      points.push({ year: y, value: cv + cc });
    }
    return points;
  }, [principal, monthlyContrib, r, n, years]);

  return (
    <CalculatorShell
      title="Compound Interest Calculator — Watch Your Money Grow"
      description="Calculate how your savings and investments grow with compound interest over time. See the power of starting early and contributing regularly."
      currentPath="/compound-interest-calculator"
      faqItems={[
        { q: "What is compound interest?", a: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, your money grows exponentially because you earn 'interest on interest.'" },
        { q: "What is a realistic rate of return?", a: "The S&P 500 has historically returned about 10% per year before inflation (7% after). Savings accounts earn 4-5% in 2026. Bonds typically return 3-5%. A balanced portfolio might assume 6-8%." },
        { q: "How often should interest compound?", a: "More frequent compounding means slightly more growth. Daily compounding earns about 0.5% more per year than annual compounding at the same rate. Most investments compound daily or monthly." },
        { q: "How much should I save per month?", a: "A common guideline is to save 20% of your income (the 50/30/20 rule). For retirement specifically, aim for 15% of gross income including any employer match." },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Initial Investment" value={principal} onChange={setPrincipal} unit="$" step={1000} />
          <NumberInput label="Monthly Contribution" value={monthlyContrib} onChange={setMonthlyContrib} unit="$/mo" step={50} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <NumberInput label="Annual Interest Rate" value={rate} onChange={setRate} unit="%" step={0.5} />
          <NumberInput label="Time Period" value={years} onChange={setYears} unit="years" step={1} min={1} />
          <SelectInput label="Compound Frequency" value={compound} onChange={setCompound} options={[
            { value: "365", label: "Daily" }, { value: "12", label: "Monthly" },
            { value: "4", label: "Quarterly" }, { value: "1", label: "Annually" },
          ]} />
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-3 gap-3">
          <ResultCard label="Future Value" value={`$${fmt(Math.round(result.totalValue))}`} highlight />
          <ResultCard label="Total Contributions" value={`$${fmt(Math.round(result.totalContributions))}`} />
          <ResultCard label="Interest Earned" value={`$${fmt(Math.round(result.totalInterest))}`} />
        </div>

        {milestones.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <p className="font-medium mb-2">Growth Milestones</p>
            <div className="space-y-1 text-gray-600">
              {milestones.map((m) => (
                <div key={m.year} className="flex justify-between">
                  <span>Year {m.year}</span>
                  <span className="font-medium text-gray-900">${fmt(Math.round(m.value))}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalculatorShell>
  );
}
