using Greatflix.Common.ThirdParty.TMDb.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class GetGenresResponse : Response
    {
        public List<Genre> genres { get; set; }
    }
}
