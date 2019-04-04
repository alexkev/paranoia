using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace paranoia.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ParanoiaContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<ParanoiaContext>>()))
            {
                // Look for any movies.
                if (context.Paranoia.Any())
                {
                    return;   // DB has been seeded
                }

                context.Paranoia.AddRange(
                    new Paranoia
                    {
                        Question = "Who is the least likely to become President?",
                        Like = 5
                    }
                );
                context.SaveChanges();
            }
        }
    }
}