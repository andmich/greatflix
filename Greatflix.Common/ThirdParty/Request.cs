using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty
{
    public class Request
    {
        [FromQuery]
        public int page { get; set; } = 1;
    }
}
