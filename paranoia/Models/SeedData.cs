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
                    },
                    new Paranoia
                    {
                        Question = "Who would be the best villain?",
                        Like = 3
                    },
                    new Paranoia
                    {
                        Question = "Who would be the most likely to rob a bank?",
                        Like = 2
                    },
                    new Paranoia
                    {
                        Question = "Who would be most likely to leave the oven on and burn down the house",
                        Like = 10
                    },
                    new Paranoia
                    {
                        Question = "If you had to sell someone for money, who would it be?",
                        Like = 6
                    }
                );
                context.SaveChanges();
            }
        }
    }
}