using TaskManagement.API.Models;

namespace TaskManagement.API.Repositories.Interfaces;

public interface IUserRepository
{
    Task<User?> GetUserAsync(string username, string password);
}