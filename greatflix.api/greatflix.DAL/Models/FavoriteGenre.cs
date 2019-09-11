using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.dal.Models
{
    public class FavoriteGenre
    {
        public int id { get; set; }
        public string user_id { get; set; }
        public int genre_id { get; set; }
        public string source { get; set; }
    }
}
