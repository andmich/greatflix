using Greatflix.Common.ThirdParty.TMDb;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Application.Data.Messages.FavoriteFilms
{
    public class AddFavoriteFilmRequest : Request
    {
        public int FilmId { get; set; }
        public TMDbCommon.MediaType? FilmType { get; set; }
    }
}
