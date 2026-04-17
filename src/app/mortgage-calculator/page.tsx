"use client";

import { useState, useMemo } from "react";
import CalculatorShell, { NumberInput, SelectInput, ResultCard } from "@/components/CalculatorShell";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState("30");
  const [propertyTax, setPropertyTax] = useState(3500);
  const [insurance, setInsurance] = useState(1200);

  const principal = homePrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const numPayments = parseInt(term) * 12;

  const monthlyPI = useMemo(() => {
    if (monthlyRate === 0) return principal / numPayments;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }, [principal, monthlyRate, numPayments]);

  const monthlyTax = propertyTax / 12;
  const monthlyIns = insurance / 12;
  const totalMonthly = monthlyPI + monthlyTax + monthlyIns;
  const totalPaid = monthlyPI * numPayments;
  const totalInterest = totalPaid - principal;
  const downPct = homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(1) : "0";

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <CalculatorShell
      title="Mortgage Calculator — Monthly Payment & Amortization"
      description="Calculate your monthly mortgage payment including principal, interest, property tax, and insurance. See how much you'll pay over the life of your loan."
      currentPath="/mortgage-calculator"
      faqItems={[
        { q: "How is a mortgage payment calculated?", a: "The monthly payment formula is: M = P[r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate, and n is the total number of payments. Property tax and insurance are added on top." },
        { q: "What is a good mortgage interest rate in 2026?", a: "Average 30-year fixed rates in 2026 range from 5.5% to 7.5% depending on credit score, down payment, and market conditions. A rate below 6% is generally considered good." },
        { q: "How much should I put down on a house?", a: "20% down avoids private mortgage insurance (PMI). However, many loans allow 3-10% down. A larger down payment reduces your monthly payment and total interest paid." },
        { q: "Should I choose a 15-year or 30-year mortgage?", a: "A 15-year mortgage has higher monthly payments but saves significantly on total interest. A 30-year gives lower monthly payments but costs more over time. Use this calculator to compare both." },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Home Price" value={homePrice} onChange={setHomePrice} unit="$" step={1000} />
          <NumberInput label="Down Payment" value={downPayment} onChange={setDownPayment} unit={`$ (${downPct}%)`} step={1000} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Interest Rate" value={rate} onChange={setRate} unit="%" step={0.125} />
          <SelectInput label="Loan Term" value={term} onChange={setTerm} options={[
            { value: "30", label: "30 years" }, { value: "20", label: "20 years" },
            { value: "15", label: "15 years" }, { value: "10", label: "10 years" },
          ]} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Annual Property Tax" value={propertyTax} onChange={setPropertyTax} unit="$/yr" step={100} />
          <NumberInput label="Annual Insurance" value={insurance} onChange={setInsurance} unit="$/yr" step={100} />
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ResultCard label="Monthly Payment" value={`$${fmt(Math.round(totalMonthly))}`} highlight />
          <ResultCard label="Principal & Interest" value={`$${fmt(Math.round(monthlyPI))}`} unit="/mo" />
          <ResultCard label="Total Interest" value={`$${fmt(Math.round(totalInterest))}`} />
          <ResultCard label="Total Paid" value={`$${fmt(Math.round(totalPaid + propertyTax * parseInt(term) + insurance * parseInt(term)))}`} />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-sm">
          <p className="font-medium mb-2">Payment Breakdown</p>
          <div className="space-y-1 text-gray-600">
            <div className="flex justify-between"><span>Principal & Interest</span><span>${fmt(Math.round(monthlyPI))}</span></div>
            <div className="flex justify-between"><span>Property Tax</span><span>${fmt(Math.round(monthlyTax))}</span></div>
            <div className="flex justify-between"><span>Insurance</span><span>${fmt(Math.round(monthlyIns))}</span></div>
            <div className="flex justify-between font-semibold border-t pt-1 mt-1 text-gray-900"><span>Total Monthly</span><span>${fmt(Math.round(totalMonthly))}</span></div>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
}
