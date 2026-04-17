"use client";

import { useState, useMemo } from "react";
import CalculatorShell, { NumberInput, ResultCard } from "@/components/CalculatorShell";

export default function SavingsGoalCalculator() {
  const [goal, setGoal] = useState(20000);
  const [currentSavings, setCurrentSavings] = useState(2000);
  const [months, setMonths] = useState(24);
  const [rate, setRate] = useState(4.5);

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const results = useMemo(() => {
    const remaining = Math.max(goal - currentSavings, 0);
    const monthlyRate = rate / 100 / 12;

    // Monthly contribution needed (future value of annuity)
    let monthlyNeeded: number;
    if (monthlyRate > 0 && months > 0) {
      const fvCurrent = currentSavings * Math.pow(1 + monthlyRate, months);
      const stillNeeded = goal - fvCurrent;
      if (stillNeeded <= 0) {
        monthlyNeeded = 0;
      } else {
        monthlyNeeded = stillNeeded / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      }
    } else {
      monthlyNeeded = months > 0 ? remaining / months : remaining;
    }

    const totalContributions = monthlyNeeded * months + currentSavings;
    const interestEarned = goal - totalContributions;
    const weeklyNeeded = monthlyNeeded * 12 / 52;
    const dailyNeeded = monthlyNeeded * 12 / 365;

    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + months);

    return { monthlyNeeded: Math.max(monthlyNeeded, 0), weeklyNeeded, dailyNeeded, interestEarned: Math.max(interestEarned, 0), targetDate };
  }, [goal, currentSavings, months, rate]);

  return (
    <CalculatorShell
      title="Savings Goal Calculator — How Much Should I Save Per Month?"
      description="Calculate the monthly savings needed to reach your financial goal. See weekly and daily amounts too."
      currentPath="/savings-goal-calculator"
      faqItems={[
        { q: "How do I save for a down payment on a house?", a: "For a $350K home with 20% down ($70K), saving $2,000/month at 4.5% interest, you'd reach your goal in about 32 months. Use this calculator to find your specific number." },
        { q: "What interest rate should I use?", a: "High-yield savings accounts in 2026 offer 4-5% APY. CDs may offer 4.5-5.5%. Money market accounts typically offer 4-5%. Use the rate of whatever account you'll save in." },
        { q: "Is it better to save monthly or weekly?", a: "Weekly savings are slightly more effective due to more frequent compounding, and many people find smaller weekly amounts easier to stick to psychologically. The difference is small — consistency matters more than frequency." },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Savings Goal" value={goal} onChange={setGoal} unit="$" step={1000} />
          <NumberInput label="Current Savings" value={currentSavings} onChange={setCurrentSavings} unit="$" step={500} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Timeframe" value={months} onChange={setMonths} unit="months" step={1} min={1} />
          <NumberInput label="Interest Rate (APY)" value={rate} onChange={setRate} unit="%" step={0.25} />
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ResultCard label="Save Per Month" value={`$${fmt(Math.round(results.monthlyNeeded))}`} highlight />
          <ResultCard label="Save Per Week" value={`$${fmt(Math.round(results.weeklyNeeded))}`} />
          <ResultCard label="Save Per Day" value={`$${(results.dailyNeeded).toFixed(2)}`} />
          <ResultCard label="Interest Earned" value={`$${fmt(Math.round(results.interestEarned))}`} />
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm">
          <p className="font-medium text-emerald-800">
            Target date: {results.targetDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
          <p className="text-emerald-700 mt-1">
            Save ${fmt(Math.round(results.monthlyNeeded))}/month for {months} months to reach your ${fmt(goal)} goal.
            {results.interestEarned > 0 && ` Interest contributes $${fmt(Math.round(results.interestEarned))} toward your goal.`}
          </p>
        </div>
      </div>
    </CalculatorShell>
  );
}
