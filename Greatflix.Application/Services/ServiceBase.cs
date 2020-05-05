using AutoMapper;
using Greatflix.Application.Data.Messages;
using Greatflix.Data.Data;
using log4net;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace Greatflix.Application.Services
{
    public abstract class ServiceBase<T>
    {
        protected readonly ILog _logger = LogManager.GetLogger(typeof(T));
        protected readonly IServiceProvider _serviceProvider;
        protected readonly IMapper _mapper;
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly IUserService _userService;
        public ServiceBase(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider ?? throw new ArgumentNullException("serviceProvider");
            _mapper = _serviceProvider.GetRequiredService<IMapper>();
            _unitOfWork = _serviceProvider.GetRequiredService<IUnitOfWork>();
            _userService = _serviceProvider.GetRequiredService<IUserService>();
        }

        protected async Task<IResponse> ExecuteAsync<IResponse>(Request request, Func<IResponse, Task> method) 
            where IResponse : Response, new()
        {
            var response = new IResponse();
            try
            {
                await method(response);
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
            }
            return response;
        }
    }
}
