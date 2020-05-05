using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common
{
    public class AppSettings
    {
        public TMDb TMDb { get; set; }
        public ConnectionStrings ConnectionStrings { get; set; }
    }

    public class ConnectionStrings
    {
        public string Greatflix { get; set; }
    }

    public class TMDb
    {
        public string BaseAddress { get; set; }
        public Dictionary<string, string> ApiKeys { get; set; }
    }
}
