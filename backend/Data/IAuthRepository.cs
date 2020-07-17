using System.Threading.Tasks;
using backend.Models;

namespace backend.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> RegisterEmployee(User user, string password, int rootId);
         Task InitializeEmployeeIdForIncrement(User user);
         Task<User> Login(string email, string password);
         Task<bool> UserExists(string email);
         Task<bool> UserExistsInOrganization(string email, int rootId);
    }
}