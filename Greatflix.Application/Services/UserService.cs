using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.Extensions.DependencyInjection;
using System.Text;

namespace Greatflix.Application.Services
{
    public class UserService : IUserService
    {
        private readonly ClaimsPrincipal _claims;
        public UserService(IServiceProvider serviceProvider, IHttpContextAccessor httpContextAccessor)
        {
            _claims = httpContextAccessor.HttpContext.User;
        }

        public string GetUserId()
        {
            return _claims.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
    }
}
