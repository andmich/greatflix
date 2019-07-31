using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.dal.Models
{
    public class FavoriteFilm
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public int FilmId { get; set; }
        public int FilmTypeId { get; set; }
        public string Source { get; set; }
    }
}
