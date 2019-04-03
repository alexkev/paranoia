using Microsoft.EntityFrameworkCore;

namespace paranoia.Models
{
    public class ParanoiaContext : DbContext
    {
        public ParanoiaContext(DbContextOptions<ParanoiaContext> options)
            : base(options)
        {
        }

        public DbSet<Paranoia> Paranoia { get; set; }
    }
}