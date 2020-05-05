using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Application.Data.AutoMapper
{
    public class FavoriteFilm : Profile
    {
        public FavoriteFilm()
        {
            CreateMap<Greatflix.Domain.Data.Models.FavoriteFilm, Application.Data.DTOs.FavoriteFilm>()
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
                .ForAllOtherMembers(m => m.Ignore());

            CreateMap<Application.Data.DTOs.FavoriteFilm, Greatflix.Domain.Data.Models.FavoriteFilm>()
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
                .ForAllOtherMembers(m => m.Ignore()); ;
        }
    }
}
