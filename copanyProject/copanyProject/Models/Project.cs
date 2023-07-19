using System;
using System.Collections.Generic;

namespace copanyProject.Models;

public partial class Project
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public int? Score { get; set; }

    public int? DurationInDays { get; set; }

    public int? BugsCount { get; set; }

    public bool? MadeDadeline { get; set; }

    public int? PersonalId { get; set; }
}
