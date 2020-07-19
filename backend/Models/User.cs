using System.Collections.Generic;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public int RootId { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string deptName { get; set; }
        public string Title { get; set; }
        public bool CanEdit { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public ICollection<Department> Department { get; set; }
        public ICollection<Employee> Employee { get; set; }
        public int EmployeeIdIncrement { get; set; }
        public Settings Settings { get; set; }
    }
}