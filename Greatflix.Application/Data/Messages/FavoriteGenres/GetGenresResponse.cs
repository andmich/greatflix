using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Application.Data.Messages
{
    public class GetGenresResponse : Response
    {
        public List<DTOs.FavoriteGenre> FavoriteGenres { get; set; }
    }
}
