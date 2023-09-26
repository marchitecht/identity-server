export const oauthConfig = {
  authority: "https://sts-identity.intelwash.ru",
  client_id: "UiTest.client",
  client_secret: "UiTestClientSecret",
  authorizationUrl: "https://sts-identity.intelwash.ru/connect/authorize",
  redirect_uri: "https://identity-server-ten.vercel.app/callback", // Replace with your app's domain
  scopes: "openid profile",
  tokenUrl: "https://sts-identity.intelwash.ru/connect/token",
};
