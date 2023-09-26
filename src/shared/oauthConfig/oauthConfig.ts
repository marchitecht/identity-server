export const oauthConfig = {
    clientId: 'UiTest.client',
    clientSecret: 'UiTestClientSecret',
    authorizationUrl: 'https://sts-identity.intelwash.ru/connect/authorize',
    tokenUrl: 'https://sts-identity.intelwash.ru/connect/token',
    redirectUri: 'https://identity-server-ten.vercel.app/auth-callback', // Replace with your app's domain
    scopes: ['openid', 'email', 'profile', 'roles', 'permissions', 'UiTest.API'],
  };