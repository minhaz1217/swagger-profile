using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace SwaggerUIAppForTesting;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class CustomAuthenticationFilter : ActionFilterAttribute, IAuthorizationFilter
{
    public CustomAuthenticationFilter()
    {

    }

    public bool AllowMultiple => true;

    public Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
    {
        throw new NotImplementedException();
    }
}
