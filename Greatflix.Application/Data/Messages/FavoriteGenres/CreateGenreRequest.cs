using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Application.Data.Messages
{
    public class CreateGenreRequest : Request
    {
        public DTOs.FavoriteGenre FavoriteGenre { get; set; }
    }
}
