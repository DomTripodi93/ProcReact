using System.Collections.Generic;

namespace backend.Models
{
    public class Department
    {
        public User User { get; set; }
        public int userId { get; set; }
        public string DeptName { get; set; }
        public string FuncName { get; set; }
        public ICollection<Objective> Objective { get; set; }
        public ICollection<Employee> Employee { get; set; }
        
    }
}