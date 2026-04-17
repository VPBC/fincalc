"use client";

import { useState } from "react";
import CalculatorShell, { NumberInput, ResultCard } from "@/components/CalculatorShell";

export default function NetWorthCalculator() {
  const [cash, setCash] = useState(15000);
  const [savings, setSavings] = useState(25000);
  const [investments, setInvestments] = useState(50000);
  const [retirement, setRetirement] = useState(80000);
  const [realEstate, setRealEstate] = useState(350000);
  const [vehicles, setVehicles] = useState(20000);
  const [otherAssets, setOtherAssets] = useState(5000);

  const [mortgage, setMortgage] = useState(280000);
  const [carLoans, setCarLoans] = useState(12000);
  const [studentLoans, setStudentLoans] = useState(25000);
  const [creditCards, setCreditCards] = useState(5000);
  const [otherDebts, setOtherDebts] = useState(0);

  const totalAssets = cash + savings + investments + retirement + realEstate + vehicles + otherAssets;
  const totalLiabilities = mortgage + carLoans + studentLoans + creditCards + otherDebts;
  const netWorth = totalAssets - totalLiabilities;

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <CalculatorShell
      title="Net Worth Calculator — What Are You Really Worth?"
      description="Add up your assets and subtract your liabilities to calculate your total net worth. The clearest picture of your financial health."
      currentPath="/net-worth-calculator"
      faqItems={[
        { q: "What is a good net worth by age?", a: "A common benchmark is: net worth = (age × annual income) / 10. So a 30-year-old earning $60K should target $180K. The median US net worth by age: under 35 ($39K), 35-44 ($135K), 45-54 ($247K), 55-64 ($364K)." },
        { q: "Should I include my home in net worth?", a: "Yes, your home is an asset. However, some people track 'liquid net worth' separately (excluding home equity) since you can't easily spend your home's value. Both perspectives are useful." },
        { q: "Is negative net worth bad?", a: "Negative net worth is common for young adults with student loans or a new mortgage. It's not inherently bad if you have a plan to build equity over time. Focus on the trend, not a single snapshot." },
      ]}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Assets (What You Own)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <NumberInput label="Cash" value={cash} onChange={setCash} unit="$" step={1000} />
            <NumberInput label="Savings" value={savings} onChange={setSavings} unit="$" step={1000} />
            <NumberInput label="Investments" value={investments} onChange={setInvestments} unit="$" step={5000} />
            <NumberInput label="Retirement (401k/IRA)" value={retirement} onChange={setRetirement} unit="$" step={5000} />
            <NumberInput label="Real Estate" value={realEstate} onChange={setRealEstate} unit="$" step={10000} />
            <NumberInput label="Vehicles" value={vehicles} onChange={setVehicles} unit="$" step={1000} />
            <NumberInput label="Other Assets" value={otherAssets} onChange={setOtherAssets} unit="$" step={1000} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Liabilities (What You Owe)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <NumberInput label="Mortgage" value={mortgage} onChange={setMortgage} unit="$" step={5000} />
            <NumberInput label="Car Loans" value={carLoans} onChange={setCarLoans} unit="$" step={1000} />
            <NumberInput label="Student Loans" value={studentLoans} onChange={setStudentLoans} unit="$" step={1000} />
            <NumberInput label="Credit Cards" value={creditCards} onChange={setCreditCards} unit="$" step={500} />
            <NumberInput label="Other Debts" value={otherDebts} onChange={setOtherDebts} unit="$" step={500} />
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-3 gap-3">
          <ResultCard label="Total Assets" value={`$${fmt(totalAssets)}`} />
          <ResultCard label="Total Liabilities" value={`$${fmt(totalLiabilities)}`} />
          <ResultCard label="Net Worth" value={`$${fmt(netWorth)}`} highlight />
        </div>
      </div>
    </CalculatorShell>
  );
}
