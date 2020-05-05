using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Messages
{
    public class GetResponse<TEntity> : Response
    {
        public TEntity Result { get; set; }
    }
}
