namespace backend.Models
{
    public class Settings
    {
        public User User { get; set; }
        public int userId { get; set; }
        public bool IsNew { get; set; }
        public int RootId { get; set; }
        public string InitialEmployeePassword { get; set; }
    }
}