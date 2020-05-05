using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Data.Data.Models
{
    public class FavoriteFilm : IEntityBase<int>
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int FilmId { get; set; }
        public int FilmTypeId { get; set; }
        public string Source { get; set; }
        public bool IsDeleted { get; set; }
    }
}
