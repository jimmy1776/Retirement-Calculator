using System.Reflection;
using System.Transactions;
using RetirementCalculatorApi.DTOs;
using RetirementCalculatorApi.Services;

namespace RetirementCalculatorApi.Tests;

public class RetirementCalculatorServiceTests
{
    [Fact]
    public void Calculate_ShouldReturnCorrectYearsUntilRetirement()
    {
        // Arrange
        var service = new RetirementCalculatorService();

        var request = new RetirementCalculationRequest
        {
            CurrentAge = 30,
            RetirementAge = 65,
            AnnualSalary = 100000,
            EmployeeContributionPercent = 10,
            EmployerMatchPercent = 50,
            EmployerMatchLimitPercent = 6,
            CurrentRetirementBalance = 0,
            ExpectedAnnualReturnPercent = 7
        };

        // Act
        var result = service.Calculate(request);

        // Assert
        Assert.Equal(35, result.YearsUntilRetirement);
    }

    [Fact]
    public void Calculate_ShouldReturnCorrectEmployeeAnnualContribution()
    {
        // Arrange
        var service = new RetirementCalculatorService();

        var request = new RetirementCalculationRequest
        {
            CurrentAge = 30,
            RetirementAge = 65,
            AnnualSalary = 100000,
            EmployeeContributionPercent = 10,
            EmployerMatchPercent = 50,
            EmployerMatchLimitPercent = 6,
            CurrentRetirementBalance = 0,
            ExpectedAnnualReturnPercent = 7
        };

        // Act
        var result = service.Calculate(request);

        // Assert
        Assert.Equal(10000, result.EmployeeAnnualContribution);
    }


    [Fact]
    public void Calculate_ShouldReturnCorrectEmployerAnnualMatch()
    {
        // Arrange
        var service = new RetirementCalculatorService();

        var request = new RetirementCalculationRequest
        {
            CurrentAge = 30,
            RetirementAge = 65,
            AnnualSalary = 100000,
            EmployeeContributionPercent = 10,
            EmployerMatchPercent = 50,
            EmployerMatchLimitPercent = 6,
            CurrentRetirementBalance = 0,
            ExpectedAnnualReturnPercent = 7
        };

        // Act
        var result = service.Calculate(request);

        // Assert
        Assert.Equal(3000, result.EmployerAnnualMatch);
    }
    [Fact]
    public void Calculate_ShouldReturnCorrectTotalAnnualContribution()
    {
        // Arrange
        var service = new RetirementCalculatorService();

        var request = new RetirementCalculationRequest
        {
            CurrentAge = 30,
            RetirementAge = 65,
            AnnualSalary = 100000,
            EmployeeContributionPercent = 10,
            EmployerMatchPercent = 50,
            EmployerMatchLimitPercent = 6,
            CurrentRetirementBalance = 0,
            ExpectedAnnualReturnPercent = 7
        };

        // Act
        var result = service.Calculate(request);

        // Assert
        Assert.Equal(13000, result.TotalAnnualContribution);
    }

    [Fact]
    public void Calculate_ShouldUseEmployeeContributionPercent_WhenBelowEmployerMatchLimit()
    {
        // Arrange
        var service = new RetirementCalculatorService();

        var request = new RetirementCalculationRequest
        {
            CurrentAge = 30,
            RetirementAge = 65,
            AnnualSalary = 100000,
            EmployeeContributionPercent = 4,
            EmployerMatchPercent = 50,
            EmployerMatchLimitPercent = 6,
            CurrentRetirementBalance = 0,
            ExpectedAnnualReturnPercent = 7
        };

        // Act
        var result = service.Calculate(request);

        // Assert
        Assert.Equal(2000, result.EmployerAnnualMatch);
    }
    [Fact]
    public void TestName()
    {
        // Arrange
        var service = new RetirementCalculatorService();

        var request = new RetirementCalculationRequest()
        {
            CurrentAge = 30,
            RetirementAge = 65,
            AnnualSalary = 100000,
            EmployeeContributionPercent = 10,
            EmployerMatchPercent = 50,
            EmployerMatchLimitPercent = 6,
            CurrentRetirementBalance = 0,
            ExpectedAnnualReturnPercent = 7
        };
        //Act
        var result = service.Calculate(request);

        //Assert 
        Assert.Equal(35, result.YearlyProjections.Count);
    }
    [Fact]
    public void Calculate_ShouldReturnCorrectFirstYearProjection()
    {
        // Arrange
        var service = new RetirementCalculatorService();

        var request = new RetirementCalculationRequest
        {
            CurrentAge = 30,
            RetirementAge = 65,
            AnnualSalary = 100000,
            EmployeeContributionPercent = 10,
            EmployerMatchPercent = 50,
            EmployerMatchLimitPercent = 6,
            CurrentRetirementBalance = 0,
            ExpectedAnnualReturnPercent = 7
        };

        // Act
        var result = service.Calculate(request);
        var firstProjection = result.YearlyProjections[0];

        // Assert
        Assert.Equal(1, firstProjection.Year);
        Assert.Equal(31, firstProjection.Age);
        Assert.Equal(13000, firstProjection.Balance);
    }
}


