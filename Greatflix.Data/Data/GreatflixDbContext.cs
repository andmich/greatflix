using System;
using System.Collections.Generic;
using System.Text;
using Greatflix.Data.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Greatflix.Data.Data
{
    public class GreatflixDbContext : DbContext
    {
        public DbSet<FavoriteFilm> FavoriteFilm { get; set; }
        public DbSet<FavoriteGenre> FavoriteGenre { get; set; }

        public GreatflixDbContext(DbContextOptions<GreatflixDbContext> dbContextOptions) 
            : base(dbContextOptions)
        {

        }
    }
}
