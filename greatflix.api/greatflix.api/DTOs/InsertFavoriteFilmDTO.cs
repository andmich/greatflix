using greatflix.common.Clients.TMDb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace greatflix.api.DTOs
{
    public class InsertFavoriteFilmDTO
    {
        public int FilmId { get; set; }
        public TMDbCommon.FilmType? FilmType { get; set; }
    }
}
