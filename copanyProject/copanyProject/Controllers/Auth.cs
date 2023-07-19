using copanyProject.Models;
using copanyProject.Request;
using copanyProject.Response;
using copanyProject.Responses;
using copanyProject.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace copanyProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly CompanySystemContext _context;
        private readonly TokenService _tokenService;

        public AuthController(CompanySystemContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("authenticate")]
        public async Task<ActionResult<LoginResponse>> Authenticate([FromBody] LoginRequest request)
        {
            Request.Headers.TryGetValue("authorization", out StringValues headerValue);
            var token = headerValue.FirstOrDefault()?.Replace("Bearer ", string.Empty);
            Personal userInDb = null;
            if (token != "")
            {
                var personalId = _tokenService.ValidateToken(token);
                if(personalId != null)
                    userInDb = _context.Personals.FirstOrDefault(u => u.Id == personalId);
            }

            if (request.EmailAddress != null && request.Password != null) {
                userInDb = _context.Personals.FirstOrDefault(u => u.EmailAddress == request.EmailAddress && u.Password == request.Password);
                if (userInDb is null)
                    return Unauthorized();

                token = _tokenService.CreateToken(userInDb);
                await _context.SaveChangesAsync();

            }
            if(userInDb is null)
                return Unauthorized();

            return Ok(new LoginResponse
            {
                PersonalDetails =
                {
                    Name = userInDb.Name,
                    Avatar = userInDb.Avatar,
                    JoinedAt = userInDb.JoinedAt,
                    Team = userInDb.Team
                },
                Token = token
            });
        }

        [HttpGet]
        [Route("info")]
        public async Task<ActionResult<InfoResponse>> Info()
        {
            Request.Headers.TryGetValue("authorization", out StringValues headerValue);
            var token = headerValue.FirstOrDefault().Replace("Bearer ", string.Empty);
            var personalId = _tokenService.ValidateToken(token).ToString();

            if (personalId is null)
                return Unauthorized();
            
            var projects = _context.Projects.Where(u => u.PersonalId == int.Parse(personalId)).ToList();

            return Ok(new InfoResponse
            {
                ProjectList = projects
            });
        }
    }
}
