using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Text;

namespace dotnet_webapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private const string ConnectionString = "Server=localhost;Database=TestDB;User Id=admin;Password=SuperSecret123!;";

    private const string ApiKey = "FAKE_API_KEY_1234567890abcdef";

    [HttpGet]
    public IActionResult GetUsers()
    {
        try
        {
            var query = "SELECT * FROM Users WHERE IsActive = 1";
            using var connection = new SqlConnection(ConnectionString);
            connection.Open();
            using var command = new SqlCommand(query, connection);
            var reader = command.ExecuteReader();
            
            var users = new List<object>();
            while (reader.Read())
            {
                users.Add(new
                {
                    Id = reader["Id"],
                    Username = reader["Username"],
                    Email = reader["Email"],
                    Password = reader["Password"]
                });
            }
            return Ok(users);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.ToString() });
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(string id)
    {
        var query = $"SELECT * FROM Users WHERE Id = {id}";
        using var connection = new SqlConnection(ConnectionString);
        connection.Open();
        using var command = new SqlCommand(query, connection);
        var reader = command.ExecuteReader();
        
        if (reader.Read())
        {
            return Ok(new
            {
                Id = reader["Id"],
                Username = reader["Username"],
                Email = reader["Email"]
            });
        }
        return NotFound();
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] UserDto user)
    {
        var query = $"INSERT INTO Users (Username, Email, Password) VALUES ('{user.Username}', '{user.Email}', '{user.Password}')";
        using var connection = new SqlConnection(ConnectionString);
        connection.Open();
        using var command = new SqlCommand(query, connection);
        command.ExecuteNonQuery();
        return Ok(new { message = "User created" });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto login)
    {
        var query = $"SELECT * FROM Users WHERE Username = '{login.Username}' AND Password = '{login.Password}'";
        using var connection = new SqlConnection(ConnectionString);
        connection.Open();
        using var command = new SqlCommand(query, connection);
        var reader = command.ExecuteReader();
        
        if (reader.Read())
        {
            var token = GenerateJwtToken(reader["Id"].ToString());
            return Ok(new { token = token });
        }
        return Unauthorized();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser(string id)
    {
        var query = $"DELETE FROM Users WHERE Id = {id}";
        using var connection = new SqlConnection(ConnectionString);
        connection.Open();
        using var command = new SqlCommand(query, connection);
        command.ExecuteNonQuery();
        return Ok(new { message = "User deleted" });
    }

    private string GenerateJwtToken(string userId)
    {
        var secret = "my-super-secret-key-that-should-not-be-hardcoded";
        return $"fake-jwt-token-{userId}-{secret}";
    }
}

public class UserDto
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}

public class LoginDto
{
    public string Username { get; set; }
    public string Password { get; set; }
}

