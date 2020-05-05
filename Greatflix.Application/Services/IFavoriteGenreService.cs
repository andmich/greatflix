using Greatflix.Application.Data.Messages;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Application.Services
{
    public interface IFavoriteGenreService
    {
        Task<GetGenresResponse> GetAllFavoriteGenresAsync(Request request);

        Task<CreateGenreResponse> CreateGenreAsync(CreateGenreRequest request);
    }
}
