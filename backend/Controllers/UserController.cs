using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _repo;
        public UserController(IMapper mapper, IUserRepository repo)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var returnUser = _mapper.Map<UserForReturnDto>(user);
            return Ok(returnUser);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserSettings(int id)
        {
            var userSettings = await _repo.GetUserSettings(id);
            var returnUser = _mapper.Map<SettingsForCreationDto>(userSettings);
            return Ok(returnUser);
        }
        
    }
}