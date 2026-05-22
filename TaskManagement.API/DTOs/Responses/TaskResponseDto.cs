namespace TaskManagement.API.DTOs.Responses;

public class TaskResponseDto
{
    public int Id { get; set; }

    public string Title { get; set; }

    public string? Description { get; set; }

    public bool IsCompleted { get; set; }

    public int Priority { get; set; }

    public DateTime? DueDate { get; set; }

    public DateTime CreatedDate { get; set; }
}