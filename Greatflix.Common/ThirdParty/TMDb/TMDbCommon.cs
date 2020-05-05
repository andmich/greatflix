using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb
{
    public class TMDbCommon
    {
        public enum MediaType
        {
            all = 0,
            movie = 1,
            tv = 2,
            person = 3
        }

        public enum TimeWindow
        {
            day = 1,
            week = 2,
        }
    }
}
