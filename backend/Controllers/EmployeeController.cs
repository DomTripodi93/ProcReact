using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/{userId}/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IScheduleRepository _repo;
        private readonly IAuthRepository _authRepo;

        public EmployeeController(IMapper mapper, IScheduleRepository repo, IAuthRepository authRepo){
            _mapper = mapper;
            _repo = repo;
            _authRepo = authRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee(int userId, EmployeeForCreationDto employeeForCreation)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var employee = _mapper.Map<User>(employeeForCreation);

            if (await _authRepo.UserExists(employeeForCreation.Email))
                return BadRequest("Email already exists");

            if (employeeForCreation.Password != employeeForCreation.ConfirmPassword)
                return BadRequest("Passwords do not match!");

            await _authRepo.RegisterEmployee(employee, employeeForCreation.Password, userId);

            return StatusCode(201);
        }

        [HttpGet("{employeeId}", Name="GetEmployee")]
        public async Task<IActionResult> GetEmployee(int userId, int employeeId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var employeeFromRepo = await _repo.GetEmployee(userId, employeeId);

            EmployeeForReturnDto employeeForReturn = _mapper.Map<EmployeeForReturnDto>(employeeFromRepo);

            return Ok(employeeForReturn);

        }

        [HttpGet("byUser")]
        public async Task<IActionResult> GetEmployees(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<User> employeesFromRepo = await _repo.GetEmployees(userId);

            IEnumerable<EmployeeForReturnDto> employeeForReturn = _mapper.Map<IEnumerable<EmployeeForReturnDto>>(employeesFromRepo);

            return Ok(employeeForReturn);

        }

        [HttpGet("byDepartment/{deptName}")]
        public async Task<IActionResult> GetEmployeesByDepartment(int userId, string deptName)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<User> employeesFromRepo = await _repo.GetEmployeesByDepartment(userId, deptName);

            IEnumerable<EmployeeForReturnDto> employeesForReturn = _mapper.Map<IEnumerable<EmployeeForReturnDto>>(employeesFromRepo);

            return Ok(employeesForReturn);

        }

        [HttpPut("{employeeId}")]
        public async Task<IActionResult> UpdateEmployee(int userId, int employeeId, EmployeeForUpdateDto employeeForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var employeeFromRepo = await _repo.GetEmployee(userId, employeeId);

            _mapper.Map(employeeForUpdateDto, employeeFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetEmployee", new {employeeId = employeeFromRepo.Id, userId = userId }, employeeFromRepo);

            throw new Exception($"Updating employee {employeeId} failed on save");
        }

        [HttpDelete("{employeeId}")]
        public async Task<IActionResult> DeleteEmployee(int userId, int employeeId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var employeeFromRepo = await _repo.GetEmployee(userId, employeeId);
            
            _repo.Delete(employeeFromRepo);
            
            if (await _repo.SaveAll())
                return Ok("Employee " + employeeFromRepo.Id + " was deleted!");
        
            throw new Exception($"Deleting employee {employeeId} failed on save");
        }
    }
}