using System;
using System.Collections.Generic;
using System.Text;

namespace greatflix.common.Clients.TMDb.Models
{
    public class TMDbAppendedVideos
    {
        public TMDbResults<TMDbVideo> videos { get; set; }
    }
}
