using Greatflix.Common.ThirdParty.TMDb.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class GetMovieDetailsAppendedResponse : Response
    {
        public Movie details { get; set; }
        public Results<Video> videos { get; set; }
    }
}
