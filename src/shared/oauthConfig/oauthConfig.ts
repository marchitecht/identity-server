export const oauthConfig = {
    clientId: 'UiTest.client',
    clientSecret: 'UiTestClientSecret',
    authorizationUrl: 'https://sts-identity.intelwash.ru/connect/authorize',
    tokenUrl: 'https://sts-identity.intelwash.ru/connect/token',
    redirectUri: 'https://localhost.com/auth/callback', // Replace with your app's domain
    scopes: ['openid', 'email', 'profile', 'roles', 'permissions', 'UiTest.API'],
  };