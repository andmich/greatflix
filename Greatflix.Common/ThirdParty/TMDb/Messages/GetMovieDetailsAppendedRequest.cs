using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class GetMovieDetailsAppendedRequest : GetMovieRequest
    {
        [FromQuery]
        public string appendToResponse { get; set; }
    }
}
