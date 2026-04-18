"use client";

import { useState, useMemo } from "react";
import CalculatorShell, { NumberInput, ResultCard } from "@/components/CalculatorShell";

export default function DebtPayoffCalculator() {
  const [totalDebt, setTotalDebt] = useState(15000);
  const [avgRate, setAvgRate] = useState(18);
  const [monthlyBudget, setMonthlyBudget] = useState(500);

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const results = useMemo(() => {
    const monthlyRate = avgRate / 100 / 12;
    let balance = totalDebt;
    let months = 0;
    let totalInterest = 0;

    // Check if payment covers at least the interest
    const minPayment = totalDebt * monthlyRate;
    if (monthlyBudget <= minPayment) {
      return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity, payable: false };
    }

    while (balance > 0.01 && months < 7200) {
      const interest = balance * monthlyRate;
      totalInterest += interest;
      balance = balance + interest - monthlyBudget;
      if (balance < 0) balance = 0;
      months++;
    }

    return {
      months,
      totalInterest,
      totalPaid: totalDebt + totalInterest,
      payable: true,
    };
  }, [totalDebt, avgRate, monthlyBudget]);

  const toYM = (m: number) => {
    if (m === Infinity) return "Never";
    const y = Math.floor(m / 12);
    const mo = m % 12;
    return y > 0 ? `${y} yr ${mo} mo` : `${mo} months`;
  };

  const debtFreeDate = useMemo(() => {
    if (!results.payable) return "N/A";
    const d = new Date();
    d.setMonth(d.getMonth() + results.months);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [results]);

  return (
    <CalculatorShell
      title="Debt Payoff Calculator — When Will I Be Debt-Free?"
      description="Calculate how long it takes to pay off your debt and how much interest you'll pay. Find out your debt-free date."
      currentPath="/debt-payoff-calculator"
      faqItems={[
        { q: "What is the debt avalanche method?", a: "Pay minimum on all debts except the one with the highest interest rate — throw every extra dollar at that one. Once it's paid off, move to the next highest rate. This saves the most money on interest." },
        { q: "What is the debt snowball method?", a: "Pay minimum on all debts except the smallest balance — pay that one off first for a quick win. Then move to the next smallest. This builds motivation but costs more in interest than the avalanche method." },
        { q: "How much of my income should go to debt?", a: "The 50/30/20 rule suggests 20% of after-tax income toward savings and debt repayment. If you have high-interest debt (15%+), consider allocating more aggressively — up to 30-40% — until it's eliminated." },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <NumberInput label="Total Debt" value={totalDebt} onChange={setTotalDebt} unit="$" step={1000} />
          <NumberInput label="Average Interest Rate" value={avgRate} onChange={setAvgRate} unit="%" step={0.5} />
          <NumberInput label="Monthly Payment" value={monthlyBudget} onChange={setMonthlyBudget} unit="$/mo" step={50} />
        </div>

        <hr className="border-gray-200" />

        {results.payable ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <ResultCard label="Debt-Free In" value={toYM(results.months)} highlight />
              <ResultCard label="Debt-Free Date" value={debtFreeDate} />
              <ResultCard label="Total Interest" value={`$${fmt(Math.round(results.totalInterest))}`} />
              <ResultCard label="Total Paid" value={`$${fmt(Math.round(results.totalPaid))}`} />
            </div>
          </>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-semibold text-red-800">Payment too low</p>
            <p className="text-sm text-red-700 mt-1">
              Your monthly payment (${fmt(monthlyBudget)}) doesn&apos;t cover the monthly interest
              (${fmt(Math.round(totalDebt * avgRate / 100 / 12))}). Increase your payment to at least
              ${fmt(Math.ceil(totalDebt * avgRate / 100 / 12) + 1)} to start reducing the balance.
            </p>
          </div>
        )}
      </div>
    </CalculatorShell>
  );
}
