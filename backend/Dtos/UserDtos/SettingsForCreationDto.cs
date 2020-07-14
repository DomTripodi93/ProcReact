namespace backend.Dtos
{
    public class SettingsForCreationDto
    {
        public bool IsNew { get; set; }
        public int RootId { get; set; }
        public string InitialEmployeePassword { get; set; }
        
    }
}