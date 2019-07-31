using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using greatflix.dal.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace greatflix.api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        public AccountsController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository ?? throw new ArgumentNullException("accountRepository");
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public IActionResult GetByUserId()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userId != null)
            {
                var user = _accountRepository.GetByUserId(userId.Value);

                dynamic response;

                if (user == null)
                {
                    return NotFound(new
                    {
                        message = "No account found but user is authenticated"
                    });
                }
                else
                {
                    response = user;
                }

                return Ok(response);
            }
            else
            {
                return new ContentResult
                {
                    Content = "Unauthorized",
                    StatusCode = (int)HttpStatusCode.Unauthorized
                };
            }
        }

        [HttpPost]
        [Route("")]
        [Authorize]
        public IActionResult Insert()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userId != null)
            {
                // get if user exists first 
                var user = _accountRepository.GetByUserId(userId.Value);

                if (user != null)
                {
                    return Ok(new
                    {
                        message = "Account already exists"
                    });
                }
                else
                {
                    try
                    {
                        _accountRepository.Create(new dal.Models.Account
                        {
                            UserId = userId.Value
                        });

                        return Ok();
                    }
                    catch (Exception ex)
                    {
                        // log 

                        return new ContentResult
                        {
                            Content = "An error occurred while adding account",
                            StatusCode = (int)HttpStatusCode.InternalServerError
                        };
                    }
                }
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}