"use client";

import { useState, useMemo } from "react";
import CalculatorShell, { NumberInput, ResultCard } from "@/components/CalculatorShell";

export default function LoanPayoffCalculator() {
  const [balance, setBalance] = useState(25000);
  const [rate, setRate] = useState(6.5);
  const [payment, setPayment] = useState(500);
  const [extraPayment, setExtraPayment] = useState(100);

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const effectivePayment = payment > 0 ? payment : extraPayment;
  const effectiveExtra = payment > 0 ? extraPayment : 0;

  const results = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const basePay = payment > 0 ? payment : extraPayment;
    const totalPay = payment > 0 ? payment + extraPayment : extraPayment;
    const minPayment = balance * monthlyRate;

    if (basePay <= minPayment) {
      return { months: Infinity, totalInterest: Infinity, months2: Infinity, totalInterest2: Infinity, savedMonths: 0, savedInterest: 0, payable: false, minRequired: Math.ceil(minPayment) + 1 };
    }

    // Without extra payments
    let bal = balance;
    let months = 0;
    let totalInterest = 0;
    while (bal > 0.01 && months < 7200) {
      const interest = bal * monthlyRate;
      totalInterest += interest;
      bal = bal + interest - basePay;
      if (bal < 0) bal = 0;
      months++;
    }
    // With extra payments (only when base payment is separate from extra)
    let bal2 = balance;
    let months2 = 0;
    let totalInterest2 = 0;
    if (payment > 0 && extraPayment > 0) {
      while (bal2 > 0.01 && months2 < 7200) {
        const interest = bal2 * monthlyRate;
        totalInterest2 += interest;
        bal2 = bal2 + interest - totalPay;
        if (bal2 < 0) bal2 = 0;
        months2++;
      }
    } else {
      months2 = months;
      totalInterest2 = totalInterest;
    }
    return {
      months, totalInterest,
      months2, totalInterest2,
      savedMonths: months - months2,
      savedInterest: totalInterest - totalInterest2,
      payable: true,
      minRequired: 0,
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

        {!results.payable ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-semibold text-red-800">Payment too low</p>
            <p className="text-sm text-red-700 mt-1">
              Your total payment doesn&apos;t cover the monthly interest. Increase to at least ${fmt(results.minRequired)}/month.
            </p>
          </div>
        ) : (
          <>
            {payment === 0 && extraPayment > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                No base payment entered — using ${fmt(extraPayment)}/mo as your total monthly payment.
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-2">{payment > 0 && extraPayment > 0 ? "Without Extra Payments" : "Payoff Timeline"}</p>
                <p className="text-xl font-bold">{toYM(results.months)}</p>
                <p className="text-sm text-gray-600">Total interest: ${fmt(Math.round(results.totalInterest))}</p>
              </div>
              {payment > 0 && extraPayment > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-emerald-700 mb-2">With Extra Payments</p>
                  <p className="text-xl font-bold text-emerald-800">{toYM(results.months2)}</p>
                  <p className="text-sm text-emerald-700">Total interest: ${fmt(Math.round(results.totalInterest2))}</p>
                </div>
              )}
            </div>

            {results.savedMonths > 0 && (
              <div className="grid grid-cols-2 gap-3">
                <ResultCard label="Time Saved" value={toYM(results.savedMonths)} highlight />
                <ResultCard label="Interest Saved" value={`$${fmt(Math.round(results.savedInterest))}`} highlight />
              </div>
            )}
          </>
        )}
      </div>
    </CalculatorShell>
  );
}
