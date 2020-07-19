using System;
using System.Threading.Tasks;
using AutoMapper;
using backend.Dtos;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AuthRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<User> Login(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
            
            if (user == null)
                return null;

            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i=0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Title = "owner";
            user.CanEdit = true;

            SettingsForCreationDto settingsForCreation = new SettingsForCreationDto{
                IsNew = true,
                InitialEmployeePassword = "Password1!"
            };

            Settings settings = _mapper.Map<Settings>(settingsForCreation);

            user.Settings = settings;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> RegisterEmployee(User user, string password, int rootId)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.RootId = rootId;

            SettingsForCreationDto settingsForCreation = new SettingsForCreationDto{
                IsNew = true
            };

            Settings settings = _mapper.Map<Settings>(settingsForCreation);

            user.Settings = settings;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task InitializeEmployeeIdForIncrement (User user)
        {

            Employee accountOwner = new Employee
            {
                EmployeeId = 1,
                User = user,
                userId = user.Id,
                deptName = null,
                Name = user.Name,
                Title = "Owner",
                CanEdit = true
            };

            await _context.Employees.AddAsync(accountOwner);
            await _context.SaveChangesAsync();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string email)
        {
            if (await _context.Users.AnyAsync(x => x.Email == email))
                return true;
            return false;
        }

        public async Task<bool> UserExistsInOrganization(string email, int rootId)
        {
            if (await _context.Users
                .AnyAsync(x => x.Email == email & x.RootId == rootId)
            )
                return true;
            return false;
        }
    }
}