using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Application.Data.Messages.FavoriteFilms
{
    public class GetFavoriteFilmsResponse : Response
    {
        public List<DTOs.FavoriteFilm> favoriteMovies { get; set; }
    }
}
