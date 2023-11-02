import jwt_decode, { JwtPayload } from 'jwt-decode';

/**
 * Returns information about the user
 */
export function decodeToken(accessToken:string) {
    //accessToken = "Bearer" + accessToken;
    const defaultToken="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJlZjFkYTlkNC1mZjc3LTRjM2UtYTAwNS04NDBjM2Y4MzA3NDUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81NzM2OGMyMS1iOGNmLTQyY2YtYmQwYi00M2VjZDRiYzYyYWUvIiwiaWF0IjoxNTM3MjMzMTA2LCJuYmYiOjE1MzcyMzMxMDYsImV4cCI6MTUzNzIzNzAwNiwiYWNyIjoiMSIsImFpbyI6IkFYUUFpLzhJQUFBQUZtK0UvUVRHK2dGblZ4TGpXZHc4Sys2MUFHclNPdU1NRjZlYmFNajdYTzNJYm1EM2ZHbXJPeUQrTnZaeUduMlZhVC9rREtYdzRNSWhyZ0dWcTZCbjh3TFhvVDFMa0laK0Z6UVZrSlBQTFFPVjRLY1hxU2xDVlBEUy9EaUNEZ0UyMjJUSW1NdldOYUVNYVVPVHNJR3ZUUT09IiwiYW1yIjpbIndpYSJdLCJyb2xlcyI6WyJSRUFEIiwiIFdSSVRFIiwiQURNSU4iXSwidXBuIjoiZXJnaW5fc2FyaWtheWFAY2FyZ2lsbC5jb20iLCJuYW1lIjoiRXJnaW4iLCJhcHBpZCI6Ijc1ZGJlNzdmLTEwYTMtNGU1OS04NWZkLThjMTI3NTQ0ZjE3YyIsInZlciI6IjEuMCJ9.WCrmLOkotAA4fkZOFJIGpPnjv2MJGwNj5kkF5JPpsDOwIlGl0pL4hQSgTK75MIO32aT1__vboRxICJj-hlzWz2-WQ_OwmZGLPBXXu-ii1b8wT7ro81xcgH_K08wdXF6OXYXpsOq8ZKNBACzH_sTzTRYQDZ3fb9tRTDn2ttdvFZTS_mbV8L5weSAj8IdTeNDmyMmQtucSdHfFwO0U7WxTFH9FMLh1eVlya__pjvH0-Ob1n2MgeS6MtZl-hb6stjwosbmq-hcvlT9CMhQGg8UjA7aSLFmT-nv8McLgsAl16O44BYHBZKpXj5wQ5EqXUuKgHIsDoljEWmSZeBY1HSpvdA";
    if (accessToken==="null"){
        
        accessToken = defaultToken;
    }
    
    let token = accessToken; //V1 - OIDC Protocol
    let decodedToken:any = jwt_decode<JwtPayload>(token || '') || null;
    
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userEntitlements', JSON.stringify(decodedToken.roles));
    const authInfo = {
        accessToken: token,
        roles: decodedToken.roles,
    };
    
    return authInfo;
}
