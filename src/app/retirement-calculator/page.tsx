"use client";

import { useState, useMemo } from "react";
import CalculatorShell, { NumberInput, ResultCard } from "@/components/CalculatorShell";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retireAge, setRetireAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContrib, setMonthlyContrib] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [desiredIncome, setDesiredIncome] = useState(60000);
  const [inflation, setInflation] = useState(3);

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const results = useMemo(() => {
    const yearsToRetire = Math.max(retireAge - currentAge, 0);
    const r = annualReturn / 100;
    const rMonthly = r / 12;

    // Future value of current savings
    const fvSavings = currentSavings * Math.pow(1 + r, yearsToRetire);

    // Future value of monthly contributions
    let fvContrib = 0;
    if (rMonthly > 0) {
      fvContrib = monthlyContrib * ((Math.pow(1 + rMonthly, 12 * yearsToRetire) - 1) / rMonthly);
    } else {
      fvContrib = monthlyContrib * 12 * yearsToRetire;
    }

    const totalAtRetirement = fvSavings + fvContrib;
    const totalContributions = currentSavings + monthlyContrib * 12 * yearsToRetire;
    const interestEarned = totalAtRetirement - totalContributions;

    // How much income it can generate (4% rule)
    const annualWithdrawal = totalAtRetirement * 0.04;
    const monthlyWithdrawal = annualWithdrawal / 12;

    // Inflation-adjusted desired income
    const inflatedIncome = desiredIncome * Math.pow(1 + inflation / 100, yearsToRetire);
    const neededNest = inflatedIncome / 0.04;
    const gap = neededNest - totalAtRetirement;
    const onTrack = totalAtRetirement >= neededNest;

    return {
      totalAtRetirement, totalContributions, interestEarned,
      annualWithdrawal, monthlyWithdrawal,
      inflatedIncome, neededNest, gap, onTrack, yearsToRetire,
    };
  }, [currentAge, retireAge, currentSavings, monthlyContrib, annualReturn, desiredIncome, inflation]);

  return (
    <CalculatorShell
      title="Retirement Calculator — How Much Do I Need to Retire?"
      description="Calculate your retirement savings goal. See if you're on track based on your age, savings rate, and desired retirement income."
      currentPath="/retirement-calculator"
      faqItems={[
        { q: "What is the 4% rule?", a: "The 4% rule suggests you can withdraw 4% of your retirement savings annually without running out of money for at least 30 years. For example, $1M in savings supports $40,000/year in withdrawals." },
        { q: "How much do I need to retire?", a: "Multiply your desired annual retirement income by 25 (the inverse of the 4% rule). If you want $60,000/year, you need approximately $1.5 million. Adjust upward for inflation." },
        { q: "What rate of return should I assume?", a: "A common assumption is 7% for a diversified stock portfolio (10% historical return minus 3% inflation). More conservative portfolios might assume 5-6%. Be realistic, not optimistic." },
        { q: "When should I start saving for retirement?", a: "As early as possible. Thanks to compound interest, $500/month starting at age 25 grows to about $1.4M by 65 at 7% return. Starting at 35, the same contribution only reaches $680K." },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Current Age" value={currentAge} onChange={setCurrentAge} step={1} min={18} />
          <NumberInput label="Retirement Age" value={retireAge} onChange={setRetireAge} step={1} min={currentAge + 1} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Current Savings" value={currentSavings} onChange={setCurrentSavings} unit="$" step={5000} />
          <NumberInput label="Monthly Contribution" value={monthlyContrib} onChange={setMonthlyContrib} unit="$/mo" step={100} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <NumberInput label="Expected Return" value={annualReturn} onChange={setAnnualReturn} unit="%" step={0.5} />
          <NumberInput label="Desired Annual Income" value={desiredIncome} onChange={setDesiredIncome} unit="$/yr" step={5000} />
          <NumberInput label="Inflation Rate" value={inflation} onChange={setInflation} unit="%" step={0.5} />
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <ResultCard label="Savings at Retirement" value={`$${fmt(Math.round(results.totalAtRetirement))}`} highlight />
          <ResultCard label="Monthly Withdrawal (4%)" value={`$${fmt(Math.round(results.monthlyWithdrawal))}`} />
          <ResultCard label="Interest Earned" value={`$${fmt(Math.round(results.interestEarned))}`} />
        </div>

        <div className={`rounded-lg p-4 ${results.onTrack ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
          <p className={`font-semibold ${results.onTrack ? "text-emerald-800" : "text-red-800"}`}>
            {results.onTrack ? "You're on track!" : "Savings gap detected"}
          </p>
          <p className={`text-sm mt-1 ${results.onTrack ? "text-emerald-700" : "text-red-700"}`}>
            Inflation-adjusted income needed: ${fmt(Math.round(results.inflatedIncome))}/yr.
            Required nest egg: ${fmt(Math.round(results.neededNest))}.
            {results.onTrack
              ? ` You'll have $${fmt(Math.round(results.totalAtRetirement - results.neededNest))} more than needed.`
              : ` You need $${fmt(Math.round(results.gap))} more. Consider increasing contributions or delaying retirement.`
            }
          </p>
        </div>
      </div>
    </CalculatorShell>
  );
}
