using System;
using System.Collections.Generic;
using System.Text;
using static Greatflix.Common.ThirdParty.TMDb.TMDbCommon;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class GetGenresRequest : Request
    {
        public MediaType mediaType { get; set; }
        public string language { get; set; } = "en_US";
    }
}
