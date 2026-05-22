using TaskManagement.API.DTOs.Requests;

namespace TaskManagement.API.Services.Interfaces;

public interface IAuthService
{
    Task<bool> LoginAsync(LoginRequestDto request);
}