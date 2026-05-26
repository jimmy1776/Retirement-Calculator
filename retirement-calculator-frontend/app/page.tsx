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
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const pageBg = isDark ? "bg-gray-900" : "bg-gray-50";
  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const subtextColor = isDark ? "text-gray-400" : "text-gray-600";
  const labelColor = isDark ? "text-gray-300" : "text-gray-700";
  const resultSectionBg = isDark ? "bg-gray-700" : "bg-gray-50";
  const resultSectionBorder = isDark ? "border-gray-600" : "border-gray-200";
  const innerCardBg = isDark ? "bg-gray-600" : "bg-white";
  const statLabelColor = isDark ? "text-gray-300" : "text-gray-500";
  const statValueColor = isDark ? "text-white" : "text-gray-900";
  const toggleBg = isDark
    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";

  const inputClass = isDark
    ? "mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-gray-100 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
    : "mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";

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
    <main className={`min-h-screen ${pageBg} px-6 py-10`}>
      <section className={`mx-auto max-w-3xl rounded-2xl ${cardBg} p-8 shadow`}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${headingColor}`}>
              Retirement Calculator
            </h1>
            <p className={`mt-2 ${subtextColor}`}>
              Enter your retirement details to estimate your projected retirement
              balance.
            </p>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`ml-4 flex-shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${toggleBg}`}
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <div>
            <label className={`block text-sm font-medium ${labelColor}`}>
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
            <label className={`block text-sm font-medium ${labelColor}`}>
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
            <label className={`block text-sm font-medium ${labelColor}`}>
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
            <label className={`block text-sm font-medium ${labelColor}`}>
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
            <label className={`block text-sm font-medium ${labelColor}`}>
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
            <label className={`block text-sm font-medium ${labelColor}`}>
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
            <label className={`block text-sm font-medium ${labelColor}`}>
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
            <label className={`block text-sm font-medium ${labelColor}`}>
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
          <section
            className={`mt-8 rounded-2xl border ${resultSectionBorder} ${resultSectionBg} p-6`}
          >
            <h2 className={`text-2xl font-bold ${headingColor}`}>
              Retirement Projection
            </h2>

            <p className={`mt-2 ${subtextColor}`}>
              Based on your inputs, here is your estimated retirement outcome.
            </p>

            <div className={`mt-6 rounded-xl ${innerCardBg} p-5 shadow-sm`}>
              <p className={`text-sm font-medium ${statLabelColor}`}>
                Projected Retirement Balance
              </p>
              <p className={`mt-1 text-4xl font-bold ${statValueColor}`}>
                {formatCurrency(result.projectedRetirementBalance)}
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className={`rounded-xl ${innerCardBg} p-5 shadow-sm`}>
                <p className={`text-sm font-medium ${statLabelColor}`}>
                  Years Until Retirement
                </p>
                <p className={`mt-1 text-2xl font-semibold ${statValueColor}`}>
                  {result.yearsUntilRetirement}
                </p>
              </div>

              <div className={`rounded-xl ${innerCardBg} p-5 shadow-sm`}>
                <p className={`text-sm font-medium ${statLabelColor}`}>
                  Total Annual Contribution
                </p>
                <p className={`mt-1 text-2xl font-semibold ${statValueColor}`}>
                  {formatCurrency(result.totalAnnualContribution)}
                </p>
              </div>

              <div className={`rounded-xl ${innerCardBg} p-5 shadow-sm`}>
                <p className={`text-sm font-medium ${statLabelColor}`}>
                  Employee Annual Contribution
                </p>
                <p className={`mt-1 text-2xl font-semibold ${statValueColor}`}>
                  {formatCurrency(result.employeeAnnualContribution)}
                </p>
              </div>

              <div className={`rounded-xl ${innerCardBg} p-5 shadow-sm`}>
                <p className={`text-sm font-medium ${statLabelColor}`}>
                  Employer Annual Match
                </p>
                <p className={`mt-1 text-2xl font-semibold ${statValueColor}`}>
                  {formatCurrency(result.employerAnnualMatch)}
                </p>
              </div>

              <div className={`rounded-xl ${innerCardBg} p-5 shadow-sm`}>
                <p className={`text-sm font-medium ${statLabelColor}`}>
                  Total Contributions
                </p>
                <p className={`mt-1 text-2xl font-semibold ${statValueColor}`}>
                  {formatCurrency(result.totalContributions)}
                </p>
              </div>

              <div className={`rounded-xl ${innerCardBg} p-5 shadow-sm`}>
                <p className={`text-sm font-medium ${statLabelColor}`}>
                  Estimated Investment Growth
                </p>
                <p className={`mt-1 text-2xl font-semibold ${statValueColor}`}>
                  {formatCurrency(result.estimatedInvestmentGrowth)}
                </p>
              </div>
            </div>

            <div className={`mt-8 rounded-xl ${innerCardBg} p-5 shadow-sm`}>
              <h3 className={`text-xl font-bold ${headingColor}`}>
                Projected Growth Over Time
              </h3>

              <p className={`mt-1 text-sm ${subtextColor}`}>
                Estimated retirement balance by age.
              </p>

              <div className="w-full h-80 min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={result.yearlyProjections}
                    margin={{ top: 20, right: 30, left: 40, bottom: 30 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "#4b5563" : "#e5e7eb"}
                    />

                    <XAxis
                      dataKey="age"
                      stroke={isDark ? "#9ca3af" : "#6b7280"}
                      label={{
                        value: "Age",
                        position: "insideBottom",
                        offset: -5,
                        fill: isDark ? "#9ca3af" : "#6b7280",
                      }}
                    />

                    <YAxis
                      stroke={isDark ? "#9ca3af" : "#6b7280"}
                      tickFormatter={(value) =>
                        `$${Number(value).toLocaleString("en-US", {
                          maximumFractionDigits: 0,
                        })}`
                      }
                    />

                    <Tooltip
                      labelFormatter={(label) => `Age ${label}`}
                      labelStyle={{
                        color: isDark ? "#f3f4f6" : "#111827",
                        fontWeight: 600,
                      }}
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        borderColor: isDark ? "#374151" : "#e5e7eb",
                        color: isDark ? "#f3f4f6" : "#111827",
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
