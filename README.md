# Retirement Calculator API

An ASP.NET Core Web API that calculates projected retirement savings based on salary, contribution rate, employer match, current balance, age, retirement age, and expected annual return.

This backend is part of a future full-stack retirement calculator web app with a React/Next.js frontend.

## Tech Stack

- C#
- ASP.NET Core Web API
- xUnit
- Swagger / OpenAPI

## Features

- Calculates employee annual contribution
- Calculates employer match and match limits
- Projects retirement balance over time
- Returns yearly projection data for charting
- Validates user input
- Includes unit tests for backend calculation logic

## Endpoint

### POST `/api/retirement/calculate`

Sample request:

```json
{
  "annualSalary": 100000,
  "employeeContributionPercent": 10,
  "currentAge": 30,
  "retirementAge": 65,
  "currentRetirementBalance": 0,
  "expectedAnnualReturnPercent": 7,
  "employerMatchPercent": 50,
  "employerMatchLimitPercent": 6
}
```

Sample response:

```json
{
  "employeeAnnualContribution": 10000,
  "employerAnnualMatch": 3000,
  "totalAnnualContribution": 13000,
  "yearsUntilRetirement": 35,
  "projectedRetirementBalance": 1797079.42,
  "totalEmployeeContributions": 350000,
  "totalEmployerContributions": 105000,
  "totalContributions": 455000,
  "estimatedInvestmentGrowth": 1342079.42,
  "yearlyProjections": [
    {
      "year": 1,
      "age": 31,
      "balance": 13000
    },
    {
      "year": 2,
      "age": 32,
      "balance": 26910
    }
  ]
}
```

## Running Locally

```bash
cd RetirementCalculatorApi
dotnet run
```

Then open Swagger at the local URL shown in the terminal, usually:

```text
http://localhost:5121/swagger
```

## Running Tests

```bash
cd RetirementCalculatorApi.Tests
dotnet test
```

## Future Improvements

- Build React/Next.js frontend
- Add input form and results card
- Add chart using yearly projection data
- Deploy the full-stack app