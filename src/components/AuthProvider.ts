import { UserManager, WebStorageStateStore } from "oidc-client";
import { oauthConfig } from "../shared/oauthConfig/oauthConfig";

export const userManager = new UserManager({
  ...oauthConfig,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});
