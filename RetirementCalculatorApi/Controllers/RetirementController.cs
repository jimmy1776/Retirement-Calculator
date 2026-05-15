using RetirementCalculatorApi.Services;
using RetirementCalculatorApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace RetirementCalculatorApi.Controllers; 

[ApiController] 
[Route("api/[Controller]")]


public class RetirementController: ControllerBase
{
    private readonly IRetirementCalculatorService _retirementCalculatorService; 
    
    public RetirementController(IRetirementCalculatorService retirementCalculatorService)
    {
        _retirementCalculatorService = retirementCalculatorService;
    }

    [HttpPost("calculate")]
    public ActionResult<RetirementCalculationResponse> Calculate(
        RetirementCalculationRequest request)
    {
        RetirementCalculationResponse response = 
        _retirementCalculatorService.Calculate(request);
        return Ok(response);
    }
    
}









