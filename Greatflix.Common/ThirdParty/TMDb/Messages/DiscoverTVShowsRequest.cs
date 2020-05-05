using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class DiscoverTVShowsRequest : Request
    {
        [FromQuery]
        public List<int> genres { get; set; }
        [FromQuery]
        public string language { get; set; } = "en-US";
        [FromQuery]
        public string region { get; set; } = "US";
    }
}
