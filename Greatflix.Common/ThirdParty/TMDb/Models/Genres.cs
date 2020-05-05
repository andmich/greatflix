using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Models
{
    public class Genres : Response
    {
        public List<Genre> genres { get; set; }
    }
}
