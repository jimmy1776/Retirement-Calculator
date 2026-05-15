using RetirementCalculatorApi.DTOs;

namespace RetirementCalculatorApi.Services;

public class RetirementCalculatorService : IRetirementCalculatorService
{
    public RetirementCalculationResponse Calculate(RetirementCalculationRequest request)
    {
        int yearsUntilRetirement = request.RetirementAge - request.CurrentAge;

        decimal employeeAnnualContribution =
            request.AnnualSalary * (request.EmployeeContributionPercent / 100);

        decimal employerMatchablePercent = Math.Min(
            request.EmployeeContributionPercent,
            request.EmployerMatchLimitPercent
        );

        decimal employerAnnualMatch =
            request.AnnualSalary *
            (employerMatchablePercent / 100) *
            (request.EmployerMatchPercent / 100);

        decimal totalAnnualContribution =
            employeeAnnualContribution + employerAnnualMatch;

        decimal projectedBalance = request.CurrentRetirementBalance;

        decimal annualReturnRate =
            request.ExpectedAnnualReturnPercent / 100;

        List<YearlyProjection> yearlyProjections = new();

        for (int year = 1; year <= yearsUntilRetirement; year++)
        {
            projectedBalance = projectedBalance * (1 + annualReturnRate);
            projectedBalance += totalAnnualContribution;

            yearlyProjections.Add(new YearlyProjection
            {
                Year = year,
                Age = request.CurrentAge + year,
                Balance = Math.Round(projectedBalance, 2)
            });
        }

        decimal totalEmployeeContributions =
            employeeAnnualContribution * yearsUntilRetirement;

        decimal totalEmployerContributions =
            employerAnnualMatch * yearsUntilRetirement;

        decimal totalContributions =
            totalEmployeeContributions + totalEmployerContributions;

        decimal estimatedInvestmentGrowth =
            projectedBalance - request.CurrentRetirementBalance - totalContributions;

        return new RetirementCalculationResponse
        {
            EmployeeAnnualContribution = Math.Round(employeeAnnualContribution, 2),
            EmployerAnnualMatch = Math.Round(employerAnnualMatch, 2),
            TotalAnnualContribution = Math.Round(totalAnnualContribution, 2),
            YearsUntilRetirement = yearsUntilRetirement,
            ProjectedRetirementBalance = Math.Round(projectedBalance, 2),
            TotalEmployeeContributions = Math.Round(totalEmployeeContributions, 2),
            TotalEmployerContributions = Math.Round(totalEmployerContributions, 2),
            TotalContributions = Math.Round(totalContributions, 2),
            EstimatedInvestmentGrowth = Math.Round(estimatedInvestmentGrowth, 2),
            YearlyProjections = yearlyProjections
        };
    }
}