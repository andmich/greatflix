using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Greatflix.Common;
using Greatflix.Data.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Greatflix.Data.Data.Repositories;
using Greatflix.Application.Services;
using Microsoft.AspNetCore.Http;
using log4net;
using System.Reflection;
using System.IO;
using AutoMapper;
using Greatflix.Domain;
using Greatflix.Application;
using Greatflix.Common.ThirdParty.TMDb;
using AutoWrapper;
using Newtonsoft.Json.Serialization;

namespace Greatflix.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string _myOrigins = "greatFlixOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            // configure logging
            var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            log4net.Config.XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));

            services.AddControllers();
            // cors 
            services.AddCors(options =>
            {
                options.AddPolicy(
                    _myOrigins,
                    builder =>
                    {
                        builder
                            .WithOrigins("http://localhost:3000", "https://andrewapps.auth0.com")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            // authentication 
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                //http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    NameClaimType = "https://andrewapps.auth0.com/name",
                };
                options.Authority = "https://andrewapps.auth0.com/";
                options.Audience = "http://localhost:22999";
            });

            services.AddOptions();

            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            services.AddAutoMapper(typeof(GreatflixDomain), typeof(GreatflixApplication));

            // add config
            var appSettings = Configuration.GetSection("AppSettings").Get<AppSettings>();
            services.AddDbContext<GreatflixDbContext>(options => options.UseSqlServer(appSettings.ConnectionStrings.Greatflix));
            services.AddScoped(service => Configuration.GetSection("AppSettings").Get<AppSettings>());
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IFavoriteFilmRepository, FavoriteFilmRepository>();
            services.AddScoped<IFavoriteGenreRepository, FavoriteGenreRepository>();
            services.AddScoped<IFavoriteGenreService, FavoriteGenreService>();
            services.AddScoped<IFavoriteFilmService, FavoriteFilmService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITMDbClient, TMDbClient>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IHostApplicationLifetime applicationLifetime)
        {
            applicationLifetime
                .ApplicationStopping
                .Register(OnApplicationStopping);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            //app.UseApiResponseAndExceptionWrapper();
            app.UseRouting();
            app.UseCors(_myOrigins);
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }

        private void OnApplicationStopping()
        {
            LogManager.Shutdown();
        }
    }
}
