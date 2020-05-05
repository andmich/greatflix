using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Models
{
    public class Trending : FilmBase
    {
        public string original_title { get; set; }
        public string title { get; set; }
        public bool video { get; set; }
    }
}
