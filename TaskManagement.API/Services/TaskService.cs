using TaskManagement.API.DTOs.Requests;
using TaskManagement.API.DTOs.Responses;
using TaskManagement.API.Models;
using TaskManagement.API.Repositories.Interfaces;
using TaskManagement.API.Services.Interfaces;

namespace TaskManagement.API.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _taskRepository;

    public TaskService(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<List<TaskResponseDto>> GetAllAsync()
    {
        var tasks = await _taskRepository.GetAllAsync();

        return tasks.Select(task => new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted,
            Priority = task.Priority,
            DueDate = task.DueDate,
            CreatedDate = task.CreatedDate
        }).ToList();
    }

    public async Task<TaskResponseDto?> GetByIdAsync(int id)
    {
        var task = await _taskRepository.GetByIdAsync(id);

        if (task == null)
            return null;

        return new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted,
            Priority = task.Priority,
            DueDate = task.DueDate,
            CreatedDate = task.CreatedDate
        };
    }

    public async Task<TaskResponseDto> CreateAsync(CreateTaskRequestDto request)
    {
        var task = new TaskItem
        {
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            DueDate = request.DueDate,
            IsCompleted = false,
            CreatedDate = DateTime.UtcNow,
            UserId = 1
        };

        var createdTask = await _taskRepository.CreateAsync(task);

        return new TaskResponseDto
        {
            Id = createdTask.Id,
            Title = createdTask.Title,
            Description = createdTask.Description,
            IsCompleted = createdTask.IsCompleted,
            Priority = createdTask.Priority,
            DueDate = createdTask.DueDate,
            CreatedDate = createdTask.CreatedDate
        };
    }

    public async Task<bool> UpdateAsync(int id, UpdateTaskRequestDto request)
    {
        var task = await _taskRepository.GetByIdAsync(id);

        if (task == null)
            return false;

        task.Title = request.Title;
        task.Description = request.Description;
        task.IsCompleted = request.IsCompleted;
        task.Priority = request.Priority;
        task.DueDate = request.DueDate;

        await _taskRepository.UpdateAsync(task);

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var task = await _taskRepository.GetByIdAsync(id);

        if (task == null)
            return false;

        await _taskRepository.DeleteAsync(task);

        return true;
    }
}