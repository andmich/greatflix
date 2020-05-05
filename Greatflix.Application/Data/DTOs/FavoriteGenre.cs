using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Application.Data.DTOs
{
    public class FavoriteGenre
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int GenreId { get; set; }
    }
}
