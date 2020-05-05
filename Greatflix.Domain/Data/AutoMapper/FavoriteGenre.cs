using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Domain.Data.AutoMapper
{
    public class FavoriteGenre : Profile
    {
        public FavoriteGenre()
        {
            CreateMap<Greatflix.Data.Data.Models.FavoriteGenre, Domain.Data.Models.FavoriteGenre>()
                .ForMember(d =>
                    d.Id,
                    opt => opt.MapFrom(s => s.Id))
                .ForMember(d =>
                    d.UserId,
                    opt => opt.MapFrom(s => s.UserId))
                .ForMember(d =>
                    d.GenreId,
                    opt => opt.MapFrom(s => s.GenreId))
                .ForMember(d =>
                    d.Source,
                    opt => opt.MapFrom(s => s.Source))
                .ForMember(d =>
                    d.IsDeleted,
                    opt => opt.MapFrom(s => s.IsDeleted));

            CreateMap<Domain.Data.Models.FavoriteGenre, Greatflix.Data.Data.Models.FavoriteGenre>()
                .ForMember(d =>
                    d.Id,
                    opt => opt.MapFrom(s => s.Id))
                .ForMember(d =>
                    d.UserId,
                    opt => opt.MapFrom(s => s.UserId))
                .ForMember(d =>
                    d.GenreId,
                    opt => opt.MapFrom(s => s.GenreId))
                .ForMember(d =>
                    d.Source,
                    opt => opt.MapFrom(s => s.Source))
                .ForMember(d =>
                    d.IsDeleted,
                    opt => opt.MapFrom(s => s.IsDeleted));
        }
    }
}
