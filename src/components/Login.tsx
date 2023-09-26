import React from "react";
import { userManager } from "./AuthProvider";

const Login = () => {
  const login = () => {
    userManager.signinRedirect();
  };

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
