using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.dal.Models
{
    public class FavoriteGenre
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string GenreId { get; set; }
        public string Source { get; set; }
    }
}
