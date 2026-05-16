# Retirement Calculator

A full-stack retirement calculator web app built with an ASP.NET Core Web API backend and a Next.js frontend.

Users can enter their salary, contribution rate, employer match, current retirement balance, age, retirement age, and expected annual return. The app calculates a projected retirement balance, contribution breakdown, and yearly growth projection.

## Tech Stack

### Backend

- C#
- ASP.NET Core Web API
- xUnit
- Swagger / OpenAPI

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts

## Features

- Calculates projected retirement balance
- Calculates employee annual contribution
- Calculates employer annual match
- Applies employer match limits
- Calculates total employee and employer contributions
- Calculates estimated investment growth
- Returns yearly projection data
- Displays results in a clean frontend results card
- Displays projected growth over time in a line chart
- Validates user input on the backend
- Includes unit tests for backend calculation logic

## Project Structure

```text
RetirementCalculator
├── RetirementCalculatorApi
│   ├── Controllers
│   ├── DTOs
│   ├── Services
│   ├── Program.cs
│   └── RetirementCalculatorApi.csproj
│
├── RetirementCalculatorApi.Tests
│   ├── RetirementCalculatorServiceTests.cs
│   └── RetirementCalculatorApi.Tests.csproj
│
├── retirement-calculator-frontend
│   ├── src
│   │   └── app
│   │       └── page.tsx
│   ├── package.json
│   └── next.config.ts
│
├── .gitignore
└── README.md
```

## API Endpoint

### POST `/api/retirement/calculate`

Calculates projected retirement savings based on the user's input.

### Sample Request

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

### Sample Response

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

The `yearlyProjections` array is shortened in this example. The actual API response includes one projection for each year until retirement.

## Validation

The backend validates incoming requests before performing calculations.

Current validation includes:

- Annual salary must be greater than zero
- Employee contribution percentage must be between 0 and 100
- Current age must be between 18 and 120
- Retirement age must be between 18 and 120
- Retirement age must be greater than current age
- Current retirement balance cannot be negative
- Expected annual return must be between -20% and 50%
- Employer match percentage must be between 0 and 100
- Employer match limit percentage must be between 0 and 100

Invalid requests return a `400 Bad Request` response.

## Running the Backend

From the backend project folder:

```bash
cd RetirementCalculatorApi
dotnet run
```

Swagger will be available at the local URL shown in the terminal, usually:

```text
http://localhost:5121/swagger
```

## Running the Frontend

From the frontend project folder:

```bash
cd retirement-calculator-frontend
npm install
npm run dev
```

The frontend will usually run at:

```text
http://localhost:3000
```

## Running Tests

From the test project folder:

```bash
cd RetirementCalculatorApi.Tests
dotnet test
```

The tests cover core backend calculation logic, including:

- Years until retirement
- Employee annual contribution
- Employer annual match
- Employer match limit behavior
- Total annual contribution
- Yearly projection data
- Edge cases in calculation behavior

## Local Development Notes

The frontend currently calls the backend at:

```text
http://localhost:5121/api/retirement/calculate
```

The backend uses CORS to allow requests from:

```text
http://localhost:3000
```

Both the backend and frontend need to be running at the same time for the full app to work locally.

## Future Improvements

- Improve frontend validation messages
- Move API URL into an environment variable
- Add screenshots to the README
- Improve mobile styling
- Add more chart details
- Deploy backend and frontend

## Status

Full-stack MVP is complete.

Completed so far:

- ASP.NET Core Web API backend
- Backend DTO validation
- Retirement calculation service
- Yearly projection data
- Unit tests
- Next.js frontend
- Form submission to backend API
- Results card
- Projected growth chart
