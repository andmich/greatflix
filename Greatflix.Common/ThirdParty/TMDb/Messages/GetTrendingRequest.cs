using System;
using System.Collections.Generic;
using System.Text;
using static Greatflix.Common.ThirdParty.TMDb.TMDbCommon;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class GetTrendingRequest : Request
    {
        public MediaType MediaType { get; set; }
        public TimeWindow TimeWindow { get; set; }
    }
}
