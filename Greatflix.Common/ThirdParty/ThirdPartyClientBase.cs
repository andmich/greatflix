using AutoWrapper.Wrappers;
using log4net;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Greatflix.Common.ThirdParty
{
    public abstract class ThirdPartyClientBase<TClient> : IThirdPartyClient
        where TClient : ThirdPartyClientBase<TClient>
    {
        protected readonly AppSettings _appSettings;
        private readonly ILog _logger = LogManager.GetLogger(typeof(TClient));
        public ThirdPartyClientBase(AppSettings appSettings)
        {
            _appSettings = appSettings ?? throw new ArgumentNullException("appSettings");
        }

        protected async Task<TResponse> ExecuteAsync<TResponse>(Request request, Func<TResponse, Task> method)
            where TResponse : Response, new()
        {
            var response = new TResponse();
            try
            {
                _logger.Info("Executing logic asynchronously");
                _validateRequest(request);
                await method(response);
            }
            catch (ApiException ex)
            {
                _logger.Error(ex);
                throw ex;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                throw new ApiException(ex);
            }
            return response;
        }

        private void _validateRequest(Request request)
        {
            if (request == null)
                throw new ArgumentNullException("request");
        }
    }
}
