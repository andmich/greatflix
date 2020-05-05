using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using static Greatflix.Common.ThirdParty.TMDb.TMDbCommon;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class GetPopularRequest : Request
    {
        [FromQuery]
        public MediaType? filmType { get; set; }
        [FromQuery]
        public string language { get; set; } = "en-US";
        [FromQuery]
        public string region { get; set; } = "US";
    }
}
