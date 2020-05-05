using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Greatflix.Common.ThirdParty.TMDb;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Greatflix.Common.ThirdParty.TMDb.Messages;
using Greatflix.Common.ThirdParty.TMDb.Models;
using AutoWrapper.Wrappers;
using Greatflix.Common.ThirdParty;

namespace Greatflix.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly ITMDbClient _client;
        public MoviesController(ITMDbClient client)
        {
            _client = client ?? throw new ArgumentNullException("client");
        }

        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> SearchMovies([FromQuery, FromRoute] SearchMovieRequest request)
        {
            return Ok(await _client.SearchMoviesAsync(request));
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetMovieDetails([FromQuery, FromRoute] GetMovieRequest request)
        {
            return Ok(await _client.GetMovieDetailsAsync(request));
        }

        [HttpGet]
        [Route("discover")]
        public async Task<IActionResult> DiscoverMovies([FromQuery, FromRoute] DiscoverMoviesRequest request)
        {
            return Ok(await _client.DiscoverMoviesAsync(request));
        }

        //[HttpGet]
        //[Route("popular")]
        //public async Task<IActionResult> GetPopularMovies([FromQuery, FromRoute] GetPopularRequest request)
        //{
        //    return Ok(await _client.GetPopularAsync<Movie>(request));
        //}

        //[HttpGet]
        //[Route("{id:int}/details")]
        //public async Task<IActionResult> GetMovieDetails([FromQuery, FromRoute] GetMovieDetailsRequest request)
        //{
        //    return Ok(await _client.GetMovieDetailsAsync(request));
        //}

        [HttpGet]
        [Route("latest")]
        public async Task<IActionResult> GetLatestMovies([FromQuery] Request request)
        {
            return Ok(await _client.GetLatestMovieAsync(request));
        }

        [HttpGet]
        [Route("now-playing")]
        public async Task<IActionResult> GetNowPlayingMovies([FromQuery] Request request)
        {
            return Ok(await _client.GetNowPlayingMoviesAsync(request));
        }

        [HttpGet]
        [Route("popular")]
        public async Task<IActionResult> GetPopularMovies([FromQuery] Request request)
        {
            return Ok(await _client.GetPopularMoviesAsync(request));
        }

        [HttpGet]
        [Route("top-rated")]
        public async Task<IActionResult> GetTopRatedMovies([FromQuery] Request request)
        {
            return Ok(await _client.GetTopRatedMoviesAsync(request));
        }

        [HttpGet]
        [Route("upcoming")]
        public async Task<IActionResult> GetUpcomingMovies([FromQuery] Request request)
        {
            return Ok(await _client.GetUpcomingMoviesAsync(request));
        }
    }
}