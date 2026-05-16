"use client";

import React, { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";




type YearlyProjection = {
  year: number;
  age: number;
  balance: number;
};

type RetirementResult = {
  employeeAnnualContribution: number;
  employerAnnualMatch: number;
  totalAnnualContribution: number;
  yearsUntilRetirement: number;
  projectedRetirementBalance: number;
  totalEmployeeContributions: number;
  totalEmployerContributions: number;
  totalContributions: number;
  estimatedInvestmentGrowth: number;
  yearlyProjections: YearlyProjection[];
};


export default function Home() {
  const [formData, setFormData] = useState({
    annualSalary: "",
    employeeContributionPercent: "",
    currentAge: "",
    retirementAge: "",
    currentRetirementBalance: "",
    expectedAnnualReturnPercent: "",
    employerMatchPercent: "",
    employerMatchLimitPercent: "",
  });

  const [result, setResult] = useState<RetirementResult | null>(null);
  const [error,setError] = useState("");
  const[isLoading,setIsLoading] = useState(false);




  const inputClass =
    "mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";

  //everytime you type into an input, React runs handleChange 
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setError("");
  setResult(null);
  setIsLoading(true);

  const requestBody = {
    annualSalary: Number(formData.annualSalary),
    employeeContributionPercent: Number(formData.employeeContributionPercent),
    currentAge: Number(formData.currentAge),
    retirementAge: Number(formData.retirementAge),
    currentRetirementBalance: Number(formData.currentRetirementBalance),
    expectedAnnualReturnPercent: Number(formData.expectedAnnualReturnPercent),
    employerMatchPercent: Number(formData.employerMatchPercent),
    employerMatchLimitPercent: Number(formData.employerMatchLimitPercent),
  };

  try {
    const response = await fetch(
      "http://localhost:5121/api/retirement/calculate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("API validation error:", data);
      setError("Please check your inputs and try again.");
      return;
    }

    console.log("API response:", data);
    setResult(data);
  } catch (error) {
    console.error(error);
    setError("Could not connect to the backend API.");
  } finally {
    setIsLoading(false);
  }
}
  function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  }


  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-900">
          Retirement Calculator
        </h1>

        <p className="mt-2 text-gray-600">
          Enter your retirement details to estimate your projected retirement
          balance.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Annual Salary
            </label>
            <input
              type="number"
              name="annualSalary"
              value={formData.annualSalary}
              onChange={handleChange}
              className={inputClass}
              placeholder="100000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee Contribution %
            </label>
            <input
              type="number"
              name="employeeContributionPercent"
              value={formData.employeeContributionPercent}
              onChange={handleChange}
              className={inputClass}
              placeholder="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Age
            </label>
            <input
              type="number"
              name="currentAge"
              value={formData.currentAge}
              onChange={handleChange}
              className={inputClass}
              placeholder="30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Retirement Age
            </label>
            <input
              type="number"
              name="retirementAge"
              value={formData.retirementAge}
              onChange={handleChange}
              className={inputClass}
              placeholder="65"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Retirement Balance
            </label>
            <input
              type="number"
              name="currentRetirementBalance"
              value={formData.currentRetirementBalance}
              onChange={handleChange}
              className={inputClass}
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expected Annual Return %
            </label>
            <input
              type="number"
              name="expectedAnnualReturnPercent"
              value={formData.expectedAnnualReturnPercent}
              onChange={handleChange}
              className={inputClass}
              placeholder="7"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employer Match %
            </label>
            <input
              type="number"
              name="employerMatchPercent"
              value={formData.employerMatchPercent}
              onChange={handleChange}
              className={inputClass}
              placeholder="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employer Match Limit %
            </label>
            <input
              type="number"
              name="employerMatchLimitPercent"
              value={formData.employerMatchLimitPercent}
              onChange={handleChange}
              className={inputClass}
              placeholder="6"
            />
          </div>

          <button
            type="submit"
            className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {isLoading ? "Calculating..." : "Calculate Retirement Projection"}
          </button>
        </form>
        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
)}

        {result && (
          <section className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Retirement Projection
            </h2>

            <p className="mt-2 text-gray-600">
              Based on your inputs, here is your estimated retirement outcome.
            </p>

            <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Projected Retirement Balance
              </p>
              <p className="mt-1 text-4xl font-bold text-gray-900">
                {formatCurrency(result.projectedRetirementBalance)}
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                  Years Until Retirement
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {result.yearsUntilRetirement}
                </p>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                  Total Annual Contribution
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {formatCurrency(result.totalAnnualContribution)}
                </p>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                  Employee Annual Contribution
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {formatCurrency(result.employeeAnnualContribution)}
                </p>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                  Employer Annual Match
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {formatCurrency(result.employerAnnualMatch)}
                </p>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                  Total Contributions
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {formatCurrency(result.totalContributions)}
                </p>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                  Estimated Investment Growth
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {formatCurrency(result.estimatedInvestmentGrowth)}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-white p-5 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">
                Projected Growth Over Time
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                Estimated retirement balance by age.
              </p>

              <div className="w-full h-80 min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.yearlyProjections}  
                   margin={{ top: 20, right: 30, left: 40, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="age"
                      label={{
                        value: "Age",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />

                    <YAxis
                      tickFormatter={(value) =>
                        `$${Number(value).toLocaleString("en-US", {
                          maximumFractionDigits: 0,
                        })}`
                      }
                    />

                    <Tooltip
                    labelFormatter={(label) => `Age ${label}`}
                     labelStyle={{
                    color: "#111827",
                    fontWeight: 600,
                    }}
                  formatter={(value) => [
                  formatCurrency(Number(value)),
                  "Projected Balance",
                  ]}
                     
                    />

                    <Line
                      type="monotone"
                      dataKey="balance"
                      strokeWidth={3}
                      dot={false}
                      name="Projected Balance"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
