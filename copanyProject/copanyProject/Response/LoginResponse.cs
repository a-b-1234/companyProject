using copanyProject.Models;

namespace copanyProject.Responses
{
    public class LoginResponse
    {
        public Personal PersonalDetails { get; set; } = new();//todo another class
        public string Token { get; set; }
    }
}
