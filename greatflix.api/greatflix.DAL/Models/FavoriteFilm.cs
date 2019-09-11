using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.dal.Models
{
    public class FavoriteFilm
    {
        public int id { get; set; }
        public string user_id { get; set; }
        public int film_id { get; set; }
        public int film_type_id { get; set; }
        public string source { get; set; }
    }
}
