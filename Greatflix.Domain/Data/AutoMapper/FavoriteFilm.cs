using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
namespace Greatflix.Domain.Data.AutoMapper
{
    public class FavoriteFilm : Profile
    {
        public FavoriteFilm()
        {
            CreateMap<Greatflix.Data.Data.Models.FavoriteFilm, Models.FavoriteFilm>()
                .ForMember(d => 
                    d.Id,
                    opt => opt.MapFrom(s => s.Id))
                .ForMember(d =>
                    d.UserId,
                    opt => opt.MapFrom(s => s.UserId))
                .ForMember(d => 
                    d.FilmId,
                    opt => opt.MapFrom(s => s.FilmId))
                .ForMember(d =>
                    d.FilmTypeId,
                    opt => opt.MapFrom(s => s.FilmTypeId))
                .ForMember(d =>
                    d.Source,
                    opt => opt.MapFrom(s => s.Source))
                .ForMember(d =>
                    d.IsDeleted,
                    opt => opt.MapFrom(s => s.IsDeleted));

            CreateMap<Models.FavoriteFilm, Greatflix.Data.Data.Models.FavoriteFilm>()
                .ForMember(d =>
                    d.Id,
                    opt => opt.MapFrom(s => s.Id))
                .ForMember(d =>
                    d.UserId,
                    opt => opt.MapFrom(s => s.UserId))
                .ForMember(d =>
                    d.FilmId,
                    opt => opt.MapFrom(s => s.FilmId))
                .ForMember(d =>
                    d.FilmTypeId,
                    opt => opt.MapFrom(s => s.FilmTypeId))
                .ForMember(d =>
                    d.Source,
                    opt => opt.MapFrom(s => s.Source))
                .ForMember(d =>
                    d.IsDeleted,
                    opt => opt.MapFrom(s => s.IsDeleted));
        }
    }
}
