using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Data
{
    public interface IScheduleRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<User> GetEmployee(int userId, int employeeId);
        Task<User> GetUserForEmployeeIdIncrement(int userId);
        Task<IEnumerable<User>> GetEmployees(int userId);
        Task<IEnumerable<User>> GetEmployeesByDepartment(int userId, string deptName);
        Task<Schedule> GetScheduledTask(int id);
        Task<IEnumerable<Schedule>> GetScheduledTasksForAccountDay(int userId, int Month, int Year, int Day);
        Task<IEnumerable<Schedule>> GetScheduledTasksForEmployeeDay(int userId, int employeeId, int Month, int Year, int Day);
    }
}