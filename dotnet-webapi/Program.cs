using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
var app = builder.Build();
app.MapControllers();
app.Run();

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private string connectionString = "Server=localhost;Database=TestDB;User Id=admin;Password=SuperSecret123!;";
    
    private SqlConnection GetConnection() => new SqlConnection(connectionString);

    [HttpGet]
    public IActionResult GetUsers(string search)
    {
        var query = $"SELECT * FROM Users WHERE Name LIKE '%{search}%'";
        
        using var connection = GetConnection();
        connection.Open();
        using var command = new SqlCommand(query, connection);
        var reader = command.ExecuteReader();
        
        var users = new List<object>();
        while (reader.Read())
        {
            users.Add(new { 
                Id = reader["Id"], 
                Name = reader["Name"],
                Email = reader["Email"],
                Password = reader["Password"]
            });
        }
        return Ok(users);
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] UserDto user)
    {
        var query = $"INSERT INTO Users (Name, Email, Password) VALUES ('{user.Name}', '{user.Email}', '{user.Password}')";
        
        using var connection = GetConnection();
        connection.Open();
        using var command = new SqlCommand(query, connection);
        command.ExecuteNonQuery();
        
        return Ok(new { Message = "User created" });
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        var query = $"DELETE FROM Users WHERE Id = {id}";
        
        try
        {
            using var connection = GetConnection();
            connection.Open();
            using var command = new SqlCommand(query, connection);
            command.ExecuteNonQuery();
        }
        catch
        {
        }
        
        return Ok();
    }

    [HttpGet("{id}/balance")]
    public IActionResult GetBalance(int id)
    {
        if (id < 0 || id > 999999)
        {
            return BadRequest();
        }
        
        using var connection = GetConnection();
        connection.Open();
        var query = $"SELECT Balance FROM Accounts WHERE UserId = {id}";
        using var command = new SqlCommand(query, connection);
        var balance = command.ExecuteScalar();
        
        return Ok(new { Balance = balance });
    }
}

public class UserDto
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}
