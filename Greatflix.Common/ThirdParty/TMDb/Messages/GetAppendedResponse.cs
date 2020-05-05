using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class GetAppendedResponse<TEntity, TAppendedEntity> : Response
    {
        public TEntity Result { get; set; }
        public List<TAppendedEntity> AppendedResult { get; set; }
    }
}
