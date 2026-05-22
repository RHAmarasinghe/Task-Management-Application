using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.DTOs.Requests;
using TaskManagement.API.Services.Interfaces;

namespace TaskManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto request)
    {
        var result = await _authService.LoginAsync(request);

        if (!result)
            return Unauthorized(new
            {
                Message = "Invalid username or password"
            });

        return Ok(new
        {
            Message = "Login successful"
        });
    }
}