import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { oauthConfig } from "./shared/oauthConfig/oauthConfig";

// Configuration for your OAuth 2.0 provider (Identity Server)

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if an access token exists in cookies (user might be already authenticated)
    const existingToken = Cookies.get("access_token");
    if (existingToken) {
      setAccessToken(existingToken);
    }
  }, []);

  // Function to initiate the OAuth 2.0 authentication process
  const initiateOAuth = () => {
    // Generate a random state for CSRF protection (optional but recommended)
    const state = Math.random().toString(36).substring(7);
    Cookies.set("oauth_state", state, { secure: true, sameSite: "none" });

    // Redirect the user to the authorization URL
    const authorizationUrl = `${oauthConfig.authorizationUrl}?client_id=${
      oauthConfig.clientId
    }&redirect_uri=${encodeURIComponent(
      oauthConfig.redirectUri
    )}&response_type=code&scope=${oauthConfig.scopes.join(" ")}&state=${state}`;
    window.location.href = authorizationUrl;
  };

  // Function to handle the OAuth callback and exchange the code for an access token
  const handleOAuthCallback = async () => {
    // Extract the authorization code from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    // Verify the state for CSRF protection
    const savedState = Cookies.get("oauth_state");
    if (state !== savedState) {
      console.error("OAuth state mismatch. Possible CSRF attack.");
      return;
    }

    // Exchange the authorization code for an access token
    try {
      const response = await axios.post(oauthConfig.tokenUrl, {
        code,
        client_id: oauthConfig.clientId,
        client_secret: oauthConfig.clientSecret,
        redirect_uri: oauthConfig.redirectUri,
        grant_type: "authorization_code",
      });

      // Store the access token securely in a cookie
      const newAccessToken = response.data.access_token;
      Cookies.set("access_token", newAccessToken, {
        secure: true,
        sameSite: "none",
      });

      // Update the component state with the access token
      setAccessToken(newAccessToken);

      // Clear the state cookie
      Cookies.remove("oauth_state");

      // Redirect to a protected route or perform other actions
      // Example: window.location.href = '/protected-route';
    } catch (error) {
      console.error("OAuth error:", error);
    }
  };

  // Function to make authenticated GET requests to the API
  const fetchApiData = async () => {
    try {
      const response = await axios.get(
        "https://api.intelwash.ru/uitest/index.html",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          },
        }
      );

      // Handle the API response data
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <div className="App">
      <h1>OAuth 2.0 Authentication Example</h1>
      {accessToken ? (
        <div>
          <p>Authenticated with Access Token</p>
          <button onClick={fetchApiData}>Fetch API Data</button>
        </div>
      ) : (
        <div>
          <p>Not Authenticated</p>
          <button onClick={initiateOAuth}>Login with OAuth</button>
        </div>
      )}
    </div>
  );
}

export default App;
