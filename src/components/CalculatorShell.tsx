"use client";

import { ReactNode } from "react";
import Link from "next/link";

const related = [
  { href: "/mortgage-calculator", label: "Mortgage" },
  { href: "/compound-interest-calculator", label: "Compound Interest" },
  { href: "/loan-payoff-calculator", label: "Loan Payoff" },
  { href: "/retirement-calculator", label: "Retirement" },
  { href: "/salary-calculator", label: "Salary" },
  { href: "/debt-payoff-calculator", label: "Debt Payoff" },
  { href: "/car-loan-calculator", label: "Car Loan" },
  { href: "/tip-calculator", label: "Tip" },
  { href: "/net-worth-calculator", label: "Net Worth" },
  { href: "/savings-goal-calculator", label: "Savings Goal" },
];

export function NumberInput({
  label,
  value,
  onChange,
  unit,
  min = 0,
  step = 0.1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  min?: number;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {unit && <span className="text-gray-400 ml-1">({unit})</span>}
      </label>
      <input
        type="number"
        min={min}
        step={step}
        value={value || ""}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ResultCard({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-4 rounded-lg ${
        highlight ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
      } border`}
    >
      <p className="text-sm text-gray-600">{label}</p>
      <p
        className={`text-2xl font-bold ${
          highlight ? "text-blue-700" : "text-gray-900"
        }`}
      >
        {value}
        {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
      </p>
    </div>
  );
}

export default function CalculatorShell({
  title,
  description,
  children,
  faqItems,
  currentPath,
}: {
  title: string;
  description: string;
  children: ReactNode;
  faqItems: { q: string; a: string }[];
  currentPath: string;
}) {
  const otherCalcs = related.filter((r) => r.href !== currentPath);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-8">{description}</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        {children}
      </div>

      {faqItems.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="border border-gray-200 rounded-lg"
              >
                <summary className="px-4 py-3 cursor-pointer font-medium text-sm hover:bg-gray-50">
                  {item.q}
                </summary>
                <p className="px-4 pb-3 text-sm text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-3">Other Calculators</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {otherCalcs.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="text-sm text-blue-600 hover:text-blue-800 py-1"
            >
              {c.label} →
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
