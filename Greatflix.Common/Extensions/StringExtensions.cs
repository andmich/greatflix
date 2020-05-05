using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.Extensions
{
    public static class StringExtensions
    {
        public static bool IsJson(this string str)
        {
            try
            {
                JObject.Parse(str);
                return true;
            }
            catch
            {
                return false;
            }
        }


    }
}
