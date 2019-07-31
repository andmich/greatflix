using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace greatflix.api.DTOs
{
    public class InsertFavoriteGenreDTO
    {
        public int GenreId { get; set; }
        public string Source { get; set; }
    }
}
