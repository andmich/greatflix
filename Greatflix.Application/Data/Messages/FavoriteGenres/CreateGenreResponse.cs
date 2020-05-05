using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Application.Data.Messages
{
    public class CreateGenreResponse : Response
    {
        public DTOs.FavoriteGenre FavoriteGenre { get; set; }
    }
}
