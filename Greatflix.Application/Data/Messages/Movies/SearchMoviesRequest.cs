using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Application.Data.Messages.Movies
{
    public class SearchMoviesRequest : Request
    {
        public string query { get; set; }

        public int? page { get; set; } = null;

        public int? year { get; set; } = null;

        public int? primaryReleaseYear { get; set; } = null;

        public bool includeAdult { get; set; } = false;

        public string language { get; set; } = "en-US";

        public string region { get; set; } = "US";
    }
}
