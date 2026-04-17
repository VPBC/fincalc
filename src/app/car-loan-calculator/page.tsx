"use client";

import { useState, useMemo } from "react";
import CalculatorShell, { NumberInput, SelectInput, ResultCard } from "@/components/CalculatorShell";

export default function CarLoanCalculator() {
  const [price, setPrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeIn, setTradeIn] = useState(0);
  const [rate, setRate] = useState(5.9);
  const [term, setTerm] = useState("60");

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const loanAmount = Math.max(price - downPayment - tradeIn, 0);
  const monthlyRate = rate / 100 / 12;
  const numPayments = parseInt(term);

  const monthlyPayment = useMemo(() => {
    if (monthlyRate === 0) return loanAmount / numPayments;
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }, [loanAmount, monthlyRate, numPayments]);

  const totalPaid = monthlyPayment * numPayments;
  const totalInterest = totalPaid - loanAmount;
  const totalCost = totalPaid + downPayment + tradeIn;

  return (
    <CalculatorShell
      title="Car Loan Calculator — Monthly Auto Payment Estimator"
      description="Calculate your monthly car payment, total interest, and total cost of ownership. Compare different loan terms and rates."
      currentPath="/car-loan-calculator"
      faqItems={[
        { q: "What is a good car loan interest rate?", a: "In 2026, new car loan rates range from 4.5% to 8% depending on credit score. Used car rates are typically 1-3% higher. Excellent credit (750+) qualifies for the best rates." },
        { q: "Should I choose a 36, 48, or 60 month loan?", a: "Shorter terms have higher monthly payments but save significantly on interest. A 36-month loan on $30K at 6% costs $2,887 in interest vs. $4,860 for 60 months. Choose the shortest term you can afford." },
        { q: "How much car can I afford?", a: "A common rule is the 20/4/10 guideline: 20% down payment, 4-year loan maximum, and total car expenses (payment + insurance) under 10% of gross monthly income." },
        { q: "Does trading in a car reduce my loan?", a: "Yes, your trade-in value reduces the amount you need to finance, lowering your monthly payment and total interest. Get your trade-in appraised independently before visiting the dealer." },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <NumberInput label="Vehicle Price" value={price} onChange={setPrice} unit="$" step={1000} />
          <NumberInput label="Down Payment" value={downPayment} onChange={setDownPayment} unit="$" step={500} />
          <NumberInput label="Trade-In Value" value={tradeIn} onChange={setTradeIn} unit="$" step={500} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Interest Rate" value={rate} onChange={setRate} unit="%" step={0.25} />
          <SelectInput label="Loan Term" value={term} onChange={setTerm} options={[
            { value: "36", label: "36 months (3 years)" }, { value: "48", label: "48 months (4 years)" },
            { value: "60", label: "60 months (5 years)" }, { value: "72", label: "72 months (6 years)" },
            { value: "84", label: "84 months (7 years)" },
          ]} />
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ResultCard label="Monthly Payment" value={`$${fmt(Math.round(monthlyPayment))}`} highlight />
          <ResultCard label="Loan Amount" value={`$${fmt(loanAmount)}`} />
          <ResultCard label="Total Interest" value={`$${fmt(Math.round(totalInterest))}`} />
          <ResultCard label="Total Cost" value={`$${fmt(Math.round(totalCost))}`} />
        </div>
      </div>
    </CalculatorShell>
  );
}
