"use client";

import { useState, useMemo } from "react";
import CalculatorShell, { NumberInput, ResultCard } from "@/components/CalculatorShell";

export default function LoanPayoffCalculator() {
  const [balance, setBalance] = useState(25000);
  const [rate, setRate] = useState(6.5);
  const [payment, setPayment] = useState(500);
  const [extraPayment, setExtraPayment] = useState(100);

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const results = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    // Without extra payments
    let bal = balance;
    let months = 0;
    let totalInterest = 0;
    while (bal > 0 && months < 600) {
      const interest = bal * monthlyRate;
      totalInterest += interest;
      bal = bal + interest - payment;
      if (bal < 0) bal = 0;
      months++;
    }
    // With extra payments
    let bal2 = balance;
    let months2 = 0;
    let totalInterest2 = 0;
    const totalPay = payment + extraPayment;
    while (bal2 > 0 && months2 < 600) {
      const interest = bal2 * monthlyRate;
      totalInterest2 += interest;
      bal2 = bal2 + interest - totalPay;
      if (bal2 < 0) bal2 = 0;
      months2++;
    }
    return {
      months, totalInterest,
      months2, totalInterest2,
      savedMonths: months - months2,
      savedInterest: totalInterest - totalInterest2,
    };
  }, [balance, rate, payment, extraPayment]);

  const toYM = (m: number) => {
    const y = Math.floor(m / 12);
    const mo = m % 12;
    return y > 0 ? `${y}y ${mo}m` : `${mo}m`;
  };

  return (
    <CalculatorShell
      title="Loan Payoff Calculator — When Will I Be Debt-Free?"
      description="See when you'll pay off your loan and how much extra payments save you in interest and time."
      currentPath="/loan-payoff-calculator"
      faqItems={[
        { q: "How do extra payments reduce my loan?", a: "Extra payments go directly toward principal, reducing the balance faster. This means less interest accrues each month, creating a snowball effect that shortens your loan significantly." },
        { q: "Should I pay extra on my mortgage or invest?", a: "If your mortgage rate is lower than expected investment returns, investing may be better mathematically. However, paying off your mortgage provides guaranteed, risk-free returns equal to your interest rate." },
        { q: "Can I pay off my loan early without penalty?", a: "Most modern mortgages and personal loans have no prepayment penalty. However, some loans charge a fee for early payoff. Check your loan agreement or ask your lender." },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Current Balance" value={balance} onChange={setBalance} unit="$" step={1000} />
          <NumberInput label="Interest Rate" value={rate} onChange={setRate} unit="%" step={0.25} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Monthly Payment" value={payment} onChange={setPayment} unit="$/mo" step={50} />
          <NumberInput label="Extra Monthly Payment" value={extraPayment} onChange={setExtraPayment} unit="$/mo" step={25} />
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Without Extra Payments</p>
            <p className="text-xl font-bold">{toYM(results.months)}</p>
            <p className="text-sm text-gray-600">Total interest: ${fmt(Math.round(results.totalInterest))}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm font-medium text-emerald-700 mb-2">With Extra Payments</p>
            <p className="text-xl font-bold text-emerald-800">{toYM(results.months2)}</p>
            <p className="text-sm text-emerald-700">Total interest: ${fmt(Math.round(results.totalInterest2))}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ResultCard label="Time Saved" value={toYM(results.savedMonths)} highlight />
          <ResultCard label="Interest Saved" value={`$${fmt(Math.round(results.savedInterest))}`} highlight />
        </div>
      </div>
    </CalculatorShell>
  );
}
