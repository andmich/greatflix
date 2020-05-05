using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Models
{
    public class Genre : ITMDbModel
    {
        public int id { get; set; }
        public string name { get; set; }
    }
}
