using System;
using System.Security.Claims;
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
        private readonly IAuthRepository _authRepo;
        public UserController(IMapper mapper, IUserRepository repo, IAuthRepository authRepo)
        {
            _mapper = mapper;
            _repo = repo;
            _authRepo = authRepo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var returnUser = _mapper.Map<UserForReturnDto>(user);
            return Ok(returnUser);
        }

        [HttpGet("settings/{id}")]
        public async Task<IActionResult> GetUserSettings(int id)
        {
            var userSettings = await _repo.GetUserSettings(id);
            var returnUser = _mapper.Map<SettingsForCreationDto>(userSettings);
            return Ok(returnUser);
        }

        [HttpPut("rootId/{id}")]
        public async Task<IActionResult> InitializeRootIdForUser(int id)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(id);

            if (user.RootId > 0){
                throw new Exception("Root ID already exists");                
            }
            
            user.RootId = id;

            if (await _repo.SaveAll())
                return Ok(user.Name + " Root ID was Updated!");
            
            throw new Exception("Update of Rood ID failed on save");
        }
        
    }
}