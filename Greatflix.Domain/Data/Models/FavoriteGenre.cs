using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Domain.Data.Models
{
    public class FavoriteGenre : IDomainBase<int>
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int GenreId { get; set; }
        public string Source { get; set; }
        public bool IsDeleted { get; set; }
    }
}
