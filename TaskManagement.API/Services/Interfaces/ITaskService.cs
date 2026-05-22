using TaskManagement.API.DTOs.Requests;
using TaskManagement.API.DTOs.Responses;

namespace TaskManagement.API.Services.Interfaces;

public interface ITaskService
{
    Task<List<TaskResponseDto>> GetAllAsync();

    Task<TaskResponseDto?> GetByIdAsync(int id);

    Task<TaskResponseDto> CreateAsync(CreateTaskRequestDto request);

    Task<bool> UpdateAsync(int id, UpdateTaskRequestDto request);

    Task<bool> DeleteAsync(int id);
}