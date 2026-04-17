"use client";

import { useState } from "react";
import CalculatorShell, { NumberInput, ResultCard } from "@/components/CalculatorShell";

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState(85);
  const [tipPercent, setTipPercent] = useState(18);
  const [numPeople, setNumPeople] = useState(2);

  const tipAmount = billAmount * (tipPercent / 100);
  const totalAmount = billAmount + tipAmount;
  const perPerson = numPeople > 0 ? totalAmount / numPeople : totalAmount;
  const tipPerPerson = numPeople > 0 ? tipAmount / numPeople : tipAmount;

  const fmt = (n: number) => n.toFixed(2);

  const presets = [15, 18, 20, 25];

  return (
    <CalculatorShell
      title="Tip Calculator — Split Bills & Calculate Tips Instantly"
      description="Calculate tips for any bill amount, choose your tip percentage, and split evenly among any group size."
      currentPath="/tip-calculator"
      faqItems={[
        { q: "How much should I tip?", a: "In the US, 15-20% is standard for sit-down restaurants. 18% is the most common. For exceptional service, tip 20-25%. For takeout, 10-15% is appropriate." },
        { q: "Should I tip on the pre-tax or post-tax amount?", a: "Etiquette experts recommend tipping on the pre-tax amount. However, tipping on the total (including tax) is increasingly common and simpler to calculate." },
        { q: "How do I calculate 20% tip quickly?", a: "Move the decimal point one place left (that's 10%), then double it. For example, on a $45 bill: 10% = $4.50, doubled = $9.00 tip (20%)." },
      ]}
    >
      <div className="space-y-6">
        <NumberInput label="Bill Amount" value={billAmount} onChange={setBillAmount} unit="$" step={1} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tip Percentage</label>
          <div className="flex gap-2 mb-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setTipPercent(p)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  tipPercent === p ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
          <NumberInput label="" value={tipPercent} onChange={setTipPercent} unit="%" step={1} />
        </div>
        <NumberInput label="Split Between" value={numPeople} onChange={setNumPeople} unit="people" step={1} min={1} />

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ResultCard label="Tip Amount" value={`$${fmt(tipAmount)}`} />
          <ResultCard label="Total" value={`$${fmt(totalAmount)}`} />
          <ResultCard label="Per Person" value={`$${fmt(perPerson)}`} highlight />
          <ResultCard label="Tip Per Person" value={`$${fmt(tipPerPerson)}`} />
        </div>
      </div>
    </CalculatorShell>
  );
}
