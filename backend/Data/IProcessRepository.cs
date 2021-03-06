using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Data
{
    public interface IProcessRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<Department> GetDepartment(int userId, string deptName);
        Task<IEnumerable<Department>> GetDepartments(int userId);
        Task<Objective> GetObjective(int userId, string deptName, string objectiveName);
        Task<IEnumerable<Objective>> GetObjectivesByDepartment(int userId, string deptName);
        Task<Step> GetStep(int userId, string deptName, string objectiveName, string stepNumber);
        Task<IEnumerable<Step>> GetSteps(int userId, string deptName, string objectiveName);
        Task<BestPractice> GetBestPractice(int id);
        Task<IEnumerable<BestPractice>> GetBestPractices(int userId, string deptName, string objectiveName, string stepNumber);
        Task<CommonDifficulty> GetCommonDifficulty(int id);
        Task<IEnumerable<CommonDifficulty>> GetCommonDifficulties(int userId, string deptName, string objectiveName, string stepNumber);        
    }
}