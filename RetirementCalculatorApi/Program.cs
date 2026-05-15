using RetirementCalculatorApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//dependency injection: if someone needs this interface, using this class
builder.Services.AddScoped<IRetirementCalculatorService, RetirementCalculatorService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

app.Run();

