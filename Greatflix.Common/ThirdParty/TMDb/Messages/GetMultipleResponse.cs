using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class GetMultipleResponse<TEntity> : Response
    {
        public List<TEntity> Results { get; set; } = new List<TEntity>();
        public int Page { get; set; }
        public int TotalResults 
        { 
            get
            {
                return Results != null ? Results.Count : 0;
            }
        }
        public int TotalPages { get; set; }
    }
}
