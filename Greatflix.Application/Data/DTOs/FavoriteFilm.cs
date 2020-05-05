using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Application.Data.DTOs
{
    public class FavoriteFilm
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int FilmId { get; set; }
        public int FilmTypeId { get; set; }
    }
}
