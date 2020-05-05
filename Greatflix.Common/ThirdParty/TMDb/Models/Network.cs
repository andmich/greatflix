using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Models
{
    public class Network : ITMDbModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public string logo_path { get; set; }
        public string origin_country { get; set; }
    }
}
