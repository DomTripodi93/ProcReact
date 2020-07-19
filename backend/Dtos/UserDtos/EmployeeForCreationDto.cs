using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class EmployeeForCreationDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Required]
        [StringLength(25, MinimumLength=6, ErrorMessage="Password must be at least 6 characters")]

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
        public string deptName { get; set; }
        public string Title { get; set; }

        [Required]
        public bool CanEdit { get; set; }
        
    }
}