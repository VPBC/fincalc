"use client";

import { useState } from "react";
import CalculatorShell, { NumberInput, SelectInput, ResultCard } from "@/components/CalculatorShell";

export default function SalaryCalculator() {
  const [amount, setAmount] = useState(75000);
  const [inputType, setInputType] = useState("annual");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtR = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  let annual = 0;
  const totalHoursPerYear = hoursPerWeek * weeksPerYear;

  switch (inputType) {
    case "hourly": annual = amount * totalHoursPerYear; break;
    case "weekly": annual = amount * weeksPerYear; break;
    case "biweekly": annual = amount * (weeksPerYear / 2); break;
    case "monthly": annual = amount * 12; break;
    case "annual": annual = amount; break;
  }

  const hourly = totalHoursPerYear > 0 ? annual / totalHoursPerYear : 0;
  const daily = hoursPerWeek > 0 ? annual / (weeksPerYear * 5) : 0;
  const weekly = weeksPerYear > 0 ? annual / weeksPerYear : 0;
  const biweekly = weeksPerYear > 0 ? annual / (weeksPerYear / 2) : 0;
  const monthly = annual / 12;

  return (
    <CalculatorShell
      title="Salary Calculator — Convert Between Hourly, Monthly & Annual Pay"
      description="Instantly convert between hourly, weekly, biweekly, monthly, and annual salary. Customize hours per week and weeks per year."
      currentPath="/salary-calculator"
      faqItems={[
        { q: "How do I convert hourly to annual salary?", a: "Multiply your hourly rate by the number of hours you work per week, then multiply by 52 weeks. For example, $25/hour × 40 hours × 52 weeks = $52,000/year." },
        { q: "How many work hours in a year?", a: "A standard full-time year is 2,080 hours (40 hours × 52 weeks). Accounting for holidays and vacation (typically 10 days each), the actual working hours are closer to 1,920." },
        { q: "What is biweekly pay?", a: "Biweekly pay means you get paid every two weeks — 26 paychecks per year. This is different from semi-monthly (2 times per month, 24 paychecks per year)." },
        { q: "Is $30 an hour good?", a: "$30/hour equals $62,400/year (at 40 hours/week). Whether this is 'good' depends on your location and cost of living. It's above the US median hourly wage of approximately $23." },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <NumberInput label="Amount" value={amount} onChange={setAmount} unit="$" step={inputType === "hourly" ? 1 : 1000} />
          <SelectInput label="Pay Period" value={inputType} onChange={setInputType} options={[
            { value: "hourly", label: "Hourly" }, { value: "weekly", label: "Weekly" },
            { value: "biweekly", label: "Biweekly" }, { value: "monthly", label: "Monthly" },
            { value: "annual", label: "Annual" },
          ]} />
          <NumberInput label="Hours/Week" value={hoursPerWeek} onChange={setHoursPerWeek} step={1} />
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <ResultCard label="Hourly" value={`$${fmt(hourly)}`} highlight={inputType !== "hourly"} />
          <ResultCard label="Daily" value={`$${fmt(daily)}`} />
          <ResultCard label="Weekly" value={`$${fmtR(Math.round(weekly))}`} />
          <ResultCard label="Biweekly" value={`$${fmtR(Math.round(biweekly))}`} />
          <ResultCard label="Monthly" value={`$${fmtR(Math.round(monthly))}`} />
          <ResultCard label="Annual" value={`$${fmtR(Math.round(annual))}`} highlight={inputType !== "annual"} />
        </div>
      </div>
    </CalculatorShell>
  );
}
