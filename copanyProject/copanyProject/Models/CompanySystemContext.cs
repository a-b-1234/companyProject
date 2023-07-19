using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace copanyProject.Models;

public partial class CompanySystemContext : DbContext
{
    public CompanySystemContext()
    {
    }

    public CompanySystemContext(DbContextOptions<CompanySystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Personal> Personals { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-FVA15IL;Database=company_system;Trusted_Connection=True;TrustServerCertificate=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Personal>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__personal__3213E83F90DD2DAE");

            entity.ToTable("personal");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Avatar)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("avatar");
            entity.Property(e => e.EmailAddress)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("emailAddress");
            entity.Property(e => e.JoinedAt)
                .HasColumnType("date")
                .HasColumnName("joinedAt");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Team)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("team");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__project__3213E83FB5566379");

            entity.ToTable("project");

            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("id");
            entity.Property(e => e.BugsCount).HasColumnName("bugsCount");
            entity.Property(e => e.DurationInDays).HasColumnName("durationInDays");
            entity.Property(e => e.MadeDadeline).HasColumnName("madeDadeline");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.PersonalId).HasColumnName("personalId");
            entity.Property(e => e.Score).HasColumnName("score");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
