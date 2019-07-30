using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using greatflix.dal;
using greatflix.dal.Interfaces;
using greatflix.dal.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace greatflix.api
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

            // add config
            var appSettings = Configuration.GetSection("AppSettings").Get<AppSettings>();
            services.AddScoped<IAccountRepository>((factory) => new AccountRepository(new SqlConnection(appSettings.ConnectionStrings.GreatFlix)));
            services.AddScoped<IUnitOfWork>((factory) => new UnitOfWork(new SqlConnection(appSettings.ConnectionStrings.GreatFlix)));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(_myOrigins);
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
