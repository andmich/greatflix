using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class GetMovieRequest : Request
    {
        [FromRoute]
        [FromQuery]
        public int id { get; set; }
        [FromQuery]
        public string language { get; set; } = "en-US";
    }
}
