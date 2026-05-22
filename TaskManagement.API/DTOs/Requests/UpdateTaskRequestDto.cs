using System.ComponentModel.DataAnnotations;

namespace TaskManagement.API.DTOs.Requests;

public class UpdateTaskRequestDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; }

    public string? Description { get; set; }

    public bool IsCompleted { get; set; }

    public int Priority { get; set; }

    public DateTime? DueDate { get; set; }
}