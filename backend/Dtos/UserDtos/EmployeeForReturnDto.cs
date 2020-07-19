namespace backend.Dtos
{
    public class EmployeeForReturnDto
    {
        public int rootId { get; set; }
        public int Id { get; set; }
        public string deptName { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public bool CanEdit { get; set; }
        
    }
}