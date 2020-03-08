using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class EmployeeForCreationDto
    {
        public string deptName { get; set; }
        public string Title { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool CanEdit { get; set; }
        
    }
}