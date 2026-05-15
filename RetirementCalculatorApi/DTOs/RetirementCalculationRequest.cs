using System.ComponentModel.DataAnnotations;

namespace RetirementCalculatorApi.DTOs;

public class RetirementCalculationRequest:IValidatableObject
{
    [Required]
    [Range(1, 10_000_000.00, ErrorMessage = "Annual salary must be greater than zero.")]
    public decimal AnnualSalary { get; set; }

    [Required]
    [Range(0.0, 100.0, ErrorMessage = "Contribution percentage must be between 0 and 100.")]
    public decimal EmployeeContributionPercent { get; set; }

    [Required]
    [Range(18, 120, ErrorMessage = "Current age must be between 18 and 120.")]
    public int CurrentAge { get; set; }

    [Required]
    [Range(18, 120, ErrorMessage = "Retirement age must be between 18 and 120.")]
    public int RetirementAge { get; set; }

    [Required]
    [Range(0.0, 100_000_000.00, ErrorMessage = "Current balance cannot be negative.")]
    public decimal CurrentRetirementBalance { get; set; }

    [Required]
    [Range(-20.0, 50.0, ErrorMessage = "Expected return must be realistic (e.g., -20% to 50%).")]
    public decimal ExpectedAnnualReturnPercent { get; set; }

    [Required]
    [Range(0.0, 100.0, ErrorMessage = "Employer match must be between 0 and 100.")]
    public decimal EmployerMatchPercent { get; set; }

    [Required]
    [Range(0.0, 100.0, ErrorMessage = "Employer match limit must be between 0 and 100.")]
    public decimal EmployerMatchLimitPercent { get; set; }


    public IEnumerable<ValidationResult> Validate (ValidationContext validationContext)
    {
        if (RetirementAge <= CurrentAge)
        {
            yield return new ValidationResult(
                "Retirement age must be greater than current age.",
                new[] {nameof(RetirementAge),nameof(CurrentAge)}
            );
        }
    }



}


//note: [Range] checks one property at a time, IValidatableObject checks relationship between properties 