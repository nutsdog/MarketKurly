using MarketKurly_CloneCoding.Models;
using Microsoft.EntityFrameworkCore;
#nullable disable

namespace MarketKurly_CloneCoding.DataAccess
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Member> Members { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
    }
}