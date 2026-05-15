namespace RetirementCalculatorApi.DTOs;

public class RetirementCalculationResponse
{
    public decimal EmployeeAnnualContribution { get; set; }

    public decimal EmployerAnnualMatch { get; set; }

    public decimal TotalAnnualContribution { get; set; }

    public int YearsUntilRetirement { get; set; }

    public decimal ProjectedRetirementBalance { get; set; }

    public decimal TotalEmployeeContributions { get; set; }

    public decimal TotalEmployerContributions { get; set; }

    public decimal TotalContributions { get; set; }

    public decimal EstimatedInvestmentGrowth { get; set; }

    public List<YearlyProjection> YearlyProjections { get; set; } = new();
}

public class YearlyProjection
{
    public int Year { get; set; }
    public int Age { get; set; }
    public decimal Balance { get; set; }
}