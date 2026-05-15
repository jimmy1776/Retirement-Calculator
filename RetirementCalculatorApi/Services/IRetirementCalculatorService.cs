using RetirementCalculatorApi.DTOs;

namespace RetirementCalculatorApi.Services;

public interface IRetirementCalculatorService
{
    RetirementCalculationResponse Calculate(RetirementCalculationRequest request);
}