using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace greatflix.api
{
    public class AppSettings
    {
        public ApiKeys ApiKeys { get; set; }
    }

    public class ApiKeys
    {
        public Dictionary<string, string> TMDb { get; set; }
    }
}
