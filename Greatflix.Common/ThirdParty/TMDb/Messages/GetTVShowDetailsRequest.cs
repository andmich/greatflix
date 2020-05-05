using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class GetTVShowDetailsRequest : Request
    {
        [FromRoute]
        public int id { get; set; }
    }
}
