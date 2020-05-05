using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class SearchMovieRequest : Request
    {
        [FromQuery]
        public string query { get; set; }
        [FromQuery]
        public int? page { get; set; }
        [FromQuery]
        public int? year { get; set; }
        [FromQuery]
        public int? primaryReleaseYear { get; set; }
        [FromQuery]
        public bool includeAdult { get; set; } = false;
        [FromQuery]
        public string language { get; set; } = "en-US";
        [FromQuery]
        public string region { get; set; } = "US"; 
    }
}
