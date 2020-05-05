using System;
using System.Collections.Generic;
using System.Text;
using Greatflix.Common.ThirdParty.TMDb;

namespace Greatflix.Application.Data.Messages.FavoriteFilms
{
    public class GetFavoriteFilmsRequest : Request
    {
        public TMDbCommon.MediaType filmType { get; set; }
    }
}
