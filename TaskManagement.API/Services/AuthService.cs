using TaskManagement.API.DTOs.Requests;
using TaskManagement.API.Repositories.Interfaces;
using TaskManagement.API.Services.Interfaces;

namespace TaskManagement.API.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;

    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<bool> LoginAsync(LoginRequestDto request)
    {
        var user = await _userRepository.GetUserAsync(
            request.Username,
            request.Password);

        return user != null;
    }
}