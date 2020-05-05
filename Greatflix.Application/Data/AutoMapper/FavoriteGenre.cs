using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Application.Data.AutoMapper
{
    public class FavoriteGenre : Profile
    {
        public FavoriteGenre()
        {
            CreateMap<Greatflix.Domain.Data.Models.FavoriteGenre, Application.Data.DTOs.FavoriteGenre>()
                .ForMember(d =>
                    d.Id,
                    opt => opt.MapFrom(s => s.Id))
                .ForMember(d =>
                    d.UserId,
                    opt => opt.MapFrom(s => s.UserId))
                .ForMember(d =>
                    d.GenreId,
                    opt => opt.MapFrom(s => s.GenreId))
                .ForAllOtherMembers(m => m.Ignore());

            CreateMap<Application.Data.DTOs.FavoriteGenre, Greatflix.Domain.Data.Models.FavoriteGenre>()
                .ForMember(d =>
                    d.Id,
                    opt => opt.MapFrom(s => s.Id))
                .ForMember(d =>
                    d.UserId,
                    opt => opt.MapFrom(s => s.UserId))
                .ForMember(d =>
                    d.GenreId,
                    opt => opt.MapFrom(s => s.GenreId))
                .ForAllOtherMembers(m => m.Ignore());
        }
    }
}
