using System;
using System.Collections.Generic;

namespace copanyProject.Models;

public partial class Personal
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? EmailAddress { get; set; }

    public string? Password { get; set; }

    public string? Team { get; set; }

    public DateTime? JoinedAt { get; set; }

    public string? Avatar { get; set; }
}
